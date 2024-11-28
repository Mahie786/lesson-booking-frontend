export default {
  namespaced: true,

  // State object containing the store's data
  state: {
    lessons: [],
    loading: false,
    error: null,
    searchTerm: "",
    sortBy: "subject",
    sortOrder: "asc",
  },

  // Mutations for synchronously modifying the state
  mutations: {
    SET_LESSONS(state, lessons) {
      state.lessons = lessons;
    },
    SET_LOADING(state, status) {
      state.loading = status;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
    SET_SEARCH_TERM(state, term) {
      state.searchTerm = term;
    },
    SET_SORT(state, { sortBy, sortOrder }) {
      state.sortBy = sortBy;
      state.sortOrder = sortOrder;
    },
    DECREMENT_SPACES(state, lessonId) {
      const lesson = state.lessons.find((l) => l._id === lessonId);
      if (lesson && lesson.spaces > 0) {
        lesson.spaces--;
      }
    },
  },

  // Actions for handling asynchronous operations and complex logic
  actions: {
    // Initialize lessons (likely used when hydrating the store)
    initializeLessons({ commit }, lessons) {
      commit("SET_LESSONS", lessons);
    },

    // Fetch lessons from the API
    async fetchLessons({ commit }) {
      commit("SET_LOADING", true);
      commit("SET_ERROR", null);
      try {
        const response = await fetch(`${process.env.VUE_APP_API_URL}/lessons`);
        const result = (await response.json()) || {};
        if (result?.success) {
          commit("SET_LESSONS", result?.data);
        } else {
          throw new Error("Failed to fetch lessons");
        }
      } catch (error) {
        commit("SET_ERROR", "Failed to load lessons");
        console.error("Error fetching lessons:", error);
      } finally {
        commit("SET_LOADING", false);
      }
    },

    // Update search term and fetch filtered lessons
    async updateSearch({ commit }, term) {
      commit("SET_LOADING", true);
      commit("SET_ERROR", null);
      commit("SET_SEARCH_TERM", term);

      try {
        const response = await fetch(
          `${process.env.VUE_APP_API_URL}/lessons/search?searchString=${term}`
        );
        const result = (await response.json()) || {};
        if (result?.success) {
          commit("SET_LESSONS", result?.data);
        } else {
          throw new Error("Failed to fetch lessons");
        }
      } catch (error) {
        commit("SET_ERROR", "Failed to load lessons");
        console.error("Error fetching lessons:", error);
      } finally {
        commit("SET_LOADING", false);
      }
    },

    // Update sort criteria
    updateSort({ commit }, sortData) {
      commit("SET_SORT", sortData);
    },

    // Decrement spaces for a lesson and update on the server
    async decrementSpaces({ commit }, lessonId) {
      try {
        commit("DECREMENT_SPACES", lessonId);

        const response = await fetch(
          `${process.env.VUE_APP_API_URL}/lessons/${lessonId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              spaces: spaces - 1,
            }),
          }
        );

        const data = await response?.data?.json();
        commit("SET_LESSONS", data);
      } catch (error) {
        commit("SET_ERROR", "Failed to load lessons");
        console.error("Error fetching lessons:", error);
      } finally {
        commit("SET_LOADING", false);
      }
    },
  },

  // Getters for deriving data from the state
  getters: {
    filteredLessons: (state) => {
      let filtered = [...state.lessons];

      // Apply sorting
      filtered.sort((a, b) => {
        const aValue = a[state.sortBy];
        const bValue = b[state.sortBy];

        if (typeof aValue === "string") {
          const result = aValue.localeCompare(bValue);
          return state.sortOrder === "asc" ? result : -result;
        } else {
          const result = aValue - bValue;
          return state.sortOrder === "asc" ? result : -result;
        }
      });

      return filtered;
    },
  },
};

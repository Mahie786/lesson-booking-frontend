export default {
  namespaced: true,

  state: {
    lessons: [],
    loading: false,
    error: null,
    searchTerm: "",
    sortBy: "subject",
    sortOrder: "asc",
  },

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
      const lesson = state.lessons.find((l) => l.id === lessonId);
      if (lesson && lesson.spaces > 0) {
        lesson.spaces--;
      }
    },
  },

  actions: {
    initializeLessons({ commit }, lessons) {
      commit("SET_LESSONS", lessons);
    },

    async fetchLessons({ commit }) {
      commit("SET_LOADING", true);
      commit("SET_ERROR", null);
      try {
        const response = await fetch("/api/lessons");
        const data = await response.json();
        commit("SET_LESSONS", data);
      } catch (error) {
        commit("SET_ERROR", "Failed to load lessons");
        console.error("Error fetching lessons:", error);
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async updateSearch({ commit }, term) {
      commit("SET_LOADING", true);
      commit("SET_ERROR", null);
      commit("SET_SEARCH_TERM", term);

      try {
        // const response = await fetch("/api/lessons?search=" + term);
        // const data = await response.json();
        // commit("SET_LESSONS", data);
      } catch (error) {
        commit("SET_ERROR", "Failed to load lessons");
        console.error("Error fetching lessons:", error);
      } finally {
        commit("SET_LOADING", false);
      }
    },

    updateSort({ commit }, sortData) {
      console.log("Sort data:", sortData);
      commit("SET_SORT", sortData);
    },

    decrementSpaces({ commit }, lessonId) {
      try {
        commit("DECREMENT_SPACES", lessonId);

        // const response = await fetch("/api/lessons?search=" + term);
        // const data = await response.json();
        // commit("SET_LESSONS", data);
      } catch (error) {
        commit("SET_ERROR", "Failed to load lessons");
        console.error("Error fetching lessons:", error);
      } finally {
        commit("SET_LOADING", false);
      }
    },
  },

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

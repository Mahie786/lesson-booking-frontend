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

    updateSearch({ commit }, term) {
      commit("SET_SEARCH_TERM", term);
    },

    updateSort({ commit }, sortData) {
      console.log("Sort data:", sortData);
      commit("SET_SORT", sortData);
    },

    decrementSpaces({ commit }, lessonId) {
      commit("DECREMENT_SPACES", lessonId);
    },
  },

  getters: {
    filteredLessons: (state) => {
      let filtered = [...state.lessons];

      // Apply search filter
      if (state.searchTerm) {
        const searchLower = state.searchTerm.toLowerCase();
        filtered = filtered.filter(
          (lesson) =>
            lesson.subject.toLowerCase().includes(searchLower) ||
            lesson.location.toLowerCase().includes(searchLower)
        );
      }

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

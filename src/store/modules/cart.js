export default {
  namespaced: true,

  state: {
    items: [],
    loading: false,
    error: null,
  },

  mutations: {
    ADD_TO_CART(state, lesson) {
      const existingItem = state.items.find((item) => item.id === lesson.id);
      if (!existingItem) {
        state.items.push({
          ...lesson,
          quantity: 1,
          addedAt: new Date().toISOString(),
        });
      }
    },

    REMOVE_FROM_CART(state, lessonId) {
      state.items = state.items.filter((item) => item.id !== lessonId);
      // Update localStorage
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    CLEAR_CART(state) {
      state.items = [];
      // Clear localStorage
      localStorage.removeItem("cart");
    },

    INIT_CART(state, items) {
      state.items = items;
    },

    SET_LOADING(state, status) {
      state.loading = status;
    },

    SET_ERROR(state, error) {
      state.error = error;
    },
  },

  actions: {
    initializeCart({ commit }) {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        commit("INIT_CART", JSON.parse(savedCart));
      }
    },

    addToCart({ commit, state }, lesson) {
      commit("ADD_TO_CART", lesson);
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    removeFromCart({ commit }, lessonId) {
      commit("REMOVE_FROM_CART", lessonId);
    },

    clearCart({ commit }) {
      commit("CLEAR_CART");
    },
  },

  getters: {
    cartItems: (state) => state.items,

    sortedCartItems: (state) => {
      return [...state.items].sort((a, b) => {
        return new Date(b.addedAt) - new Date(a.addedAt);
      });
    },

    hasItems: (state) => state.items.length > 0,

    isLessonInCart: (state) => (lessonId) => {
      return state.items.some((item) => item.id === lessonId);
    },

    cartItemCount: (state) => state.items.length,

    cartTotal: (state) => {
      return state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },

    formattedCartTotal: (_, getters) => {
      return new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
      }).format(getters.cartTotal);
    },

    cartTax: (_, getters) => getters.cartTotal * 0.2,

    cartTotalWithTax: (_, getters) => getters.cartTotal + getters.cartTax,
  },
};

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

    UPDATE_QUANTITY(state, { lessonId, quantity }) {
      const item = state.items.find((item) => item.id === lessonId);
      if (item) {
        item.quantity = quantity;
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },

    REMOVE_FROM_CART(state, lessonId) {
      state.items = state.items.filter((item) => item.id !== lessonId);
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    CLEAR_CART(state) {
      state.items = [];
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

    updateQuantity({ commit, state }, { lessonId, quantity }) {
      const item = state.items.find((item) => item.id === lessonId);
      if (item && quantity >= 1 && quantity <= item.spaces) {
        commit("UPDATE_QUANTITY", { lessonId, quantity });
      } else {
        commit("SET_ERROR", "Invalid quantity update");
      }
    },

    removeFromCart({ commit }, lessonId) {
      commit("REMOVE_FROM_CART", lessonId);
    },

    clearCart({ commit }) {
      commit("CLEAR_CART");
    },

    async checkout({ commit, state, getters }, customerInfo) {
      try {
        commit("SET_LOADING", true);
        commit("SET_ERROR", null);

        // Create order object
        const order = {
          orderId: `ORD-${Date.now()}`,
          orderDate: new Date().toISOString(),
          items: [...state.items],
          customer: customerInfo,
          subtotal: getters.cartTotal,
          total: getters.cartTotal,
          status: "completed",
        };

        // Simulate API call to process order
        await new Promise((resolve) => setTimeout(resolve, 1000));

        alert("Order processed successfully!");

        // Clear the cart after successful checkout
        commit("CLEAR_CART");

        return {
          success: true,
          order,
        };
      } catch (error) {
        commit("SET_ERROR", "Checkout failed. Please try again.");
        return {
          success: false,
          error: error.message,
        };
      } finally {
        commit("SET_LOADING", false);
      }
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
  },
};

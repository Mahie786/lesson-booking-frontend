export default {
  namespaced: true,

  state: {
    items: [],
    loading: false,
    error: null,
  },

  mutations: {
    ADD_TO_CART(state, lesson) {
      const existingItem = state.items.find((item) => item._id === lesson._id);
      if (!existingItem) {
        state.items.push({
          ...lesson,
          quantity: 1,
          addedAt: new Date().toISOString(),
        });
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },

    UPDATE_QUANTITY(state, { lessonId, quantity }) {
      const item = state.items.find((item) => item._id === lessonId);
      if (item) {
        item.quantity = quantity;
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },

    REMOVE_FROM_CART(state, lessonId) {
      state.items = state.items.filter((item) => item._id !== lessonId);
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

    addToCart({ commit }, lesson) {
      commit("ADD_TO_CART", lesson);
    },

    updateQuantity({ commit }, { lessonId, quantity }) {
      commit("UPDATE_QUANTITY", { lessonId, quantity });
    },

    removeFromCart({ commit }, lessonId) {
      commit("REMOVE_FROM_CART", lessonId);
    },

    clearCart({ commit }) {
      commit("CLEAR_CART");
    },

    async checkout({ commit, state }, customerInfo) {
      try {
        commit("SET_LOADING", true);
        commit("SET_ERROR", null);

        // 1. Place order
        const orderData = {
          name: customerInfo.name,
          phone: customerInfo.phone,
          lessons: state.items.map((item) => ({
            lessonId: item._id,
            spaces: item.quantity || 1,
          })),
        };

        const orderResponse = await fetch(
          `${process.env.VUE_APP_API_URL}/orders`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(orderData),
          }
        );

        const orderResult = await orderResponse.json();

        if (orderResult.success) {
          // 2. Update spaces for each lesson
          for (const item of state.items) {
            await fetch(`${process.env.VUE_APP_API_URL}/lessons/${item._id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                spaces: item.spaces - (item.quantity || 1),
              }),
            });
          }

          alert("Order placed successfully!");

          commit("CLEAR_CART");
          return {
            success: true,
            order: orderResult,
          };
        } else {
          throw new Error(orderResult.error || "Failed to process order");
        }
      } catch (error) {
        commit("SET_ERROR", error.message);
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
      return state.items.some((item) => item._id === lessonId);
    },
    cartItemCount: (state) => state.items.length,
    cartTotal: (state) => {
      return state.items.reduce(
        (total, item) => total + item.price * (item.quantity || 1),
        0
      );
    },
  },
};

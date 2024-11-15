// src/store/index.js
import { createStore } from "vuex"; // Use createStore instead of Vuex.Store
import cart from "./modules/cart";
import lessons from "./modules/lessons";

export default createStore({
  modules: {
    cart,
    lessons,
  },
});

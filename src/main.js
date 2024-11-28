import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router/index";
import "./assets/styles/main.css";
// Import Bootstrap CSS
import "bootstrap/dist/css/bootstrap.css";
// Import Bootstrap Icons if installed
import "bootstrap-icons/font/bootstrap-icons.css";

// Import Bootstrap JavaScript
import "bootstrap/dist/js/bootstrap.bundle.js";
const app = createApp(App);
app.use(router);
app.use(store);
app.mount("#app");

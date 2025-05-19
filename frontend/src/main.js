import './assets/main.css'

import { createApp } from 'vue'

import App from './App.vue'
import { createPinia } from "pinia";
import router from "./router";
import drag from './helpers/drag.helper';
import naive from "naive-ui";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";

// createApp(App).use(router).mount("#app");

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.directive("drag", drag);
app.use(naive);
app.mount("#app");
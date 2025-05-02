import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import drag from './helpers/drag.helper';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
// createApp(App).use(router).mount("#app");

const app = createApp(App);
app.use(router);
app.directive("drag", drag);

app.mount("#app");
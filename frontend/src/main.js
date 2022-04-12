import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import "vuetify/dist/vuetify.min.css"; // Ensure you are using css-loader
import { VueMaskDirective } from "v-mask";

const files = require.context("./", true, /\.vue$/i);
files
  .keys()
  .map((key) =>
    Vue.component(key.split("/").pop().split(".")[0], files(key).default)
  );

const filters = require.context("./filters", true, /\.js$/i);
filters
  .keys()
  .map((key) =>
    Vue.filter(key.split("/").pop().split(".")[0], filters(key).default)
  );

const DEFAULT_TITLE = "Home";

Vue.directive("mask", VueMaskDirective);

router.afterEach((to, from) => {
  Vue.nextTick(() => {
    document.title = to.meta.title || DEFAULT_TITLE;
  });
});

new Vue({
  vuetify,
  router,
  render: (h) => h(App),
}).$mount("#app");

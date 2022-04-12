import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import "vuetify/dist/vuetify.min.css"; // Ensure you are using css-loader
const files = require.context("./", true, /\.vue$/i);
files
  .keys()
  .map((key) =>
    Vue.component(key.split("/").pop().split(".")[0], files(key).default)
  );

const DEFAULT_TITLE = "Home";
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

import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../pages/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/students",
    name: "students",
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;

import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../pages/home.vue";
import ListStudent from "../pages/students/list/list-students.vue";
import AddStudent from "../pages/students/add/add-student.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: { title: "Home" },
  },
  {
    path: "/students",
    name: "students",
    component: ListStudent,
    meta: { title: "Estudantes" },
  },
  {
    path: "/students/add",
    name: "add-student",
    component: AddStudent,
    meta: { title: "Adicionar estudante" },
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;

export default {
  name: "app-bar",
  data() {
    return {
      links: [
        { title: "Home", to: "/", icon: "mdi-home" },
        { title: "Estudantes", to: "/students", icon: "mdi-account-box" },
      ],
      drawer: false,
      group: null,
    };
  },
  watch: {
    group() {
      this.drawer = false;
    },
  },
};

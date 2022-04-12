export default {
  data() {
    return {
      panel: [1],
    };
  },
  props: {
    students: {
      type: Array,
      default: [],
      required: true,
    },
  },
  methods: {
    addStudent() {
      this.$router.push("/students/add");
    },
  },
};

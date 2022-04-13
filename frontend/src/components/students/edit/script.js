import { studentService } from "../../../services/student";
import swal from "../../../mixins/swal";
export default {
  mixins: [swal],
  data() {
    return {
      canUpdate: true,
      loading: false,
      valid: false,
      student: {
        id: "",
        ra: "",
        document: "",
        name: "",
        last_name: "",
        email: "",
      },
      nameRules: [(v) => !!v || "Por favor informe o nome"],
      emailRules: [(v) => /.+@.+/.test(v) || "Informe um e-mail válido"],
      menu: false,
    };
  },
  methods: {
    async submit() {
      this.loading = true;
      const { name, last_name, email, id } = this.student;
      const res = await studentService.edit({ name, last_name, email, id });
      this.loading = false;
      if (res.type === "error") {
        const errors = res.err?.response?.data?.errors || [
          "Ocorreu um erro intero",
        ];
        this.showErrorSwal(errors.join(","));
      } else {
        this.success("Estudante editado com sucesso");
        this.$emit("studentEdited");
      }
    },
    goBack() {
      this.$router.go(-1);
    },
  },
  async mounted() {
    this.loading = true;
    const { id } = this.$route.params;
    if (id) {
      const res = await studentService.getStudent(id);
      if (res.type === "success") {
        const { student } = res.data;
        this.student = student;
        this.loading = false;
      }
    }
  },
  watch: {
    student: {
      handler(student) {
        if (!student.name || !/.+@.+/.test(student.email)) {
          this.canUpdate = false;
        } else {
          this.canUpdate = true;
        }
      },
      deep: true,
    },
  },
};

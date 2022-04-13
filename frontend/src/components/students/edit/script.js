import parseDate from "../../../filters/parseDate";
import moment from "moment";
import { studentService } from "../../../services/student";
import swal from "../../../mixins/swal";
export default {
  mixins: [swal],
  data() {
    return {
      canCreate: true,
      loading: false,
      valid: false,
      student: {
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
      this.student.birth_date = moment(
        this.student.birth_date_formatted,
        "DD/MM/YYYY"
      ).format("YYYY-MM-DD");

      const res = await studentService.create(this.student);
      this.loading = true;

      if (res.type === "error") {
        const errors = res.err?.response?.data?.errors || [
          "Ocorreu um erro intero",
        ];
        this.showErrorSwal(errors.join(","));
      } else {
        this.success();
        this.$emit("userCreated");
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
      }
    }
  },
  watch: {
    student: {
      handler(student) {
        if (student.name && student.ra && /.+@.+/.test(student.email)) {
          this.canCreate = true;
        }
      },
      deep: true,
    },
  },
};

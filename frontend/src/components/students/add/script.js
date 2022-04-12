import parseDate from "../../../filters/parseDate";
import cpfValidator from "../../../validators/cpf";
import moment from "moment";
import { studentService } from "../../../services/student";
import swal from "../../../mixins/swal";
export default {
  mixins: [swal],
  data() {
    return {
      valid: false,
      canCreate: false,
      student: {
        birth_date: "",
        birth_date_formatted: moment(new Date()).format("DD/MM/YYYY"),
        ra: "",
        document: "",
        name: "",
        last_name: "",
        email: "",
      },
      nameRules: [(v) => !!v || "Por favor informe o nome"],
      emailRules: [(v) => /.+@.+/.test(v) || "Informe um e-mail válido"],
      documentRules: [(v) => cpfValidator(v) || "O CPF informado não é válido"],
      raRules: [(v) => !!v || "Por favor informe um registro acadêmico (RA)"],
      menu: false,
    };
  },
  methods: {
    async submit() {
      this.student.birth_date = moment(
        this.student.birth_date_formatted,
        "DD/MM/YYYY"
      ).format("YYYY-MM-DD");

      const res = await studentService.create(this.student);
      if (res.type === "error") {
        const errors = res.err?.response?.data?.errors || ["Ocorreu um erro intero"];
        this.showErrorSwal(errors.join(','));
      } else {
        this.success();
        this.$router.push("/students");
      }
    },
  },
  watch: {
    "student.birth_date"(newValue) {
      this.student.birth_date_formatted = parseDate(newValue);
    },
    student: {
      handler(student) {
        if (
          student.name &&
          cpfValidator(student.document) &&
          student.ra &&
          /.+@.+/.test(student.email)
        ) {
          this.canCreate = true;
        }
      },
      deep: true,
    },
  },
};

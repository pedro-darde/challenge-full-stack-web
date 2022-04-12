import parseDate from "../../../filters/parseDate";
import cpfValidator from "../../../validators/cpf";
import moment from "moment";
export default {
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
    validate() {
      this.$refs.form.validate();
    },
  },
  watch: {
    "student.birth_date"(newValue) {
      this.student.birth_date_formatted = parseDate(newValue);
    },
    student: {
      deep: true,
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
    },
  },
};

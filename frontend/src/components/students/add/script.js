import cpfValidator from "../../../validators/cpf";
import { studentService } from "../../../services/student";
import swal from "../../../mixins/swal";
import emailValidator from "../../../validators/email";
export default {
  mixins: [swal],
  data() {
    return {
      loading: false,
      valid: false,
      canCreate: false,
      student: {
        ra: "",
        document: "",
        name: "",
        last_name: "",
        email: "",
      },
      nameRules: [(v) => !!v || "Por favor informe o nome"],
      emailRules: [(v) => emailValidator(v) || "Informe um e-mail válido"],
      documentRules: [(v) => cpfValidator(v) || "O CPF informado não é válido"],
      raRules: [(v) => !!v || "Por favor informe um registro acadêmico (RA)"],
      menu: false,
    };
  },
  methods: {
    async submit() {
      this.loading = true;
      const res = await studentService.create(this.student);
      this.loading = false;

      if (res.type === "error") {
        const errors = res.err?.response?.data?.errors || [
          "Ocorreu um erro intero",
        ];
        this.showErrorSwal(errors.join(","));
      } else {
        this.success("Estudante criado com sucesso");
        this.$emit("studentCreated");
      }
    },
    goBack() {
      this.$router.go(-1);
    },
  },
  watch: {
    student: {
      handler({ name, document, email, ra }) {
        if (name && cpfValidator(document) && ra && emailValidator(email)) {
          this.canCreate = true;
        }
      },
      deep: true,
    },
  },
};

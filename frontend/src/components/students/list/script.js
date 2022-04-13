import { studentService } from "../../../services/student";
import moment from "moment";
import { debounce } from "../../../helpers/debounce";
import Swal from "sweetalert2";
import swal from "../../../mixins/swal";
export default {
  mixins: [swal],
  data() {
    return {
      tableOptions: {
        sortBy: ["id"],
      },
      filter: {
        document: "",
        email: "",
        name: "",
      },
      page: 1,
      totalPages: 1,
      totalRecords: 0,
      panel: [1],
      students: [],
      loading: false,
      headers: [
        {
          text: "#",
          align: "start",
          value: "id",
        },
        { text: "Nome", value: "name" },
        { text: "E-mail", value: "email" },
        { text: "CPF", value: "document" },
        { text: "RA", value: "ra" },
        { text: "Data de criação", value: "created_at" },
        { text: "Ações", value: "actions", sortable: false },
      ],
    };
  },
  methods: {
    addStudent() {
      this.$router.push("/students/add");
    },
    async paginate() {
      const { page, itemsPerPage } = this.tableOptions;
      this.loading = true;
      const res = await studentService.paginate(
        itemsPerPage,
        page,
        this.filter
      );
      this.loading = false;

      if (res.type === "success") {
        const { students, totalStudents, numberOfPages } = res.data;
        this.totalRecords = totalStudents;
        this.totalPages = numberOfPages;
        this.students = students.map((student) => ({
          id: student.id,
          name: student.name + " " + student.last_name || "",
          document: student.document,
          email: student.email,
          ra: student.ra,
          created_at: moment(student.created_at).format("DD/MM/YYYY HH:mm:ss"),
        }));
      }
    },
    editStudent(id) {
      this.$router.push(`/students/edit/${id}`);
    },
    removeStudent(id) {
      Swal.fire({
        title: "Você tem certeza ?",
        html: "Ao aceitar o estudante será removido do sistema!",
        icon: "warning",
        confirmButtonText: "Sim",
        confirmButtonColor: "error",
        cancelButtonText: "Cancelar",
        showCancelButton: true,
      }).then((res) => {
        if (res.isConfirmed) {
          this.loading = true;
          studentService.delete(id).then((res) => {
            if (res.type === "success") {
              this.success("Estudante removido");
              this.paginate();
            }
          });
        }
      });
    },
  },
  watch: {
    tableOptions: {
      handler() {
        this.paginate();
      },
      deep: true,
    },
    filter: {
      handler: debounce(function (val) {
        this.tableOptions.page = 1;
        this.loading = true;
        this.paginate();
      }, 750),
      deep: true,
    },
  },
};

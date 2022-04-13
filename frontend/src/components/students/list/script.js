import { studentService } from "../../../services/student";
import moment from "moment";
import { debounce } from "../../../helpers/debounce";
export default {
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
      console.log("aqui");
      const { page, itemsPerPage } = this.tableOptions;
      const { document, email, name } = this.filter;
      this.loading = true;
      const res = await studentService.paginate(itemsPerPage, page, {
        document,
        email,
        name,
      });
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
  },
  async mounted() {},
  watch: {
    tableOptions: {
      handler() {
        this.paginate();
      },
      deep: true,
    },
    filter: {
      handler: debounce(function (val) {
        this.loading = true;
        this.paginate();
      }, 750),
      deep: true,
    },
  },
};

import { studentService } from "../../services/student";

export default {
  data() {
    return {
      countStudents: 0,
      totalEmail: 0,
      totalCpf: 0,
      cpfFiltered: [],
      emailFiltered: [],
    };
  },

  methods: {
    async getLastStudents() {
      const { data } = await studentService.lastWeekCount();

      if (data) {
        this.countStudents = data.count;
      }
    },

    async getWithSameData() {
      const { data } = await studentService.withRepeteadData();

      if (data) {
        const { emailsFiltered, cpfFiltered } = data;

        this.emailFiltered = emailsFiltered;
        this.cpfFiltered = cpfFiltered;

        this.totalEmail = emailsFiltered.reduce(
          (previous, key) => previous + parseInt(key.count),
          0
        );

        this.totalCpf = cpfFiltered.reduce(
          (previous, key) => previous + parseInt(key.count),
          0
        );
      }
    },
  },
  created() {
    this.getLastStudents();
    this.getWithSameData();
  },
};

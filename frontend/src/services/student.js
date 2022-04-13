import { axiosPlugin } from "../plugins/axios-plugin";

class StudentService {
  #modelName = "/students";
  #axiosPlugin = axiosPlugin;

  async create(student) {
    try {
      const res = await this.#axiosPlugin.post(this.#modelName, { student });
      return { type: "success", data: res.data };
    } catch (err) {
      return { type: "error", err };
    }
  }

  async paginate(limit, page, filter = {}) {
    try {
      let query = { limit, page };

      Object.keys(filter).forEach((key) => {
        if (filter[key]) {
          query[key] = filter[key];
        }
      });

      const res = await this.#axiosPlugin.get(this.#modelName, query);

      return { type: "success", data: res.data };
    } catch (err) {
      return { type: "error", err };
    }
  }

  async getStudent(id) {
    try {
      const res = await this.#axiosPlugin.getById(this.#modelName, id);
      return { type: "success", data: res.data };
    } catch (err) {
      return { type: "error", err };
    }
  }
}

export const studentService = new StudentService();

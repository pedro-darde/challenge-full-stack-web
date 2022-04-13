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
      
      const { document, email, name } = filter;

      if (document) {
        query["document"] = document;
      }

      if (email) {
        query["email"] = email;
      }

      if (name) {
        query["name"] = name;
      }

      const res = await this.#axiosPlugin.get(this.#modelName, query);

      return { type: "success", data: res.data };
    } catch (err) {
      return { type: "error", err };
    }
  }
}

export const studentService = new StudentService();

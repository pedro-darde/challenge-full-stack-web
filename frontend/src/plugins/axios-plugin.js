import axios from "axios";
class AxiosPlugin {
  #axiosClient;
  constructor() {
    this.#axiosClient = axios.create({ baseURL: "http://localhost:3335/api" });
  }

  get(modelName, query) {
    return this.#axiosClient.get(`${modelName}`, {
      params: query,
    });
  }

  getById(modelName, route, id) {
    return this.#axiosClient.get(`${modelName}/${route}/${id}`);
  }

  post(modelName, data, config) {
    return this.#axiosClient.post(`${modelName}`, data, config);
  }

  patch(modelName, data) {
    return this.#axiosClient.patch(`${modelName}`, data);
  }

  delete(modelName, id, config = {}) {
    return this.#axiosClient.delete(`${modelName}/${id}`, config);
  }
}

export const axiosPlugin = new AxiosPlugin();

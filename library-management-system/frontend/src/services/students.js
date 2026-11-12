import axios from "axios";

const api = axios.create({ headers: { "Content-Type": "application/json" } });

export const studentsApi = {
  async list() {
    const { data } = await api.get("/students");
    if (!Array.isArray(data)) throw new Error("The server returned an invalid student list.");
    return data;
  },
  async create(student) {
    const { data } = await api.post("/students", student);
    return data;
  },
  async update(id, student) {
    const { data } = await api.put(`/students/${encodeURIComponent(id)}`, student);
    return data;
  },
  async remove(id) {
    const { data } = await api.delete(`/students/${encodeURIComponent(id)}`);
    return data;
  },
};

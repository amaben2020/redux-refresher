import axios from "axios";

const token = "kjska90ej9jw";
axios.defaults.headers.common.Authorization = `Bearer ${token}`;
const api = axios.create({ baseURL: "http://localhost:5000/" });

export default api;
export const EndPoints = { sales: "sales", products: "products" };

// axios.defaults.headers.common.Authorization

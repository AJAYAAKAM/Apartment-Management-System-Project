import axios from "axios";

const API = axios.create({
  baseURL: "https://apartment-management-system-project.onrender.com/api",
});

export default API;
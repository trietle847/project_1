import axios from "axios";

const createAPI = axios.create({
  baseURL: "http://localhost:3000", // Thay đổi tùy theo server
  headers: {
    "Content-Type": "application/json",
  },
});

export default createAPI;

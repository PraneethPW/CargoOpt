import axios from "axios";

export const api = axios.create({
  baseURL: "  https://cargoopt-d0bee956a2ea.herokuapp.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

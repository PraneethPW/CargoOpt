import axios from "axios";

export const api = axios.create({
  baseURL: "https://cargoopt-production.up.railway.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});

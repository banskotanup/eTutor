import axios from "axios";

const API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080",
    headers: { "content-type": "application.json" },
    withCredentials: true,
});

export default API;
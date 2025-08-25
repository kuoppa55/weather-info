import axios from "axios";

const API_BASE = 
    process.env.NODE_ENV === "production"
        ? "https://test.onrender.com"
        : ""

export const api = axios.create({baseURL: API_BASE})
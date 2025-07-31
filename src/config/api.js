import axios from "axios"

// In your config/api.js file, it should be:
export const API_BASE_URL = "http://localhost:8080"; // or whatever port your Spring Boot runs on

const api=axios.create({baseURL:API_BASE_URL})

const jwt=localStorage.getItem("jwt");


api.defaults.headers.common["Authorization"]=`Bearer ${jwt}`
api.defaults.headers.post["Content-Type"]="application/json"

export default api;
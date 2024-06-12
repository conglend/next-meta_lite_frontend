import axios from "axios";

if (!process.env.NEXT_PUBLIC_APP_BASE_URL) {
  console.log("NEXT_PUBLIC_APP_BASE_URL is empty");
}

const apiInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

export default apiInstance;

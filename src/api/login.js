import http from "@/api/index";
export const loginApi = data => http.post("/login", data, { loading: false });

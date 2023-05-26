import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;
//config axios.interceptors
export const axiosJWT = axios.create({
  baseURL: `${API_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Để request gửi kèm cookie
});
axiosJWT.interceptors.request.use(
  async function (config) {
    // Do something before request is sent
    const token = Cookies.get("token");
    if (!token) {
      config.headers.Authorization = null;
    } else {
      try {
        const decoded = jwt_decode(token);
        const currentTime = new Date().getTime() / 1000;
        if (decoded.exp <= currentTime) {
          const url = `${API_URL}/user/refreshToken/${decoded.id}`;
          const res = await axios.post(url, decoded);
          const { token } = res.data;
          Cookies.set("token", token, { expires: 7 });
          config.headers.Authorization = `Bearer ${token}`;
        } else {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        console.error("Lỗi xác thực token:", error);
      }
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
// Response interceptor for API calls
axiosJWT.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      const access_token = await axiosJWT();
      axios.defaults.headers.common["Authorization"] = "Bearer " + access_token;
      return axiosJWT(originalRequest);
    }
    return Promise.reject(error);
  }
);

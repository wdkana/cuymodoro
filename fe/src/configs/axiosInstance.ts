import axios, { AxiosRequestConfig, RawAxiosRequestConfig } from "axios";
import CONST from "@/lib/constants";

// Axios instance is config for easy to use axios
const configAxios: AxiosRequestConfig = {
  baseURL: CONST.BASE_API_URL,
  headers: {},
} as RawAxiosRequestConfig;

const axiosInstance = axios.create(configAxios);

export default axiosInstance;

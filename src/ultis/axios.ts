import axios, { AxiosHeaders, AxiosInstance } from "axios";
import { auth } from "./vueFire";
export const axiosHeaders = new AxiosHeaders();

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
});

export function setAuthorizationHeader(value: string) {
  axiosHeaders.setAuthorization(value);
}
// axiosInstance.interceptors.response.use(
//   function ({ data }) {
//     return data;
//   },
//   function ({ response }) {
//     return response;
//   }
// );

axiosInstance.interceptors.request.use(
  async function (config) {
    const accessToken = await auth.currentUser?.getIdToken();

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {
    // router.push({path:"/error"});
    throw new Error();
  }
);

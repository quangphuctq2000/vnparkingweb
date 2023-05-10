import { axiosInstance as axios } from "../axios";

export function getPaymentInfo(parkingId: string) {
  return axios.get(`/parking/detail/${parkingId}`);
}

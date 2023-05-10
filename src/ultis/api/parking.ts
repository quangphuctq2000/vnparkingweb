import { axiosInstance as axios } from "../axios";
export function checkIn(carIdentityNumber: string) {
  return axios.post("/parking/checkIn", {
    vehicleIdentity: carIdentityNumber,
  });
}

export function getParkingInfo(carIdentityNumber: string) {
  return axios.post("/parking/checkOut", {
    vehicleIdentity: carIdentityNumber,
  });
}

export function checkout(carIdentityNumber: string) {
  return axios.post("parking/checkout-manual-info", {
    vehicleIdentity: carIdentityNumber,
  });
}

export function checkoutSuccess(
  parkingId: number,
  price: number,
  checkOut: string
) {
  return axios.post("/parking/checkout-manual-success", {
    parkingId,
    checkOut,
    price,
  });
}

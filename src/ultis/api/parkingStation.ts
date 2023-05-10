import { axiosInstance as axios } from "@/ultis/axios";

export function getParkingStation() {
  return axios.get("/web/parking-stations");
}

export function createParkingStationProperty(data: {
  name?: string;
  latitude: number;
  longitude: number;
  description?: string;
  parkingLotNumber: number;
  pricePerHour: number;
  pricePerMonth: number;
}) {
  return axios.post("/web/parking-stations", data);
}

export function updateParkingStationProperty(data: {
  id: number;
  name?: string;
  latitude: number;
  longitude: number;
  description?: string;
  parkingLotNumber: number;
  pricePerHour: number;
  pricePerMonth: number;
}) {
  return axios.put("/web/parking-stations", data);
}

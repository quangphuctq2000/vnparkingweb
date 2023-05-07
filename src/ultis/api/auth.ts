import { axiosInstance as axios } from "../axios";
export function signup(token: string) {
  return axios.post("/auth/signup", {
    token,
    role: 3,
  });
}

export function login(token: string) {
  return axios.post("/auth/login", {
    token,
  });
}

export function authWithGoogle(token: string) {
  return axios.post("/auth/google-auth", {
    token,
    role: 3,
  });
}

export function updateUserInfo(displayName: string, phoneNumber: string) {
  return axios.put("/auth/user-info", {
    displayName,
    phoneNumber,
  });
}

export function updateUserEmailPassword(email: string, password: string) {
  return axios.put("/auth/user-auth-info", {
    email,
    password,
  });
}

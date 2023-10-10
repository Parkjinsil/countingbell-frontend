import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000/api/user/",
});

export const login = async (data) => {
  return await instance.post("signin", data);
};

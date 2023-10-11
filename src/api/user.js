import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/user/",
});

export const login = async (data) => {
  return await instance.post("signin", data);
};

export const addMember = async (data) => {
  console.log("회원가입 axios call!!");
  return await instance.post("signup", data);
};

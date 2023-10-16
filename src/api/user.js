import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/",
});

export const login = async (data) => {
  return await instance.post("user/signin", data);
};

export const addMember = async (data) => {
  console.log("회원가입 axios call!!");
  console.log(data);
  return await instance.post("user/signup", data);
};

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

export const searchId = async (data) => {
  console.log("아이디 찾기 axios call");
  return await instance.post("searchId", data);
};

export const searchPwd = async (data) => {
  console.log("비밀번호 찾기 axios call");
  return await instance.post("searchPwd", data);
};

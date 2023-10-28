import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/",
});

// 회원가입
export const addMember = async (data) => {
  return await instance.post("signup", data);
};

import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/",
});

// 회원가입
export const addMember = async (data) => {
  return await instance.post("signup", data);
};

// 회원조회
export const findMember = async (id) => {
  let url = `user/update/${id}`;
  return await instance.get(url);
};

// 회원수정
export const updateMember = async (data) => {
  console.log("유저 정보 수정 axios!!");
  return await instance.put("update", data);
};

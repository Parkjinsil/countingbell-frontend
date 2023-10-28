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

// 회원 수정
export const updateMember = async (data) => {
  console.log("회원정보 수정하기 axios!!");
  return await instance.put("update", data);
};

// 회원 1명 보기
export const showMember = async (id) => {
  console.log("회원정보 보기 axios");
  return await instance.get("user/" + id);
};

// 회원 삭제
export const deleteMember = async (id) => {
  console.log("회원정보 삭제 axios ");
  console.log("탈퇴할 회원 아이디 = " + id);
  return await instance.delete("user/" + id);
};

// 아이디 중복체크
export const checkId = async (id) => {
  return await instance.get("checkId/" + id);
};

// 닉네임 중복체크
export const checkNickname = async (data) => {
  return await instance.post("checkNickname", data);
};

import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/",
});

// 음식타입 전체보기
export const getFoods = async (page) => {
  console.log("음식타입 전체보기 axios call!!");
  let url = `public/food?page=${page}`;
  return await instance.get(url);
};

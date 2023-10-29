import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/",
});

// 식당전체보기
export const getRestaurants = async (page) => {
  console.log("식당 전체보기 axios call!!");
  let url = `public/restaurant?page=${page}`;
  return await instance.get(url);
};

// 식당 1개 보기
export const getRestaurant = async (id) => {
  let url = `restaurant/${id}`;
  return await instance.get(url);
};

// 식당 등록
export const addRestaurant = async (data) => {
  console.log("백에보낼때" + data);
  return await instance.post("restaurant", data);
};
// 위치별 식당조회
export const findByLocalCode = async (id) => {
  let url = `restaurant/${id}/location`;
  return await instance.get(url);
};

// 음식타입별 식당조회
export const findByFoodCode = async (id) => {
  let url = `restaurant/${id}/food`;
  return await instance.get(url);
};

export const findResByFilter = async ({ foodCode, localCode }) => {
  console.log("필터 거르기 axios call!!");
  let url = `restaurant/${foodCode}/${localCode}`;
  return await instance.get(url);
};

// 아이디별 식당조회
export const getResByUserId = async (id) => {
  let url = `user/${id}/restaurant`;
  return await instance.get(url);
};

// 메뉴명으로 식당 검색
export const searchResByMenuName = async (keyword) => {
  let url = `search/${keyword}`;
  return await instance.get(url);
};

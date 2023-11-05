import { keyboard } from "@testing-library/user-event/dist/keyboard";
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/",
});

// 식당전체보기
export const getRestaurants = async (page) => {
  console.log("식당 전체보기 axios 몇페이지? " + page);
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

// 사용자별 식당찜조회
export const fetchUserPicks = async (id) => {
  let url = `user/${id}/picks`;
  return await instance.get(url);
};

// 식당 찜
export const updatePick = async (data) => {
  return await instance.post("restaurant/pick", data);
};

// 식당 찜 취소
export const deletePick = async (id) => {
  return await instance.delete("restaurant/pick/" + id);
};

// 식당별 리뷰조회
export const findReviewByResCode = async (resCode) => {
  let url = `restaurant/${resCode}/review`;
  return await instance.get(url);
};

// 식당이름따라
// export const getRestaurantByName = async (resName) => {
//   return await instance.get(`search?name=${resName}`);
// };

// 아이디별 식당조회
export const getResByUserId = async (id) => {
  let url = `restaurant/${id}/user`;
  return await instance.get(url);
};

// 메뉴명으로 식당 검색
export const searchResByMenuName = async (keyword) => {
  let url = `search/${keyword}`;
  return await instance.get(url);
};

// 식당명으로 식당 검색
export const searchResByResName = async (keyword) => {
  let url = `restaurant/search/${keyword}`;
  return await instance.get(url);
};

// 식당1개에 따른 찜
export const resPickList = async (id) => {
  let url = `restaurant/${id}/pick`;
  return await instance.get(url);
};

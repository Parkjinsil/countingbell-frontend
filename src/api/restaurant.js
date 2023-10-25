import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/",
});

// 식당전체보기
export const getRestaurants = async (page) => {
  console.log("식당 전체보기 axios call!!");
  let url = `public/restaurnt?page=${page}`;
  return await instance.get(url);
};

// 위치따라
export const findByLocalCode = async (id) => {
  let url = `restaurant/${id}/location`;
  return await instance.get(url);
};

// 식당이름따라
export const getRestaurantByName = async (resName) => {
  return await instance.get(`search?name=${resName}`);
};

// 음식타입따라 ==> food.js로 이동
export const getRestaurantByFood = async (foodCode) => {
  return await instance.get(`search?foodCode=${foodCode}`);
};

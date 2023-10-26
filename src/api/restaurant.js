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

// 식당이름따라
// export const getRestaurantByName = async (resName) => {
//   return await instance.get(`search?name=${resName}`);
// };

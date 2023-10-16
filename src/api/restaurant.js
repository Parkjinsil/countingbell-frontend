import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/",
});

// 식당이름따라
export const getRestaurantByName = async (resName) => {
  return await instance.get(`search?name=${resName}`);
};

// 음식타입따라
export const getRestaurantByFood = async (foodCode) => {
  return await instance.get(`search?foodCode=${foodCode}`);
};

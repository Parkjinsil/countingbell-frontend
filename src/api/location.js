import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/",
});

export const getLocations = async (page) => {
  console.log("위치 전체보기 axios call!!");
  let url = `public/location?page=${page}`;
  return await instance.get(url);
};

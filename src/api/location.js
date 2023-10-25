import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/",
});

export const getLocations = async (page) => {
  console.log("위치 전체보기 axios call!!");
  let url = `public/location?page=${page}`;
  return await instance.get(url);
};

export const addLocation = async (data) => {
  console.log("위치추가 axios call!!");
  return await instance.post("location", data);
};

export const getLocation = async (id) => {
  console.log("위치 1개보기 axios call!!");
  let url = `public/location/${id}`;
  return await instance.get(url);
};

export const updateLocation = async (data) => {
  console.log("위치수정 axios call!!");
  return await instance.put("location", data);
};

export const deleteLocation = async (id) => {
  return await instance.delete("location/" + id);
};

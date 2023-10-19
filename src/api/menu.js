import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/",
});

export const addMenu = async (data) => {
  console.log("메뉴추가 axios call!!");
  return await instance.post("menu", data);
};

export const getMenus = async (page) => {
  console.log("메뉴전체보기 axios call!!");
  let url = `public/menu?page=${page}`;
  return await instance.get(url);
};

export const getMenu = async (id) => {
  console.log("메뉴 1개보기 axios call!!");
  let url = `public/menu/${id}`;
  return await instance.get(url);
};

export const updateMenu = async (data) => {
  console.log("메뉴수정 axios call!!");
  return await instance.put("menu", data);
};

export const deleteMenu = async (id) => {
  return await instance.delete("menu/" + id);
};

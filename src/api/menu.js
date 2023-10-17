import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/",
});

export const addMenu = async (data) => {
  return await instance.post("menu", data);
};

export const getMenus = async (page, restaurant) => {
  let url = `public/menu?page=${page}`;
  if (restaurant !== null) {
    url += `$restaurant=${restaurant}`;
  }
  return await instance.get(url);
};

export const getMenu = async (id) => {
  return await instance.get("public/menu/" + id);
};

// export const deleteMenu = async (id) => {
//   return await instance.delete("menu/" + id);
// };

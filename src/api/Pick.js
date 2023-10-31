import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/",
});

export const addPick = async (data) => {
  return await instance.post("pick", data);
};

export const delPick = async (id) => {
  return await instance.delete("pick/" + id);
};

export const putPick = async (data) => {
  return await instance.put("pick", data);
};

export const getTotalPick = async (page) => {
  let url = `public/pick?page=${page}`;
  return await instance.get(url);
};

export const getPick = async (id) => {
  return await instance.get("pick/" + id);
};

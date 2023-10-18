import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/",
});

export const addDiscount = async (data) => {
  return await instance.post("discount", data);
};

export const getDiscounts = async (page) => {
  let url = `public/discount?page=${page}`;
  return await instance.get(url);
};

export const getDiscount = async (id) => {
  return await instance.get("discount" + id);
};

export const postDiscount = async (data) => {
  return await instance.put("discount", data);
};

export const delDiscount = async (id) => {
  return await instance.delete("discount" + id);
};

import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8080/api/",
  });
  
  export const addDiscount = async (data) => {
    return await instance.post("discount", data);
  };

  export const getDiscounts = async (page, restaurant) => {
    let url = `public/video?page=${page}`;
    if (category !== null) {
      url += `&category=${category}`;
    }
    return await instance.get(url);
  };
  
  export const getDiscount = async (id) => {
    return await instance.get("discount" + id);
  };
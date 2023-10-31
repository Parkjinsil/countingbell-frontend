import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/",
});

export const addDiscount = async (data) => {
  console.log("할인추가");
  return await instance.post("discount", data);
};

export const getDiscounts = async (page) => {
  console.log("할인전체보기");
  let url = `public/discount?page=${page}`;
  return await instance.get(url);
};

export const getDiscount = async (id) => {
  console.log("할인1개보기");
  return await instance.get("discount/" + id);
};

export const putDiscount = async (data) => {
  console.log("할인수정");
  return await instance.put("discount", data);
};

export const delDiscount = async (id) => {
  console.log("할인삭제");
  return await instance.delete("discount/" + id);
};

// 식당별 할인 보기
export const findByDisCode = async (id) => {
  let url = `discount/${id}/restaurant`;
  return await instance.get(url);
};

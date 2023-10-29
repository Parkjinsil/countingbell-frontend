import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8080/api/",
  });

export const addReser = async (data) => {
  console.log("예약등록 axios call!!");
  return await instance.post("reservation", data);
};

// 예약 1개 보기
export const getReser = async (id) => {
  let url = `reservation/${id}`;
  return await instance.get(url);
}

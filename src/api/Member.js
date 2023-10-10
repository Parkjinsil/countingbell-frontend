import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000/api/",
});

export const addMember = async (data) => {
  return await instance.post("member", data);
};

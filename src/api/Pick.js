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

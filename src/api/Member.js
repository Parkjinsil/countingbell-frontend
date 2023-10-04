import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000/api/",
});

export const addMember = async (Formdata) => {
  return await instance.post("member", Formdata);
};

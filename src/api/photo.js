import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/",
});

export const addPhoto = async (data) => {
    return await instance.post("photo", data);
  };

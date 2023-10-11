import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/user",
  headers: {
    "Content-Type": "application/json",
  },
});

export const login = async (data) => {
  return await instance.post("signin", data);
};

export const addMember = async (formData) => {
  try {
    const response = await axios.post("register", formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

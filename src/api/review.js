import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8080/api/",
});

export const addReview = async (data) => {
    return await instance.post("review", data);
}
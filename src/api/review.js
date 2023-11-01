import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8080/api/",
});

export const addReview = async (data) => {
    return await instance.post("review", data);
}

export const updateReview = async (data) => {
    return await instance.put("review", data);
}
export const deleteReview = async (id) => {
    return await instance.delete("reivew/" + id);
}

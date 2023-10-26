import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8080/api/",
});

// 리뷰 전체
export const getReview = async (page) => {
    let url = `public/review?page=${page}`;
    return await instance.get(url);
}

export const addReview = async (data) => {
    return await instance.post("review", data);
}
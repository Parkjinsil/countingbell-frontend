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
export const deleteReview = async (reviewCode) => {
    return await instance.delete("review/"+reviewCode);
}

// 평점 ?인 리뷰 조회
export const reviewByGrade = async (reviewGrade) => {
    return await instance.get("review/"+reviewGrade+"/grade");
}

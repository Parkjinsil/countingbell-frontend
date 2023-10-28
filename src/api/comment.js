import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8080/api/",
});

// 리뷰 댓글 추가
export const addComment = async (data) => {
    return await instance.post("review/comment", data);
};

export const putComment = async (data) => {
    return await instance.put("review/comment", data);
};

export const delComment = async (id) => {
    return await instance.delete("review/comment/" + id);
};

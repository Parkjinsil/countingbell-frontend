import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    addReview
} from "../api/review";

const asyncAddReview = createAsyncThunk(
    "reviewSice/asyncAddReview",
    async (data) => {
        const result = await addReview(data);
        return result.data;
    }
);

const reviewSlice = createSlice({
    name: "reviewSlice",
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(asyncAddReview.rejected,(state, action) => {
            return alert("리뷰 등록에 실패했습니다. 다시 시도해주세요.");
        })
        .addCase(asyncAddReview.fulfilled, (state, action) => {
            alert("리뷰 등록 성공");
            return action.payload;
        })
    }
});

export default reviewSlice;
export { asyncAddReview };
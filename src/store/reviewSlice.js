import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Action } from "@remix-run/router";
import {
    addReview, getReviews,
} from "../api/review";

const asyncAddReview = createAsyncThunk(
    "reviewSice/asyncAddReview",
    async (data) => {
        const result = await addReview(data);
        return result.data;
    }
);

const asyncGetReviews = createAsyncThunk(
    "reviewSlice/asyncGetReviews",
    async (page) => {
        const result = await asyncGetReviews(page);
        return result.data;
    }
);

const reviewSlice = createSlice({
    name: "reviewSlice",
    initialState: {},
    reducers: {
        setReviewList: (state, action) => {
            state.reviewList = action.payload;
        },
        setSelectReview: (state, action) => {
            state.selectedReview = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(asyncAddReview.rejected, (state, action) => {
                return alert("리뷰 등록에 실패했습니다. 다시 시도해주세요.");
            })
            .addCase(asyncAddReview.fulfilled, (state, action) => {
                alert("리뷰 등록 성공");
                return action.payload;
            })

        builder.addCase(asyncGetReviews.fullfilled, (state, action) => {
            state.reviewList = action.payload;
        });
    }
});

export default reviewSlice;
export { asyncAddReview, asyncGetReviews };
export const { setReviewList, setSelectReview } = reviewSlice.actions;
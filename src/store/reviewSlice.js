import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    addReview, updateReview
} from "../api/review";
import { findReviewById } from "../api/user";
import { findReviewByResCode } from "../api/restaurant";

// 리뷰 추가
const asyncAddReview = createAsyncThunk(
    "reviewSice/asyncAddReview",
    async (data) => {
        const result = await addReview(data);
        return result.data;
    }
);

// resCode별 리뷰
const asyncFindReviewByResCode = createAsyncThunk(
    "reviewSlice/asyncFindReviewByResCode",
    async (resCode) => {
        const result = await findReviewByResCode(resCode);
        return result.data;
    }
)

// id별 리뷰
const asyncFindReviewById = createAsyncThunk(
    "reviewSlice/asyncFindReviewById",
    async (id) => {
        const result = await findReviewById(id);
        return result.data;
    }
)

// 리뷰 수정
const asyncUpdateReview = createAsyncThunk(
    "reviewSlice/asyncUpdateReview",
    async (data) => {
        const result = await updateReview(data);
        return result.data;
    }
)

const reviewSlice = createSlice({
    name: "reviewSlice",
    initialState: { reviewList: [], selectedReview: null },
    reducers: {
        setReviewList: (state, action) => {
            state.reviewList = action.payload;
        },
        setSelectedReview: (state, action) => {
            state.selectedReview = action.payload;
        },
    },
    extraReducers: (builder) => {
        // 리뷰등록
        builder
            .addCase(asyncAddReview.rejected, (state, action) => {
                return alert("리뷰 등록에 실패했습니다. 다시 시도해주세요.");
            })
            .addCase(asyncAddReview.fulfilled, (state, action) => {
                alert("리뷰 등록 성공");
                state.reviewList.push(action.payload);
            })

        // 식당별 리뷰
        builder.addCase(asyncFindReviewByResCode.fulfilled, (state, action) => {
            state.reviewList = action.payload;
            return state;
        })

        // id별 리뷰
        builder.addCase(asyncFindReviewById.fulfilled, (state, action) => {
            state.reviewList = action.payload;
            return state;
        });

        // 리뷰 수정
        builder
            .addCase(asyncUpdateReview.fulfilled, (state, action) => {
                alert("리뷰 수정에 성공했습니다.");
            })
            .addCase(asyncUpdateReview.rejected, (state, action) => {
                alert("리뷰 수정에 실패했습니다.");
            });
    }
});

export default reviewSlice;
export { asyncAddReview, asyncFindReviewById, asyncFindReviewByResCode, asyncUpdateReview };
export const { setReviewList, setSelectedReview } = reviewSlice.actions;
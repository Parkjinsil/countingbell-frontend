import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addComment } from "../api/comment";

// 댓글 추가 비동기 액션 생성
const asyncAddComment = createAsyncThunk(
    "commentSlice/asyncAddComment",
    async (data) => {
        const result = await addComment(data);
        return result.data;
    }
);

const commentSlice = createSlice({
    name: "commentSlice",
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(asyncAddComment.rejected, (state, action) => {
                return alert("댓글 등록에 실패했습니다");
            })
            .addCase(asyncAddComment.fulfilled, (state, action) => {
                return action.payload;
            })
    }
});

// 생성한 slice와 액션 생성자 export
export default commentSlice;
export { asyncAddComment };

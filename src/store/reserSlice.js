import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addReser, getReser } from "../api/reser";
import { findReserById } from "../api/user";

const asyncAddReser = createAsyncThunk(
    "reserSlice/asyncAddReser",
    async (data) => {
        const result = await addReser(data);
        return result.data;
    }
)

// 예약 1개 가져오기
const asyncGetReser = createAsyncThunk(
    "reserSlice/asyncGetReser",
    async (id) => {
        const result = await getReser(id);
        return result.data;
    }
)

// id별 예약
const asyncFindReserById = createAsyncThunk(
    "reserSlice/asyncFindReserById",
    async (id) => {
        const result = await findReserById(id);
        return result.data;
    }
)

const reserSlice = createSlice({
    name: "reserSlice",
    initialState: { reserList: [], selectedReser: null},
    reducers: {
        setReserList: (state, action) => {
            state.reserList = action.payload;
        },
        setSelectedReser: (state, action) => {
            state.selectedReser = action.payload;
        },
    },
    extraReducers: (builder) => {
        // 예약등록
        builder.addCase(asyncAddReser.fulfilled, (state, action) => {
            alert("예약 등록 성공");
            state.reserList.push(action.payload);
        })
        .addCase(asyncAddReser.rejected, (state, action) => {
            alert("예약 등록 실패");
        })
        
        // 예약 1개 가져오기
        builder.addCase(asyncGetReser.fulfilled, (state, action) => {
            state.selectedReser = action.payload;
            return state;
        })

        builder.addCase(asyncFindReserById.fulfilled, (state, action) => {
            state.reserList = action.payload;

            return state;
        });
    }
});

export default reserSlice;
export { asyncAddReser, asyncGetReser, asyncFindReserById };
export const { setReserList, setSelectedReser } = reserSlice.actions;
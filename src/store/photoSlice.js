import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import { addPhoto } from "../api/photo";

const asyncAddPhoto = createAsyncThunk(
    "photoSlice/asyncAddPhoto",
    async (data) => {
        const result = await addPhoto(data);
        return result.data;
    }
);

const photoSlice = createSlice({
    name: "photoSlice",
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(asyncAddPhoto.rejected, (state, action) => {
            return alert("메뉴 등록에 실패했습니다. 다시 시도해주세요.");
        })
        .addCase(asyncAddPhoto.fulfilled, (state, action) => {
            alert("사진 등록 성공!");
            return action.payload;
        })
    }
});

export default photoSlice;
export { asyncAddPhoto };
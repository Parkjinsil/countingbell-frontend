import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    addRestaurant
} from "../api/restaurant";

const asyncAddRestaurant = createAsyncThunk(
    "restaurantSlice/asyncAddRestaurant",
    async (data) => {
        console.log(data);
        const result = await addRestaurant(data);
        return result.data;
    }
);

const restaurantSlice = createSlice({
    name: "restaurantSlice",
    initialState: {},
    reducers: {
    },
    extraReducers: (builder) => {
        builder
        .addCase(asyncAddRestaurant.rejected, (state, action) =>{
            return alert("식당 등록에 실패했습니다. 다시 시도해주세요.");
        })
        .addCase(asyncAddRestaurant.fulfilled, (state, action) => {
            alert ("식당 등록 성공.");

            return action.payload;
        })
    }
});

export default restaurantSlice;
export { asyncAddRestaurant };
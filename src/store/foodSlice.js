import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getFoods } from "../api/food";

// 음식타입 전체 가져오기
const asyncGetFoods = createAsyncThunk(
  "foodSlice/asyncGetFoods",
  async (page) => {
    const result = await getFoods(page);
    return result.data;
  }
);

const foodSlice = createSlice({
  name: "restaurantSlice",
  initialState: { foodList: [] },
  reducers: {
    setFoodList: (state, action) => {
      state.foodList = action.payload;
    },
  },
  extraReducers: (builder) => {
    // 음식타입목록
    builder.addCase(asyncGetFoods.fulfilled, (state, action) => {
      state.foodList = action.payload;
    });
  },
});
export default foodSlice;
export { asyncGetFoods };
export const { setFoodList } = foodSlice.actions;

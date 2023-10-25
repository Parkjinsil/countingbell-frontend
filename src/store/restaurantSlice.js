import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { findByLocalCode } from "../api/restaurant";

// 위치별 식당 가져오기
const asyncFindByLocalCode = createAsyncThunk(
  "restaurantSlice/asyncFindByLocalCode",
  async (id) => {
    const result = await findByLocalCode(id);
    // console.log("위치별 식당목록:", result.data);
    return result.data;
  }
);

const restaurantSlice = createSlice({
  name: "restaurantSlice",
  initialState: { restaurantList: [] },
  reducers: {
    setRestaurantList: (state, action) => {
      state.restaurantList = action.payload;
    },
  },
  extraReducers: (builder) => {
    // 위치별 식당찾기
    builder.addCase(asyncFindByLocalCode.fulfilled, (state, action) => {
      state.restaurantList = action.payload;
      // console.log("엑스트라리듀서:", state.locationList);
      return state;
    });
  },
});
export default restaurantSlice;
export { asyncFindByLocalCode };
export const { setRestaurantList } = restaurantSlice.actions;

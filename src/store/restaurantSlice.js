import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  findByLocalCode,
  findByFoodCode,
  getRestaurant,
  getRestaurants,
} from "../api/restaurant";

// 식당 전체 가져오기
const asyncGetRestaurants = createAsyncThunk(
  "restaurantSlice/asyncGetRestaurants",
  async (page) => {
    const result = await getRestaurants(page);
    return result.data;
  }
);

// 식당 1개 가져오기
const asyncGetRestaurant = createAsyncThunk(
  "restaurantSlice/asyncGetRestaurant",
  async (id) => {
    const result = await getRestaurant(id);
    return result.data;
  }
);

// 위치별 식당 가져오기
const asyncFindByLocalCode = createAsyncThunk(
  "restaurantSlice/asyncFindByLocalCode",
  async (id) => {
    const result = await findByLocalCode(id);
    // console.log("위치별 식당목록:", result.data);
    return result.data;
  }
);

// 음식타입별 식당 가져오기
const asyncFindByFoodCode = createAsyncThunk(
  "restaurantSlice/asyncFindByFoodCode",
  async (id) => {
    const result = await findByFoodCode(id);
    // console.log("음식타입별 식당목록:", result.data);
    return result.data;
  }
);

const restaurantSlice = createSlice({
  name: "restaurantSlice",
  initialState: { restaurantList: [], selectedRestaurant: {} },
  reducers: {
    setRestaurantList: (state, action) => {
      state.restaurantList = action.payload;
    },
    setSelectedRestaurant: (state, action) => {
      state.selectedRestaurant = action.payload;
    },
  },
  extraReducers: (builder) => {
    // 위치별 식당찾기
    builder.addCase(asyncFindByLocalCode.fulfilled, (state, action) => {
      state.restaurantList = action.payload;
      // console.log("엑스트라리듀서:", state.locationList);
      return state;
    });

    // 음식타입별 식당찾기
    builder.addCase(asyncFindByFoodCode.fulfilled, (state, action) => {
      state.restaurantList = action.payload;

      return state;
    });

    // 식당 목록 불러오기
    builder.addCase(asyncGetRestaurants.fulfilled, (state, action) => {
      state.restaurantList = action.payload;
      console.log("엑스트라리듀서:", state.restaurantList);
      return state;
    });

    // 식당 1개 찾기
    builder.addCase(asyncGetRestaurant.fulfilled, (state, action) => {
      state.selectedRestaurant = action.payload;
      return state;
    });
  },
});
export default restaurantSlice;
export {
  asyncGetRestaurants,
  asyncFindByLocalCode,
  asyncFindByFoodCode,
  asyncGetRestaurant,
};
export const { setRestaurantList, setSelectedRestaurant } =
  restaurantSlice.actions;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addLocation, getLocations } from "../api/location";

const asyncGetLocations = createAsyncThunk(
  "menuSlice/asyncGetLocations",
  async (page) => {
    const result = await getLocations(page);
    return result.data;
  }
);

// 위치 추가
const asyncAddLocation = createAsyncThunk(
  "locationSlice/asyncAddLocation",
  async (data) => {
    const result = await addLocation(data);
    return result.data;
  }
);

const locationSlice = createSlice({
  name: "locationSlice",
  initialState: { locationList: [] },
  reducers: {
    setLocationList: (state, action) => {
      state.locationList = action.payload;
    },
  },

  extraReducers: (builder) => {
    // 위치목록
    builder
      .addCase(asyncGetLocations.fulfilled, (state, action) => {
        state.locationList = action.payload;
      })

      // 위치 추가
      .addCase(asyncAddLocation.rejected, (state, action) => {
        return alert("지역 등록에 실패했습니다. 다시 시도해주세요.");
      })
      .addCase(asyncAddLocation.fulfilled, (state, action) => {
        alert("지역 등록에 성공했습니다");
        state.locationList.push(action.payload);
      });
  },
});

export default locationSlice;
export { asyncGetLocations, asyncAddLocation };
export const { setLocationList } = locationSlice.actions;

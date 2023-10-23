import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addLocation, getLocations, updateLocation } from "../api/location";

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

// 위치 수정
const asyncUpdateLocation = createAsyncThunk(
  "locationSlice/asyncUpdateLocation",
  async (data) => {
    const result = await updateLocation(data);
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
    setSelectedLocation: (state, action) => {
      state.locationList = action.payload;
    },
  },

  extraReducers: (builder) => {
    // 위치목록
    builder.addCase(asyncGetLocations.fulfilled, (state, action) => {
      state.locationList = action.payload;
    });

    // 위치 추가
    builder
      .addCase(asyncAddLocation.rejected, (state, action) => {
        return alert("위치 등록에 실패했습니다. 다시 시도해주세요.");
      })
      .addCase(asyncAddLocation.fulfilled, (state, action) => {
        alert("위치 등록에 성공했습니다");
        state.locationList.unshift(action.payload);
      });

    // 위치수정
    builder
      .addCase(asyncUpdateLocation.rejected, (state, action) => {
        return alert("위치 수정에 실패했습니다. 다시 시도해주세요.");
      })
      .addCase(asyncUpdateLocation.fulfilled, (state, action) => {
        // 인덱스 찾기!
        const index = state.locationList.findIndex(
          (location) => location.localCode === action.payload.localCode
        );

        // 위치를 찾았음! -> 업데이트된 정보 때려넣기!
        state.locationList.splice(index, 1, action.payload);
      });
  },
});

export default locationSlice;
export { asyncGetLocations, asyncAddLocation, asyncUpdateLocation };
export const { setLocationList, setSelectedLocation } = locationSlice.actions;

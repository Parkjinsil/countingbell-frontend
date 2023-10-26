import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addPick, delPick, putPick } from "../api/Pick";

const asyncAddPick = createAsyncThunk(
  "pickSlice/asyncAddPick",
  async (data) => {
    try {
      const result = await addPick(data);
      return result.data;
    } catch (error) {
      throw error;
    }
  }
);

const asyncDeletePick = createAsyncThunk(
  "pickSlice/asyncDeletePick",
  async (id) => {
    const result = await delPick(id);
    return result.data;
  }
);

const asyncUpdatePick = createAsyncThunk(
  "pickSlice/asyncUpdatePick",
  async (data) => {
    const result = await putPick(data);
    return result.data;
  }
);

const pickSlice = createSlice({
  name: "pickSlice",
  initialState: { data: null, error: null, success: null, loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //실패
      .addCase(asyncAddPick.rejected, (state, action) => {
        state.loading = false;
      })
      // 액션이 성공한 경우- 데이터 저장
      .addCase(asyncAddPick.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      // 액션이 아직 처리중일 때의 상태
      .addCase(asyncAddPick.pending, (state) => {
        state.loading = true;
      });

    builder
      .addCase(asyncDeletePick.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(asyncDeletePick.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(asyncDeletePick.pending, (state) => {
        state.loading = true;
      });

    builder
      .addCase(asyncUpdatePick.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(asyncUpdatePick.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(asyncUpdatePick.pending, (state) => {
        state.loading = true;
      });
  },
});

export default pickSlice;
export { asyncAddPick, asyncDeletePick, asyncUpdatePick };

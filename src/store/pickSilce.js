import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addPick, delPick } from "../api/Pick";

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

const pickSlice = createSlice({
  name: "pickSlice",
  initialState: { data: null, error: null, success: null, loading: false },
  reducers: {
    resetState: (state) => {
      state.data = null;
      state.error = null;
      state.success = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      //실패
      .addCase(asyncAddPick.rejected, (state, action) => {
        state.error = "찜 등록에 실패했습니다. 다시 시도해주세요.";
        state.loading = false;
      })
      // 액션이 성공한 경우- 데이터 저장
      .addCase(asyncAddPick.fulfilled, (state, action) => {
        state.success = "찜이 성공적으로 등록되었습니다.";
        state.data = action.payload;
        state.loading = false;
      })
      // 액션이 아직 처리중일 때의 상태
      .addCase(asyncAddPick.pending, (state) => {
        state.loading = true;
      });

    builder
      .addCase(asyncDeletePick.rejected, (state, action) => {
        state.error = "할인 삭제에 실패했습니다. 다시 시도해주세요.";
        state.loading = false;
      })
      .addCase(asyncDeletePick.fulfilled, (state, action) => {
        state.success = "할인 삭제가 성공적으로 완료되었습니다.";
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(asyncDeletePick.pending, (state) => {
        state.loading = true;
      });
  },
});

export default pickSlice;
export { asyncAddPick, asyncDeletePick };

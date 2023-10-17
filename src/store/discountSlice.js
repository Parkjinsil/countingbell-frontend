import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDiscount } from "../api/Discount";

const asyncAddDiscount = createAsyncThunk("discountSlice/asyncAddDiscount", async (data) => {
  try {
    const result = await addDiscount(data);
    return result.data;
  } catch (error) {
    throw error;
  }
});

const discountSlice = createSlice({
  name: "discountSlice",
  initialState: { data: null, error: null, loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(asyncAddDiscount.rejected, (state, action) => {
        state.error = "할인 등록에 실패했습니다. 다시 시도해주세요.";
        state.loading = false;
      })
      .addCase(asyncAddDiscount.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(asyncAddDiscount.pending, (state) => {
        state.loading = true;
      });
  },
});

export default discountSlice;
export { asyncAddDiscount };
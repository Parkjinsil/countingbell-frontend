import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addMenu } from "../api/menu";

const asyncAddMenu = createAsyncThunk(
  "menuSlice/asyncAddMenu",
  async (data) => {
    const result = await addMenu(data);
    return result.data;
  }
);

const menuSlice = createSlice({
  name: "menuSlice",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder
      // .addCase(asyncRegister.pending, (state, action) => {})
      .addCase(asyncAddMenu.rejected, (state, action) => {
        return alert("메뉴 등록에 실패했습니다. 다시 시도해주세요.");
      })
      .addCase(asyncAddMenu.fulfilled, (state, action) => {
        alert("메뉴 등록 성공");

        return action.payload;
      });
  },
});

export default menuSlice;
export { asyncAddMenu };

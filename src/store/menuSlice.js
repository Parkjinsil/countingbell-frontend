import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addMenu, getMenus as fetchMenus, deleteMenu } from "../api/menu";

const asyncAddMenu = createAsyncThunk(
  "menuSlice/asyncAddMenu",
  async (data) => {
    const result = await addMenu(data);
    return result.data;
  }
);

const asyncGetMenus = createAsyncThunk(
  "menuSlice/asyncGetMenus",
  async (page) => {
    const result = await fetchMenus(page);
    return result.data;
  }
);

const menuSlice = createSlice({
  name: "menuSlice",
  initialState: { menuList: [] }, // 초기 상태를 객체로 설정
  reducers: {
    setMenuList: (state, action) => {
      state.menuList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // .addCase(asyncRegister.pending, (state, action) => {})
      .addCase(asyncAddMenu.rejected, (state, action) => {
        return alert("메뉴 등록에 실패했습니다. 다시 시도해주세요.");
      })
      .addCase(asyncAddMenu.fulfilled, (state, action) => {
        alert("메뉴 등록 성공");
        state.menuList.push(action.payload);
      })
      .addCase(asyncGetMenus.fulfilled, (state, action) => {
        state.menuList = action.payload;
      });
  },
});

export default menuSlice;
export { asyncAddMenu, asyncGetMenus };
export const { setMenuList } = menuSlice.actions;

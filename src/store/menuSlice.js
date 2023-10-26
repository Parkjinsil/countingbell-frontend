import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addMenu,
  getMenus,
  updateMenu,
  getMenu,
  deleteMenu,
  findByMenuCode,
} from "../api/menu";

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
    const result = await getMenus(page);
    return result.data;
  }
);

const asyncGetMenu = createAsyncThunk("menuSlice/asyncGetMenu", async (id) => {
  const result = await getMenu(id);
  return result.data;
});

// 메뉴 수정
const asyncUpdateMenu = createAsyncThunk(
  "menuSlice/asyncUpdateMenu",
  async (data) => {
    const result = await updateMenu(data);
    return result.data;
  }
);

// 식당별 메뉴
const asyncFindByMenuCode = createAsyncThunk(
  "menuSlice/asyncFindByMenuCode",
  async (id) => {
    const result = await findByMenuCode(id);
    return result.data;
  }
);

const menuSlice = createSlice({
  name: "menuSlice",
  initialState: { menuList: [], selectedMenu: null }, // 초기 상태를 객체로 설정
  reducers: {
    setMenuList: (state, action) => {
      state.menuList = action.payload;
    },
    setSelectedMenu: (state, action) => {
      state.selectedMenu = action.payload; // 선택한 메뉴 정보를 업데이트
    },
  },
  extraReducers: (builder) => {
    builder
      // 메뉴등록
      // .addCase(asyncRegister.pending, (state, action) => {})
      .addCase(asyncAddMenu.rejected, (state, action) => {
        return alert("메뉴 등록에 실패했습니다. 다시 시도해주세요.");
      })
      .addCase(asyncAddMenu.fulfilled, (state, action) => {
        alert("메뉴 등록 성공");
        state.menuList.push(action.payload);
      });

    // 메뉴목록
    builder.addCase(asyncGetMenus.fulfilled, (state, action) => {
      state.menuList = action.payload;
    });

    // 메뉴 1개
    builder
      .addCase(asyncGetMenu.fulfilled, (state, action) => {
        alert("메뉴검색에 성공했습니다.");
        state.selectedMenu = action.payload;
      })
      .addCase(asyncGetMenu.rejected, (state, action) => {
        return alert("메뉴검색에 실패했습니다.");
      });

    // 메뉴수정
    builder
      .addCase(asyncUpdateMenu.rejected, (state, action) => {
        return alert("메뉴 수정에 실패했습니다. 다시 시도해주세요.");
      })
      .addCase(asyncUpdateMenu.fulfilled, (state, action) => {
        //const index = state.menuList.findIndex(
        //  (menu) => menu.menuCode === action.payload.menuCode
        //);
        //console.log(index);
        //state.menuList.splice(index, 1, action.payload);
        alert("메뉴 수정에 성공했습니다");
      });

    // 식당별 메뉴찾기
    builder.addCase(asyncFindByMenuCode.fulfilled, (state, action) => {
      state.menuList = action.payload;

      return state;
    });
  },
});

export default menuSlice;
export { asyncAddMenu, asyncGetMenus, asyncUpdateMenu, asyncFindByMenuCode };
export const { setMenuList, setSelectedMenu } = menuSlice.actions;

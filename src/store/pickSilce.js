import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addPick, delPick, putPick, getTotalPick, getPick } from "../api/Pick";

let selectPage = 0;

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

const asyncViewTotalPick = createAsyncThunk(
  "pickSilce/asyncViewTotalPick",
  async (page) => {
    const result = await getTotalPick(page);
    return result.data;
  }
);

const asyncViewPick = createAsyncThunk(
  "pickSlice/asyncViewPick",
  async (id) => {
    const result = await getPick(id);
    return result.data;
  }
);

const pickSlice = createSlice({
  name: "pickSlice",
  initialState: {
    data: null,
    error: null,
    success: null,
    loading: false,
    resPicksList: [],
  },
  reducers: {
    setResPicks: (state, action) => {
      state.resPicksList = action.payload;
    },
  },
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

    builder
      .addCase(asyncViewTotalPick.rejected, (state, action) => {
        state.error = "찜 전체 조회에 실패했습니다.";
        state.loading = false;
      })
      .addCase(asyncViewTotalPick.fulfilled, (state, action) => {
        if (selectPage > 1) {
          // 2페이지, 3페이지, ....
          state.resPicksList = [...state.resPicksList, ...action.payload];
        } else {
          state.resPicksList = action.payload;
        }
        console.log("엑스트라리듀서:", state.resPicksList);
        return state;
      })
      .addCase(asyncViewTotalPick.pending, (state) => {
        state.loading = true;
      });

    builder
      .addCase(asyncViewPick.rejected, (state, action) => {
        state.error = "찜 조회에 실패했습니다.";
        state.loading = false;
      })
      .addCase(asyncViewPick.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(asyncViewPick.pending, (state) => {
        state.loading = true;
      });
  },
});

export default pickSlice;
export {
  asyncAddPick,
  asyncDeletePick,
  asyncUpdatePick,
  asyncViewTotalPick,
  asyncViewPick,
};

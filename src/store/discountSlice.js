import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addDiscount,
  getDiscounts,
  getDiscount,
  putDiscount,
  delDiscount,
  findByDisCode,
} from "../api/Discount";

// 할인 추가 비동기 액션 생성
const asyncAddDiscount = createAsyncThunk(
  "discountSlice/asyncAddDiscount",
  async (data) => {
    try {
      const result = await addDiscount(data);
      return result.data;
    } catch (error) {
      throw error;
    }
  }
);

// 할인 전체 조회
const asyncViewDiscounts = createAsyncThunk(
  "discountSlice/asyncViewDiscounts",
  async (page) => {
    const result = await getDiscounts(page);
    return result.data;
  }
);

// 식당1개에 따른 할인 조회
const asyncViewDiscount = createAsyncThunk(
  "discountSlice/asyncViewDiscount",
  async (id) => {
    const result = await getDiscount(id);
    return result.data;
  }
);

// 할인 수정
const asyncUpdateDiscount = createAsyncThunk(
  "discountSlice/asyncUpdateDiscount",
  async (data) => {
    const result = await putDiscount(data);
    return result.data;
  }
);

// 할인 삭제
const asyncDeleteDiscount = createAsyncThunk(
  "discountSlice/asyncDeleteDiscount",
  async (id) => {
    const result = await delDiscount(id);
    return result.data;
  }
);

// 식당별 할인 보기
const asyncFindByDisCode = createAsyncThunk(
  "discountSlice/asyncFindByDisCode",
  async (id) => {
    const result = await findByDisCode(id);
    return result.data;
  }
);

const discountSlice = createSlice({
  name: "discountSlice",
  initialState: {
    data: null,
    error: null,
    success: null,
    loading: false,
    discountList: [],
    selectedDiscount: null,
    disList: [], // disList 초기화 (빈 배열로 초기화)
  },
  reducers: {
    resetState: (state) => {
      state.data = null;
      state.error = null;
      state.success = null;
      state.loading = false;
      state.disList = [];
    },
    setDiscountList: (state, action) => {
      state.discountList = action.payload;
    },
    setSelectedDiscount: (state, action) => {
      state.selectedDiscount = action.payload; // 선택한 할인 정보를 업데이트
    },
  },
  extraReducers: (builder) => {
    // 할인 추가 액션 성공,실패,로딩시 상태 업데이트
    builder
      //실패
      .addCase(asyncAddDiscount.rejected, (state, action) => {
        state.error = "할인 등록에 실패했습니다. 다시 시도해주세요.";
        state.loading = false;
      })
      // 액션이 성공한 경우- 데이터 저장
      .addCase(asyncAddDiscount.fulfilled, (state, action) => {
        state.success = "할인이 성공적으로 등록되었습니다.";
        state.data = action.payload;
        state.loading = false;
      })
      // 액션이 아직 처리중일 때의 상태
      .addCase(asyncAddDiscount.pending, (state) => {
        state.loading = true;
      });

    // 할인 전체 조회 액션 성공,실패,로딩시 상태 업데이트
    builder
      .addCase(asyncViewDiscounts.rejected, (state, action) => {
        state.error = "할인 조회에 실패했습니다. 다시 시도해주세요.";
        state.loading = false;
      })
      .addCase(asyncViewDiscounts.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(asyncViewDiscounts.pending, (state) => {
        state.loading = true;
      });

    // 할인 조회 액션 성공,실패,로딩시 상태 업데이트
    builder
      .addCase(asyncViewDiscount.rejected, (state, action) => {
        state.error = "할인 조회에 실패했습니다. 다시 시도해주세요.";
        state.loading = false;
      })
      .addCase(asyncViewDiscount.fulfilled, (state, action) => {
        state.success = "요청하신 할인 정보가 조회되었습니다.";
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(asyncViewDiscount.pending, (state) => {
        state.loading = true;
      });

    // 할인 수정 액션 성공,실패,로딩시 상태 업데이트
    builder
      .addCase(asyncUpdateDiscount.rejected, (state, action) => {
        state.error = "할인 수정에 실패했습니다. 다시 시도해주세요.";
        state.loading = false;
      })
      .addCase(asyncUpdateDiscount.fulfilled, (state, action) => {
        state.success = "할인 수정이 성공적으로 완료되었습니다.";
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(asyncUpdateDiscount.pending, (state) => {
        state.loading = true;
      });

    // 할인 삭제 액션 성공,실패,로딩시 상태 업데이트
    builder
      .addCase(asyncDeleteDiscount.rejected, (state, action) => {
        state.error = "할인 삭제에 실패했습니다. 다시 시도해주세요.";
        state.loading = false;
      })
      .addCase(asyncDeleteDiscount.fulfilled, (state, action) => {
        state.success = "할인 삭제가 성공적으로 완료되었습니다.";
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(asyncDeleteDiscount.pending, (state) => {
        state.loading = true;
      });

    // 식당별 할인찾기
    builder.addCase(asyncFindByDisCode.fulfilled, (state, action) => {
      state.disList = action.payload;

      return state;
    });
  },
});

export default discountSlice;
export {
  asyncAddDiscount,
  asyncViewDiscounts,
  asyncViewDiscount,
  asyncUpdateDiscount,
  asyncDeleteDiscount,
  asyncFindByDisCode,
};
export const { setDiscountList, setSelectedDiscount } = discountSlice.actions;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addRestaurant,
  findByLocalCode,
  findByFoodCode,
  getRestaurant,
  getRestaurants,
  findResByFilter,
  getResByUserId,
  searchResByMenuName,
  updatePick,
  deletePick,
  searchResByResName,
} from "../api/restaurant";

const asyncAddRestaurant = createAsyncThunk(
  "restaurantSlice/asyncAddRestaurant",
  async (data) => {
    console.log(data);
    const result = await addRestaurant(data);
    return result.data;
  }
);

// 식당 전체 가져오기
const asyncGetRestaurants = createAsyncThunk(
  "restaurantSlice/asyncGetRestaurants",
  async (page) => {
    const result = await getRestaurants(page);
    return result.data;
  }
);

// 식당 1개 가져오기
const asyncGetRestaurant = createAsyncThunk(
  "restaurantSlice/asyncGetRestaurant",
  async (id) => {
    const result = await getRestaurant(id);
    return result.data;
  }
);

// 위치별 식당 가져오기
const asyncFindByLocalCode = createAsyncThunk(
  "restaurantSlice/asyncFindByLocalCode",
  async (id) => {
    const result = await findByLocalCode(id);
    // console.log("위치별 식당목록:", result.data);
    return result.data;
  }
);

// 유저아이디별 식당 가져오기
const asyncGetResByUserId = createAsyncThunk(
  "restaurantSlice/asyncGetResByUserId",
  async (id) => {
    const result = await getResByUserId(id);
    return result.data;
  }
);

// 음식타입별 식당 가져오기
const asyncFindByFoodCode = createAsyncThunk(
  "restaurantSlice/asyncFindByFoodCode",
  async (info) => {
    const result = await findByFoodCode(info);
    // console.log("음식타입별 식당목록:", result.data);
    return result.data;
  }
);

// 메뉴명으로 식당검색
const asyncSearchResByMenuName = createAsyncThunk(
  "restaurantSlice/asyncSearchResByMenuName",
  async (keyword) => {
    const result = await searchResByMenuName(keyword);
    console.log(result);
    return result.data;
  }
);

// 식당명으로 식당검색
const asyncSearchResByResName = createAsyncThunk(
  "restaurantSlice/asyncSearchResByResName",
  async (keyword) => {
    const result = await searchResByResName(keyword);
    console.log(result);
    return result.data;
  }
);

const asyncFindResByFilter = createAsyncThunk(
  "restaurantSlice/asyncFindResByFilter",
  async ({ foodCode, localCode }) => {
    const result = await findResByFilter({ foodCode, localCode });
    return result.data;
  }
);

const asyncUpdatePick = createAsyncThunk(
  "restaurantSlice/asyncUpdatePick",
  async (data) => {
    console.log(data);
    const result = await updatePick(data);
    return result.data;
  }
);

const asyncDeletePick = createAsyncThunk(
  "restaurantSlice/asyncDeletePick",
  async (id) => {
    const result = await deletePick(id);
    return result.data;
  }
);

const restaurantSlice = createSlice({
  name: "restaurantSlice",
  initialState: { restaurantList: [], selectedRestaurant: {}, userPicks: {} },
  reducers: {
    setRestaurantList: (state, action) => {
      state.restaurantList = action.payload;
    },
    setSelectedRestaurant: (state, action) => {
      state.selectedRestaurant = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncAddRestaurant.rejected, (state, action) => {
        return alert("식당 등록에 실패했습니다. 다시 시도해주세요.");
      })
      .addCase(asyncAddRestaurant.fulfilled, (state, action) => {
        alert("식당 등록 성공.");

        return action.payload;
      });

    // 위치별 식당찾기
    builder.addCase(asyncFindByLocalCode.fulfilled, (state, action) => {
      state.restaurantList = action.payload;
      // console.log("엑스트라리듀서:", state.locationList);
      return state;
    });

    // 메뉴이름으로 식당찾기
    builder.addCase(asyncSearchResByMenuName.fulfilled, (state, action) => {
      state.restaurantList = action.payload;
      // console.log("엑스트라리듀서:", state.locationList);
      return state;
    });

    // 식당이름으로 식당찾기
    builder.addCase(asyncSearchResByResName.fulfilled, (state, action) => {
      state.restaurantList = action.payload;
      // console.log("엑스트라리듀서:", state.locationList);
      return state;
    });

    // 아이디별 식당찾기
    builder
      .addCase(asyncGetResByUserId.fulfilled, (state, action) => {
        state.restaurantList = action.payload;
        return state;
      })
      .addCase(asyncGetResByUserId.rejected, (state, action) => {
        return alert("식당을 찾는데 실패했습니다.");
      });

    builder.addCase(asyncFindResByFilter.fulfilled, (state, action) => {
      state.restaurantList = action.payload;
      return state;
    });

    // 음식타입별 식당찾기
    builder.addCase(asyncFindByFoodCode.fulfilled, (state, action) => {
      state.restaurantList = action.payload;

      return state;
    });

    // 식당 전체 목록 불러오기
    builder.addCase(asyncGetRestaurants.fulfilled, (state, action) => {
      state.restaurantList = [...state.restaurantList, ...action.payload];
      console.log("엑스트라리듀서:", state.restaurantList);
      return state;
    });

    // 식당 1개 찾기
    builder.addCase(asyncGetRestaurant.fulfilled, (state, action) => {
      // 여러개를 담고 싶을 때 -> 배열이 localStorage에 저장되어야 하는 게 우선!
      // setItem 값으로 저장되는 건 무조건 배열이라는 거지
      // localStorage.getItem("watch", 배열);
      // -> getItem으로 가지고 오면 <-- 배열 가지고 옴
      // const arr = ..
      // arr.push(JSON.stringify(action.payload))

      // localStorage.setItem("watch", arr);
      let arr = [];

      if (localStorage.getItem("watch")) {
        for (let item of JSON.parse(localStorage.getItem("watch"))) {
          arr.push(item);
        }
      }
      arr.push(action.payload);

      console.log(arr);
      localStorage.setItem("watch", JSON.stringify(arr));

      state.selectedRestaurant = action.payload;
      return state;
    });

    builder
      //실패
      .addCase(asyncUpdatePick.rejected, (state, action) => {
        state.loading = false;
      })
      // 액션이 성공한 경우- 데이터 저장
      .addCase(asyncUpdatePick.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
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
  },
});
export default restaurantSlice;
export {
  asyncGetRestaurants,
  asyncFindByLocalCode,
  asyncFindByFoodCode,
  asyncFindResByFilter,
  asyncGetRestaurant,
  asyncUpdatePick,
  asyncDeletePick,
  asyncGetResByUserId,
  asyncSearchResByMenuName,
  asyncAddRestaurant,
  asyncSearchResByResName,
};
export const { setRestaurantList, setSelectedRestaurant } =
  restaurantSlice.actions;

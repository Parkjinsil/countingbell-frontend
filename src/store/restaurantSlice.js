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
  findReviewByResCode,
  searchResByResName,
  fetchUserPicks,
  resPickList,
} from "../api/restaurant";

const asyncAddRestaurant = createAsyncThunk(
  "restaurantSlice/asyncAddRestaurant",
  async (data) => {
    console.log(data);
    const result = await addRestaurant(data);
    return result.data;
  }
);

// 식당별 리뷰조회
const asyncFindReviewByResCode = createAsyncThunk(
  "restaurantSlice/asyncFindReviewByResCode",
  async (resCode) => {
    const result = await findReviewByResCode(resCode);
    return result.data;
  }
);

let selectPage = 0;

// 식당 전체 가져오기
const asyncGetRestaurants = createAsyncThunk(
  "restaurantSlice/asyncGetRestaurants",
  async (page) => {
    selectPage = page;
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
// 사용자별 식당찜목록 가져오기
const asyncFetchUserPicks = createAsyncThunk(
  "restaurantSlice/asyncFetchUserPicks",
  async (id) => {
    const result = await fetchUserPicks(id);
    //console.log("사용자별 식당찜목록 가져오기:", result.data);
    return result.data;
  }
);
// 식당1개에 따른 찜
const asyncResPickList = createAsyncThunk(
  "restaurantSlice/asyncResPickList",
  async (id) => {
    const result = await resPickList(id);
    return result.data;
  }
);

const restaurantSlice = createSlice({
  name: "restaurantSlice",
  initialState: { restaurantList: [], selectedRestaurant: {}, userPicks: [] },
  reducers: {
    setRestaurantList: (state, action) => {
      state.restaurantList = action.payload;
    },
    setSelectedRestaurant: (state, action) => {
      state.selectedRestaurant = action.payload;
    },
    setUserPicks: (state, action) => {
      state.userPicks = action.payload;
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
    builder
      .addCase(asyncSearchResByMenuName.fulfilled, (state, action) => {
        state.restaurantList = action.payload;
        // console.log("엑스트라리듀서:", state.locationList);
        return state;
      })
      .addCase(asyncSearchResByMenuName.rejected, (state, action) => {
        return alert("검색 결과가 없습니다.");
      });

    // 식당이름으로 식당찾기
    builder
      .addCase(asyncSearchResByResName.fulfilled, (state, action) => {
        state.restaurantList = action.payload;
        console.log("식당이름으로 식당찾기?:", state.locationList);

        return state;
      })
      .addCase(asyncSearchResByResName.rejected, (state, action) => {
        return alert("검색 결과가 없습니다.");
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
      if (selectPage > 1) {
        // 2페이지, 3페이지, ....
        state.restaurantList = [...state.restaurantList, ...action.payload];
      } else {
        state.restaurantList = action.payload;
      }

      console.log("엑스트라리듀서:", state.restaurantList);
      return state;
    });

    // 식당 1개 찾기
    builder.addCase(asyncGetRestaurant.fulfilled, (state, action) => {
      if (action.payload.resCode) {
        const resCode = action.payload.resCode;
        let arr = [];

        if (localStorage.getItem("watch")) {
          for (let item of JSON.parse(localStorage.getItem("watch"))) {
            if (item.resCode !== resCode) {
              arr.push(item);
            }
          }
        }

        arr.push(action.payload);
        console.log(arr);
        localStorage.setItem("watch", JSON.stringify(arr));
      }

      state.selectedRestaurant = action.payload;
      return state;
    });

    // 식당별 리뷰
    builder.addCase(asyncFindReviewByResCode.fulfilled, (state, action) => {
      state.reviewList = action.payload;
      return state;
    });

    // 찜추가
    builder
      // 액션이 성공한 경우- 데이터 저장
      .addCase(asyncUpdatePick.fulfilled, (state, action) => {
        state.selectedRestaurant.resPicks += 1;
        return state;
      });

    //찜삭제
    builder.addCase(asyncDeletePick.fulfilled, (state, action) => {
      state.selectedRestaurant.resPicks -= 1;
      return state;
    });

    // 사용자별 식당찜목록 가져오기
    builder.addCase(asyncFetchUserPicks.fulfilled, (state, action) => {
      //state.userPicks = [...state.userPicks, ...action.payload]; //기존배열에추가할때
      state.userPicks = action.payload; //기존데이터를 덮어쓸때
      return state;
    });

    // 식당1개에 따른 찜
    builder.addCase(asyncResPickList.fulfilled, (state, action) => {
      state.restaurantList = action.payload;
      return state;
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
  asyncFindReviewByResCode,
  asyncSearchResByResName,
  asyncFetchUserPicks,
  asyncResPickList,
};
export const { setRestaurantList, setSelectedRestaurant, userPicks } =
  restaurantSlice.actions;

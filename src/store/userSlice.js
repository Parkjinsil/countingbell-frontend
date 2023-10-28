import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addMember, login, searchId, searchPwd } from "../api/user";

// 로그인
const asyncLogin = createAsyncThunk("userSlice/asyncLogin", async (data) => {
  const result = await login(data);
  return result.data;
});

// 회원가입
const asyncRegister = createAsyncThunk(
  "userSlice/asyncRegister",
  async (data) => {
    const result = await addMember(data);
    return result.data;
  }
);

// 아이디 찾기
const asyncSearchId = createAsyncThunk(
  "userSlice/asyncSearchId",
  async (data) => {
    const result = await searchId(data);
    return result.data;
  }
);

// 비밀번호 찾기
const asyncSearchPwd = createAsyncThunk(
  "userSlice/asyncSearchPwd",
  async (data) => {
    const result = await searchPwd(data);
    return result.data;
  }
);

const userSlice = createSlice({
  name: "userSlice",
  initialState: {},
  reducers: {
    userSave: (state, action) => {
      return action.payload;
    },
    userLogout: (state, action) => {
      return {};
    },
  },

  extraReducers: (builder) => {
    builder
      // .addCase(asyncRegister.pending, (state, action) => {})
      .addCase(asyncRegister.rejected, (state, action) => {
        return alert("회원 등록에 실패했습니다. 다시 시도해주세요.");
      })
      .addCase(asyncRegister.fulfilled, (state, action) => {
        alert("회원 가입 성공. 로그인해주세요.");

        return action.payload;
      });

    builder
      .addCase(asyncLogin.rejected, (state, action) => {
        alert("로그인에 실패했습니다. 다시 시도해주세요.");
        return state;
      })

      .addCase(asyncLogin.fulfilled, (state, action) => {
        // 로그인 성공시 localStorage로 해당 정보 관리
        // localStorage.setItem("token", action.payload.token);
        // localStorage.setItem("user", JSON.stringify(action.payload));
        // return action.payload;

        console.log("로그인 성공!");
        console.log(action.payload);

        if (action.payload.deleteAccountYN === "N") {
          localStorage.setItem("token", action.payload.token);
          localStorage.setItem("user", JSON.stringify(action.payload));
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }

        return action.payload;
      });

    builder.addCase(asyncSearchId.fulfilled, (state, action) => {
      return action.payload;
    });

    builder.addCase(asyncSearchPwd.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default userSlice;
export { asyncRegister, asyncLogin, asyncSearchId, asyncSearchPwd };
export const { userSave, userLogout } = userSlice.actions;

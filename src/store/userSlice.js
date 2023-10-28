import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addMember,
  deleteMember,
  login,
  searchId,
  searchPwd,
  showMember,
  updateMember,
} from "../api/user";

let password = "";

// 로그인
const asyncLogin = createAsyncThunk("userSlice/asyncLogin", async (data) => {
  password = data.password;
  console.log(password);
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

// 회원정보 수정
const asyncUpdateMember = createAsyncThunk(
  "userSlice/asyncUpdateMember",
  async (data) => {
    const result = await updateMember(data);
    return result.data;
  }
);

// 회원 삭제
const asyncDeleteMember = createAsyncThunk(
  "userSlice/asyncDeleteMember",
  async (data) => {
    console.log("회원삭제 되나? : ", data);
    const result = await deleteMember(data);
    console.log("왜안되냐고!!", result.data);
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

// 회원 상세조회
const asyncShowMember = createAsyncThunk(
  "userSlice/asyncShowMember",
  async (data) => {
    const result = await showMember(data);
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

        console.log("로그인 성공!");
        console.log(action.payload);

        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload));
        return action.payload;
      });

    // 회원 상세 보기
    builder
      .addCase(asyncShowMember.rejected, (state, action) => {
        alert("로그인에 실패했습니다. 다시 시도해주세요.");
        return state;
      })
      .addCase(asyncShowMember.fulfilled, (state, action) => {
        return { ...action.payload, password: password };
      });

    // 회원 탈퇴하기
    builder.addCase(asyncDeleteMember.fulfilled, (state, action) => {
      localStorage.clear();
      userLogout();
      return {};
    });

    // 회원정보 수정
    builder
      .addCase(asyncUpdateMember.fulfilled, (state, action) => {
        // 토큰이 있으면 localStorage에 토큰과 사용자 정보를 저장
        if (action.payload.token !== "undefined") {
          localStorage.setItem("token", action.payload.token);
          localStorage.setItem("user", JSON.stringify(action.payload));
        }
        return action.payload;
      })
      .addCase(asyncUpdateMember.rejected, (state, action) => {
        alert("회원 정보 수정에 실패했습니다.");
        return state;
      });

    // 아이디 찾기
    builder.addCase(asyncSearchId.fulfilled, (state, action) => {
      return action.payload;
    });

    // 비밀번호 찾기
    builder.addCase(asyncSearchPwd.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default userSlice;
export {
  asyncRegister,
  asyncUpdateMember,
  asyncLogin,
  asyncSearchId,
  asyncSearchPwd,
  asyncShowMember,
  asyncDeleteMember,
};
export const { userSave, userLogout } = userSlice.actions;

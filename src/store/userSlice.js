import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addMember, login } from "../api/user";

const asyncLogin = createAsyncThunk("userSlice/asyncLogin", async (data) => {
  const result = await login(data);
  return result.data;
});

const asyncRegister = createAsyncThunk(
  "userSlice/asyncRegister",
  async (data) => {
    const result = await addMember(data);
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
        return alert("회원 등록에 실패했습니다. 다시 시도해주세요.");
      })
      .addCase(asyncLogin.fulfilled, (state, action) => {
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload));
        return action.payload;
      });
  },
});

export default userSlice;
export { asyncRegister, asyncLogin };
export const { userSave, userLogout } = userSlice.actions;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addMember, login } from "../api/user";

const asyncLogin = createAsyncThunk("userSlice/asyncLogin", async (data) => {
  const result = await login(data);
  return result.data;
});

const asyncRegister = createAsyncThunk(
  "userSlice/asyncRegister",
  async (data) => {
    const response = await addMember(data);
    return response.data;
  }
);

const userSlice = createSlice({
  name: "loginSlice",
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
      .addCase(asyncRegister.pending, (state, action) => {})
      .addCase(asyncRegister.rejected, (state, action) => {
        return null;
      })
      .addCase(asyncRegister.fulfilled, (state, action) => {
        return action.payload;
      });

    builder.addCase(asyncLogin.fulfilled, (state, action) => {
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload));
    });
  },
});

export default userSlice;
export { asyncRegister, asyncLogin };
export const { userSave, userLogout } = userSlice.actions;

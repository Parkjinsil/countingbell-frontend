import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import menuSlice from "./menuSlice";
import locationSlice from "./locationSlice";
import commentSlice from "./commentSlice"

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    menu: menuSlice.reducer,
    location: locationSlice.reducer,
    comment: commentSlice.reducer
  },
});

export default store;

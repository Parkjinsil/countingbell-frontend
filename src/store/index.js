import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import menuSlice from "./menuSlice";
import locationSlice from "./locationSlice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    menu: menuSlice.reducer,
    location: locationSlice.reducer,
  },
});

export default store;

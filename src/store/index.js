import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import discountSlice from "./discountSlice";
import pickSlice from "./pickSilce";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    discount: discountSlice.reducer,
    pick: pickSlice.reducer,
  },
});

export default store;

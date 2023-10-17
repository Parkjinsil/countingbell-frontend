
import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import discountSlice from "./discountSlice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    discount: discountSlice.reducer,
  },
});

export default store;
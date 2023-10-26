import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import discountSlice from "./discountSlice";
import pickSlice from "./pickSilce";
import menuSlice from "./menuSlice";
import restaurantSlice from "./restaurantSlice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    discount: discountSlice.reducer,
    pick: pickSlice.reducer,
    menu: menuSlice.reducer,
    restaurant: restaurantSlice,
  },
});

export default store;

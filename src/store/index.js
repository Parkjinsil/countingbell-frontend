import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import menuSlice from "./menuSlice";
import locationSlice from "./locationSlice";
import restaurantSlice from "./restaurantSlice";
import foodSlice from "./foodSlice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    menu: menuSlice.reducer,
    location: locationSlice.reducer,
    restaurant: restaurantSlice.reducer,
    food: foodSlice.reducer,
  },
});

export default store;

import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import menuSlice from "./menuSlice";
import locationSlice from "./locationSlice";
import photoSlice from "./photoSlice";
import restaurantSlice from "./restaurantSlice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    menu: menuSlice.reducer,
    photo: photoSlice.reducer,
    restaurant: restaurantSlice.reducer,
    location: locationSlice.reducer,
  },
});

export default store;

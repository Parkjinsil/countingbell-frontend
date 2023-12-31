import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import discountSlice from "./discountSlice";
import pickSlice from "./pickSilce";
import menuSlice from "./menuSlice";
import locationSlice from "./locationSlice";
import photoSlice from "./photoSlice";
import restaurantSlice from "./restaurantSlice";
import foodSlice from "./foodSlice";
import reserSlice from "./reserSlice";
import reviewSlice from "./reviewSlice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    discount: discountSlice.reducer,
    pick: pickSlice.reducer,
    menu: menuSlice.reducer,
    photo: photoSlice.reducer,
    restaurant: restaurantSlice.reducer,
    location: locationSlice.reducer,
    restaurant: restaurantSlice.reducer,
    food: foodSlice.reducer,
    reser: reserSlice.reducer,
    review: reviewSlice.reducer,
  },
});

export default store;

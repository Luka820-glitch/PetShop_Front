import { configureStore } from "@reduxjs/toolkit";
import animalImagesReducer from "./slices/AnimalImageSlice";
import wishlistReducer from "./slices/wishlistSlice";
import cartReducer from "./slices/cartSlice";


const store = configureStore({
  reducer: {
    animalImages: animalImagesReducer,
    wishlist: wishlistReducer,
    cart: cartReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store

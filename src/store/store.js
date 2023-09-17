import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "../features/user/userSlice";
import { productSlice } from "../features/products/productSlice";
import { reviewsSlice } from "../features/reviews/reviewsSlice";
import fendiReducer from "../features/FendiSlice/FendiSlice";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    products: productSlice.reducer,
    reviews: reviewsSlice.reducer
  },
});

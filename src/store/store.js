import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "../features/user/userSlice";
import { productSlice } from "../features/products/productSlice";
import { reviewsSlice } from "../features/reviews/reviewsSlice";

export const store = configureStore({
  reducer:{
    user: userSlice.reducer
  }
})
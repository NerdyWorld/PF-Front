import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { reviewsService } from "./reviewsService";

const initialState = {
  reviews: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ""
};


export const getAllReviews = createAsyncThunk("getAllReviews", async(thunkAPI)=>{
  try{
    return await reviewsService.getAllReviews();
  }catch(error){
    return thunkAPI.rejectWithValue(error);
  }
});


export const createReview = createAsyncThunk("createReview", async(review, thunkAPI)=>{
  try{
    return await reviewsService.createReview(review);
  }catch(error){
    return thunkAPI.rejectWithValue(error);
  }
});



export const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {},
  extraReducers: (builder)=>{
    builder
          // GET ALL REVIEWS
          .addCase(getAllReviews.loading, (state)=>{
            state.isLoading = true;
          })
          .addCase(getAllReviews.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.message = "Reviews obtained";
            state.reviews = action.payload;
          })
          .addCase(getAllReviews.rejected, (state)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = "Error obtaining the reviews";
            state.reviews = [];
          })


          // CREATE REVIEW
          .addCase(createReview.loading, (state)=>{
            state.isLoading = true;
          })
          .addCase(createReview.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.message = "Review created";
            state.reviews = [...state.reviews, action.payload];
          })
          .addCase(createReview.rejected, (state)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = "Error creating the review";
          })
  }
})


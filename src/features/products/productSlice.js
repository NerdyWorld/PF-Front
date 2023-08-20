import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { productService } from "./productService";


const initialState = {
  products: [],
  productByName: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ""
}


// GET ALL PRODUCTS
export const getAllProducts = createAsyncThunk("getAllProducts", async(thunkAPI)=>{
  try{
    return await productService.getAllProducts();
  }catch(error){
    return thunkAPI.rejectWithValue(error);
  }
})





export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder)=>{
    builder
            // GET ALL PRODUCTS
            .addCase(getAllProducts.pending, (state)=>{
              state.isLoading = true;
            })
            .addCase(getAllProducts.fulfilled, (state, action)=>{
              state.isLoading = false;
              state.isSuccess = true;
              state.isError = false;
              state.message = "Products obtained";
              state.products = action.payload;
            })
            .addCase(getAllProducts.rejected, (state, action)=>{
              state.isLoading = false;
              state.isSuccess = false;
              state.isError = true;
              state.message = "Error getting the products";
              state.products = [];
            })

  }
})
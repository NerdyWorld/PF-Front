import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { productService } from "./productService";


const initialState = {
  products: [],
  filterProducts: [],
  colors: [],
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

// FILTER PRODUCTS
export const filterProducts = createAsyncThunk("filterProducts", async(thunkAPI)=>{
  try{
    return await productService.filterProducts();
  }catch(error){
    return thunkAPI.rejectWithValue(error);
  }
})

// GET COLORS
export const getColors = createAsyncThunk("getColors", async(thunkAPI)=>{
  try{
    return await productService.getColors();
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
              state.products = action.payload.data;
            })
            .addCase(getAllProducts.rejected, (state, action)=>{
              state.isLoading = false;
              state.isSuccess = false;
              state.isError = true;
              state.message = "Error getting the products";
              state.products = [];
            })

            // FILTER PRODUCTS
            .addCase(filterProducts.pending, (state)=>{
              state.isLoading = true;
              state.message = "Filtering products";
            })
            .addCase(filterProducts.fulfilled, (state, action)=>{
              state.isLoading = false;
              state.isSuccess = true;
              state.isError = false;
              state.message = "Products filtered";
              state.filterProducts = action.payload.data;
            })
            .addCase(filterProducts.rejected, (state, action)=>{
              state.isLoading = false;
              state.isSuccess = false;
              state.isError = true;
              state.message = "Error filtering the products";
              state.filterProducts = [];
            })


            // GET COLORS
            .addCase(getColors.pending, (state)=>{
              state.isLoading = true;
              state.message = "Filtering products";
            })
            .addCase(getColors.fulfilled, (state, action)=>{
              state.isLoading = false;
              state.isSuccess = true;
              state.isError = false;
              state.message = "Colors obtained";
              state.colors = action.payload.data;
            })
            .addCase(getColors.rejected, (state, action)=>{
              state.isLoading = false;
              state.isSuccess = false;
              state.isError = true;
              state.message = "Colors obtained";
              state.colors = [];
            })

  }
})
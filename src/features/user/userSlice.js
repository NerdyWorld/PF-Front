import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userService } from "./userService";

const initialState = {
  user: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: ""
};


export const loginUser = createAsyncThunk("loginUser", async(data, thunkAPI)=>{
  try{
    return await userService.loginUser(data);
  }catch(error){
    return thunkAPI.rejectWithValue(error);
  }
})



export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder)=>{
    builder
          // LOGIN USER
          .addCase(loginUser.pending, (state, action) =>{
            state.isLoading = true;
          })
          .addCase(loginUser.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.message = "User logged in";
            state.user = action.payload;
          })
          .addCase(loginUser.rejected, (state, action) =>{
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.payload;
            state.user = null;
          })
  }
})
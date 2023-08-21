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

export const githubAuth = createAsyncThunk("githubAuth", async(data, thunkAPI)=>{
  try{
    return await userService.githubAuth(data);
  }catch(error){
    return thunkAPI.rejectWithValue(error);
  }
})


export const updateUser = createAsyncThunk("updateUser", async(newUser, thunkAPI)=>{
  try{
    return await userService.updateUser(newUser);
  }catch(error){
    return thunkAPI.rejectWithValue(error);
  }
})


export const deleteUser = createAsyncThunk("deleteUser", async(userId, thunkAPI)=>{
  try{
    return await userService.deleteUser(userId);
  }catch(error){
    return thunkAPI.rejectWithValue(error);
  }
})


export const getUser = createAsyncThunk("getUser", async(thunkAPI)=>{
  try{
    return await userService.getUser();
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
            state.message = "User logged error";
            state.user = null;
          })


          // GITHUB AUTH
          .addCase(githubAuth.pending, (state, action) =>{
            state.isLoading = true;
          })
          .addCase(githubAuth.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.message = "Github user logged";
            state.user = action.payload.data;
          })
          .addCase(githubAuth.rejected, (state, action) =>{
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = "Github user log error";
            state.user = null;
          })


          // UPDATE USER
          .addCase(updateUser.pending, (state, action) =>{
            state.isLoading = true;
          })
          .addCase(updateUser.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.message = "User updated";
            state.user = action.payload;
          })
          .addCase(updateUser.rejected, (state, action) =>{
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = "User update error";
            state.user = null;
          })


          // DELETE USER
          .addCase(deleteUser.pending, (state, action) =>{
            state.isLoading = true;
          })
          .addCase(deleteUser.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.message = "User deleted";
            state.user = null;
          })
          .addCase(deleteUser.rejected, (state, action) =>{
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = "User delete error";
          })

  }
})
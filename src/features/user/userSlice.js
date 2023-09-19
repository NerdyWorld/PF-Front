import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userService } from "./userService";

const initialState = {
  user: null,
  cart: [],
  userOrders: [],
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

export const googleLoginSlice = createAsyncThunk("googleLogin", async(data, thunkAPI)=>{
  try{
    return await userService.googleLogin(data);
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


export const getUser = createAsyncThunk("getUser", async(data, thunkAPI)=>{
  try{
    return await userService.getUser(data);
  }catch(error){
    return thunkAPI.rejectWithValue(error);
  }
})


export const sendActivationCode = createAsyncThunk("sendActivationCode", async(data, thunkAPI)=>{
  try{
    return await userService.sendActivationCode(data);
  }catch(error){
    return thunkAPI.rejectWithValue(error);
  }
})

export const validateCredentials = createAsyncThunk("validateCredentials", async(data, thunkAPI)=>{
  try{
    return await userService.validateCredentials(data);
  }catch(error){
    return thunkAPI.rejectWithValue(error);
  }
})

export const createUser = createAsyncThunk("createUser", async(data, thunkAPI)=>{
  try{
    return await userService.createUser(data);
  }catch(error){
    return thunkAPI.rejectWithValue(error);
  }
})


export const favToggle = createAsyncThunk("favToggle", async(data, thunkAPI)=>{
  try{
    return await userService.favToggle(data);
  }catch(error){
    return thunkAPI.rejectWithValue(error);
  }
})


export const contactPreference = createAsyncThunk("contactPreference", async(data, thunkAPI)=>{
  try{
    return await userService.contactPreference(data);
  }catch(error){
    return thunkAPI.rejectWithValue(error);
  }
})


export const getUserOrders = createAsyncThunk("getUserOrders", async(data, thunkAPI)=>{
  try{
    return await userService.getUserOrders(data);
  }catch(error){
    return thunkAPI.rejectWithValue(error);
  }
})

export const toggleCartItem = createAsyncThunk("toggleCartItem", async(data, thunkAPI) => {
  try {
    const response = await userService.toggleCartItem(data);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});


export const clearUserMessage = createAction("create-user-message");



export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder)=>{
    builder
          // LOGIN USER
          .addCase(loginUser.pending, (state, action) =>{
            state.isLoading = true;
            state.message = "Logging in user";
          })
          .addCase(loginUser.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.message = action.payload.msg;
            state.user = action.payload.data;
          })
          .addCase(loginUser.rejected, (state, action) =>{
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.payload.msg;
            state.user = null;
          })

          // CREATE USER
          .addCase(createUser.pending, (state, action) =>{
            state.isLoading = true;
            state.message = "Creating user";
          })
          .addCase(createUser.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.message = action.payload.msg;
            state.user = action.payload.data;
          })
          .addCase(createUser.rejected, (state, action) =>{
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.payload.msg;
            state.user = null;
          })


          // GOOGLE LOGIN
          .addCase(googleLoginSlice.pending, (state, action) =>{
            state.isLoading = true;
          })
          .addCase(googleLoginSlice.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.message = action.payload.msg;
            state.user = action.payload.data;
          })
          .addCase(googleLoginSlice.rejected, (state, action) =>{
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = "Google Login error";
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
            state.message = action.payload.msg;
            state.user = action.payload.data;
          })
          .addCase(githubAuth.rejected, (state, action) =>{
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.payload.msg;
            state.user = null;
          })


          // UPDATE USER
          .addCase(updateUser.pending, (state, action) =>{
            state.isLoading = true;
            state.message = "Updating user";
          })
          .addCase(updateUser.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.message = action.payload.msg;
            state.user = action.payload.data ? action.payload.data : state.user;
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


          // GET USER
          .addCase(getUser.pending, (state, action) =>{
            state.isLoading = true;
          })
          .addCase(getUser.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.message = action.payload.msg;
            state.user = action.payload.data;
          })
          .addCase(getUser.rejected, (state, action) =>{
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = "User not found";
            state.user = null;
          })


          // GET USER ORDERS
          .addCase(getUserOrders.pending, (state, action) =>{
            state.isLoading = true;
          })
          .addCase(getUserOrders.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.message = action.payload.msg;
            state.userOrders = action.payload.data;
          })
          .addCase(getUserOrders.rejected, (state, action) =>{
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = "User not found";
            state.userOrders = [];
          })


          // CONTACT PREFERENCE
          .addCase(contactPreference.pending, (state, action) =>{
            state.isLoading = true;
            state.message = `Updating preference ${action.meta.arg.contactPreference}`;
          })
          .addCase(contactPreference.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.message = action.payload.msg;
            state.user = action.payload.data ? action.payload.data : state.user;
          })
          .addCase(contactPreference.rejected, (state, action) =>{
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = "User not found";
          })


          // FAV TOGGLE
          .addCase(favToggle.pending, (state, action) =>{
            state.isLoading = true;
          })
          .addCase(favToggle.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.message = action.payload.msg;
            state.user = action.payload.data;
          })
          .addCase(favToggle.rejected, (state, action) =>{
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = "User not found";
          })


          // SEND ACTIVATION CODE
          .addCase(sendActivationCode.pending, (state, action) =>{
            state.isLoading = true;
          })
          .addCase(sendActivationCode.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.message = action.payload.msg;
          })
          .addCase(sendActivationCode.rejected, (state, action) =>{
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = "Error sending the activation code";
          })

          // VALIDATE CREDENTIALS
          .addCase(validateCredentials.pending, (state, action) =>{
            state.isLoading = true;
            state.message = "Validating credentials"
          })
          .addCase(validateCredentials.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.message = action.payload.msg;
          })
          .addCase(validateCredentials.rejected, (state, action) =>{
            console.log(action.payload);
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.payload.msg;
          })

          
          .addCase(toggleCartItem.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(toggleCartItem.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cart = action.payload.data.cart.filter(item => item && Object.keys(item).length);
          })
          .addCase(toggleCartItem.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.error.message;
          })
 
          // ACTIONS
          .addCase(clearUserMessage, (state)=>{
            state.message = "";
          })

  }
})

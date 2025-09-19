import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    user:user ? user: null,
    isLoading : false,
    isSuccess : false,
    isError : false,
    message:""
}

export const register = createAsyncThunk(
    "auth/register",
    async(userData,thunkapi) => {
        try {
            return await authService.register(userData)
        } catch (error) {
            return thunkapi.rejectWithValue(error.response.data.message)
        }
    }
)

export const login = createAsyncThunk(
    "auth/login",
    async(userData,thunkapi) => {
        try {
            return await authService.login(userData)
        } catch (error) {
            return thunkapi.rejectWithValue(error.response.data.message)
        }
    }
)

export const Logout = createAsyncThunk("auth/logout",async () => {
    await authService.Logout()
})

const authSlice = createSlice({
    name:"auth",
    initialState,
     reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers6
})
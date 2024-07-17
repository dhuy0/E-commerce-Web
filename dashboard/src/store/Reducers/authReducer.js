import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../api/api"

export const admin_login = createAsyncThunk(
  'auth/admin_login',
  async(info, {rejectWithValue, fulfillWithValue}) => {
    console.log(info)
    try {
      const {data} = await api.post('/admin-login', info, {withCredentials: true})
      localStorage.setItem('accessToken', data.token)
      return fulfillWithValue(data)
    } catch (error) {
    //  console.log(error.response.data)
      return rejectWithValue(error.response.data)
    }
  }
)

export const authReducer = createSlice({
  name: 'auth',
  initialState: {
    successMessage: '',
    errorMessage: '',
    loader: false,
    userInfo: '',
  },
  reducers: {
    clearMessage: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(admin_login.pending, (state, {payload}) => {
      state.loader = true;
    })
    .addCase(admin_login.rejected, (state, {payload}) => {
      state.loader = false;
      state.errorMessage = payload.error;
    })
    .addCase(admin_login.fulfilled, (state, {payload}) => {
      state.loader = false;
      state.successMessage = payload.message;
    })

  }
})

export const {clearMessage} = authReducer.actions;
export default authReducer.reducer
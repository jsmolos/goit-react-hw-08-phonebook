import { createSlice } from "@reduxjs/toolkit";
import { login, register, logout } from "./authOperations";

export const authSlice = createSlice ({
  name: 'auth',
  initialState: {
    user: {name: null, email: null },
    token: null,
    isLoggedIn: false,
    isLoading: false,
    isError: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder
    .addCase(register.pending, (state,_action) =>{
      state.isLoading = true;
    })
    .addCase(register.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    })
    .addCase(register.rejected, (state,_action) => {
      state.isLoggedIn = false;
      state.isError = true;
    })
    .addCase(login.pending, (state,_action) =>{
      state.isLoading = true;
    })
    .addCase(login.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    })
    .addCase(login.rejected, (state,_action) => {
      state.isLoggedIn = false;
      state.isError = true;
    })
    .addCase(logout.pending, (state, _action) => {
      state.isLoading = true;
    })
    .addCase(logout.fulfilled, (state, action) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
    })
    .addCase(logout.rejected, (state, _action) => {
      state.isLoggedIn = true;
      state.isError = true;          
    });
  },
});

export const authReducer = authSlice.reducer;


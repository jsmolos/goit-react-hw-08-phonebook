import { createSlice } from '@reduxjs/toolkit';
import { register, login, logout, refreshUser } from './authOperations';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: { name: null, email: null },
    token: null,
    isLoggedIn: false,
    isLoading: false,
    isError: false,
    isRefreshing: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) =>
          [register.pending, login.pending, logout.pending, refreshUser.pending].includes(
            action.type
          ),
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        (action) =>
          [register.fulfilled, login.fulfilled, logout.fulfilled, refreshUser.fulfilled].includes(
            action.type
          ),
        (state, action) => {
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.isLoggedIn = true;
          state.isLoading = false;
        }
      )
      .addMatcher(
        (action) =>
          [register.rejected, login.rejected, logout.rejected, refreshUser.rejected].includes(
            action.type
          ),
        (state) => {
          state.isLoggedIn = false;
          state.isError = true;
          state.isLoading = false;
        }
      )
      .addMatcher(
        (action) => action.type === refreshUser.pending,
        (state) => {
          state.isRefreshing = true;
        }
      )
      .addMatcher(
        (action) => action.type === refreshUser.rejected,
        (state) => {
          state.isLoggedIn = false;
          state.isRefreshing = false;
          state.isError = true;
        }
      )
      .addMatcher(
        (action) => action.type === refreshUser.fulfilled,
        (state, action) => {
          state.isLoading = false;
          state.user = action.payload;
          state.isRefreshing = false;
          state.isLoggedIn = true;
        }
      );
  },
});

export const authReducer = authSlice.reducer;

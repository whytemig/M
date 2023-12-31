import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    register(state, action) {
      state.user = action.payload.others;
    },
    login(state, action) {
      localStorage.clear();
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.clear();
    },
    bookmarkPost(state, action) {
      if (
        state.user.bookmarkedPosts.some(
          (post) => post._id === action.payload._id
        )
      ) {
        state.user.bookmarkedPosts = state.user.bookmarkedPosts.filter(
          (post) => post._id !== action.payload._id
        );
      } else {
        state.user.bookmarkedPosts.push(action.payload);
      }
    },
    handleFollow(state, { payload }) {
      if (state.user.followings.includes(payload)) {
        state.user.followings = state.user.followings.filter(
          (id) => id !== payload
        );
      } else {
        console.log(payload);
        state.user.followings.push(payload);
      }
    },
  },
});

export const { register, login, logout, bookmarkPost, handleFollow } =
  authSlice.actions;

export default authSlice.reducer;

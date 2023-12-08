import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: {
      currentUser: [],
      isFetching: false,
      error: false,
    },
    getUsers: {
      listusers: [],
      isFetching: false,
      error: false,
    },
    removeUser: {
      isFetching: false,
      error: false,
    },
    searchUsers: {
      userSearch: [],
      isFetching: false,
      error: false,
    },
  },
  reducers: {
    searchUsersStart: (state) => {
      state.searchUsers.isFetching = true;
    },
    searchUsersSuccess: (state, action) => {
      state.searchUsers.isFetching = false;
      state.searchUsers.userSearch = action.payload;
      state.searchUsers.error = false;
    },
    searchUsersError: (state) => {
      state.searchUsers.isFetching = false;
      state.searchUsers.error = true;
    },
    getUsersStart: (state) => {
      state.getUsers.isFetching = true;
    },
    getUsersSuccess: (state, action) => {
      state.getUsers.isFetching = false;
      state.getUsers.listusers = action.payload;
      state.getUsers.error = false;
    },
    getUsersFailed: (state) => {
      state.getUsers.isFetching = false;
      state.getUsers.error = true;
    },
    getCurrentUserStart: (state) => {
      state.users.isFetching = true;
    },
    getCurrentUserSuccess: (state, action) => {
      state.users.isFetching = false;
      state.users.currentUser = action.payload;
      state.users.error = false;
    },
    getCurrentUserFailed: (state) => {
      state.users.isFetching = false;
      state.users.error = true;
    },
    updateUserInfoStart: (state) => {
      state.users.isFetching = true;
    },
    updateUserInfoSuccess: (state, action) => {
      state.users.isFetching = false;
      state.users.currentUser = action.payload;
      state.users.error = false;
    },
    updateUserInfoFailed: (state) => {
      state.users.isFetching = false;
      state.users.error = true;
    },
    deleteUserStart: (state) => {
      state.removeUser.isFetching = true;
      state.removeUser.error = false;
    },
    deleteUsersSuccess: (state) => {
      state.removeUser.isFetching = false;
      state.removeUser.error = false;
    },
    deleteUserFailed: (state) => {
      state.removeUser.isFetching = false;
      state.removeUser.error = true;
    },
  },
});

export const {
  searchUsersStart,
  searchUsersSuccess,
  searchUsersError,
  getUsersStart,
  getUsersSuccess,
  getUsersFailed,
  updateUserInfoStart,
  updateUserInfoSuccess,
  updateUserInfoFailed,
  deleteUserStart,
  deleteUsersSuccess,
  deleteUserFailed,
  getCurrentUserStart,
  getCurrentUserSuccess,
  getCurrentUserFailed,
} = userSlice.actions;

export default userSlice.reducer;

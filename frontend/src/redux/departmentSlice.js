import { createSlice } from "@reduxjs/toolkit";

const departmentSlice = createSlice({
  name: "department",
  initialState: {
    createDepartment: {
      isFetching: false,
      error: false,
    },
    InfoDepartment: {
      getDepartment: [],
      isFetching: false,
      error: false,
    },
    RemoveUser: {
      isFetching: false,
      error: false,
    },
    getAllDepartment: {
      departments: [],
      isFetching: false,
      error: false,
    },
    updateDepartment: {
      isFetching: false,
      error: false,
    },
    removeDepartment: {
      isFetching: false,
      error: false,
    },
  },
  reducers: {
    removeDepartmentStart: (state) => {
      state.removeDepartment.isFetching = true;
    },
    removeDepartmentSuccess: (state) => {
      state.removeDepartment.isFetching = false;
      state.removeDepartment.error = false;
    },
    removeDepartmentFailed: (state) => {
      state.removeDepartment.isFetching = false;
      state.removeDepartment.error = true;
    },
    updateDepartmentStart: (state) => {
      state.updateDepartment.isFetching = true;
      state.updateDepartment.error = false;
    },
    updateDepartmentSuccess: (state) => {
      state.updateDepartment.isFetching = false;
      state.updateDepartment.error = false;
    },
    updateDepartmentFailed: (state) => {
      state.updateDepartment.isFetching = false;
      state.updateDepartment.error = true;
    },
    createDepartmentStart: (state) => {
      state.createDepartment.isFetching = true;
      state.createDepartment.error = false;
    },
    createDepartmentSuccess: (state) => {
      state.createDepartment.isFetching = false;
      state.createDepartment.error = false;
    },
    createDepartmentFailed: (state) => {
      state.createDepartment.isFetching = false;
      state.createDepartment.error = true;
    },
    getAllDepartmentStart: (state) => {
      state.getAllDepartment.isFetching = true;
    },
    getAllDepartmentSuccess: (state, action) => {
      state.getAllDepartment.isFetching = false;
      state.getAllDepartment.departments = action.payload;
      state.getAllDepartment.error = false;
    },
    getAllDepartmentFailed: (state) => {
      state.getAllDepartment.isFetching = false;
      state.getAllDepartment.error = true;
    },
    removeUserStart: (state) => {
      state.RemoveUser.isFetching = true;
    },
    removeUserSuccess: (state) => {
      state.RemoveUser.isFetching = false;
      state.RemoveUser.error = false;
    },
    removeUserFailed: (state) => {
      state.RemoveUser.isFetching = false;
      state.RemoveUser.error = true;
    },
    getDepartmentStart: (state) => {
      state.InfoDepartment.isFetching = true;
    },
    getDepartmentSuccess: (state, action) => {
      state.InfoDepartment.isFetching = false;
      state.InfoDepartment.getDepartment = action.payload;
      state.InfoDepartment.error = false;
    },
    getDepartmentFailed: (state) => {
      state.InfoDepartment.isFetching = false;
      state.InfoDepartment.error = true;
    },
  },
});

export const {
  removeDepartmentStart,
  removeDepartmentSuccess,
  removeDepartmentFailed,
  updateDepartmentStart,
  updateDepartmentSuccess,
  updateDepartmentFailed,
  createDepartmentStart,
  createDepartmentSuccess,
  createDepartmentFailed,
  getAllDepartmentStart,
  getAllDepartmentSuccess,
  getAllDepartmentFailed,
  removeUserStart,
  removeUserSuccess,
  removeUserFailed,
  getDepartmentStart,
  getDepartmentSuccess,
  getDepartmentFailed,
} = departmentSlice.actions;

export default departmentSlice.reducer;

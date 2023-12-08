import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice({
  name: "project",
  initialState: {
    projects: {
      projects: [],
      isFetching: false,
      error: false,
    },
    deleteProject: {
      isFetching: false,
      error: false,
    },
    getProject: {
      project: [],
      isFetching: false,
      error: false,
    },
    getAllProject: {
      projects: [],
      isFetching: false,
      error: false,
    },
    searchProject: {
      searchValue: [],
      isFetching: false,
      error: false,
    },
    addStaff: {
      isFetching: false,
      error: false,
    },
  },
  reducers: {
    addStaffStart: (state) => {
      state.addStaff.isFetching = true;
    },
    addStaffSuccess: (state) => {
      state.addStaff.isFetching = false;
      state.addStaff.error = false;
    },
    addStaffError: (state) => {
      state.addStaff.isFetching = false;
      state.addStaff.error = true;
    },
    searchProjectStart: (state) => {
      state.searchProject.isFetching = true;
    },
    searchProjectSuccess: (state, action) => {
      state.searchProject.isFetching = false;
      state.searchProject.searchValue = action.payload;
      state.searchProject.error = false;
    },
    searchProjectError: (state) => {
      state.searchProject.isFetching = false;
      state.searchProject.error = true;
    },
    getAllProjectStart: (state) => {
      state.getAllProject.isFetching = true;
    },
    getAllProjectSuccess: (state, action) => {
      state.getAllProject.isFetching = false;
      state.getAllProject.projects = action.payload;
      state.getAllProject.error = false;
    },
    getAllProjectError: (state) => {
      state.getAllProject.isFetching = false;
      state.getAllProject.error = true;
    },
    deleteProjectStart: (state) => {
      state.deleteProject.isFetching = true;
    },
    deleteProjectSuccess: (state) => {
      state.deleteProject.isFetching = false;
      state.deleteProject.error = false;
    },
    deleteProjectError: (state) => {
      state.deleteProject.isFetching = false;
      state.deleteProject.error = true;
    },
    updateProjectStart: (state) => {
      state.getProject.isFetching = true;
    },
    updateProjectSuccess: (state, action) => {
      state.getProject.isFetching = false;
      state.getProject.project = action.payload;
      state.getProject.error = false;
    },
    updateProjectError: (state) => {
      state.getProject.isFetching = false;
      state.getProject.error = true;
    },
    getProjectStart: (state) => {
      state.getProject.isFetching = true;
    },
    getProjectSuccess: (state, action) => {
      state.getProject.isFetching = false;
      state.getProject.project = action.payload;
      state.getProject.error = false;
    },
    getProjectError: (state) => {
      state.getProject.isFetching = false;
      state.getProject.error = true;
    },
    createProjectStart: (state) => {
      state.projects.isFetching = true;
      state.projects.error = false;
    },
    createProjectSuccess: (state) => {
      state.projects.isFetching = false;
      state.projects.error = false;
    },
    createProjectError: (state) => {
      state.projects.isFetching = false;
      state.projects.error = true;
    },
  },
});
export const {
  addStaffStart,
  addStaffSuccess,
  addStaffError,
  searchProjectStart,
  searchProjectSuccess,
  searchProjectError,
  getAllProjectStart,
  getAllProjectSuccess,
  getAllProjectError,
  deleteProjectStart,
  deleteProjectSuccess,
  deleteProjectError,
  updateProjectStart,
  updateProjectSuccess,
  updateProjectError,
  getProjectStart,
  getProjectSuccess,
  getProjectError,
  createProjectStart,
  createProjectSuccess,
  createProjectError,
} = projectSlice.actions;
export default projectSlice.reducer;

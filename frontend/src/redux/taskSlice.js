import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "task",
  initialState: {
    createTasks: {
      isFetching: false,
      error: false,
    },
    getAllTasks: {
      tasks: [],
      isFetching: false,
      error: false,
    },
    updateTask: {
      task: null,
      isFetching: false,
      error: false,
    },
    getTask: {
      task: null,
      isFetching: false,
      error: false,
    },
    updateStatusTask: {
      isFetching: false,
      error: false,
    },
    searchTasks: {
      tasks: [],
      isFetching: false,
      error: false,
    },
  },
  reducers: {
    searchTaskStart: (state) => {
      state.searchTasks.isFetching = true;
    },
    searchTaskSuccess: (state, action) => {
      state.searchTasks.isFetching = false;
      state.searchTasks.tasks = action.payload;
      state.searchTasks.error = false;
    },
    searchTaskFailed: (state) => {
      state.searchTasks.isFetching = false;
      state.searchTasks.error = true;
    },
    updateStatusTasksStart: (state) => {
      state.updateStatusTask.isFetching = true;
    },
    updateStatusTasksSuccess: (state) => {
      state.updateStatusTask.isFetching = false;
      state.updateStatusTask.error = false;
    },
    updateStatusTasksFailed: (state) => {
      state.updateStatusTask.isFetching = false;
      state.updateStatusTask.error = true;
    },
    getTaskStart: (state) => {
      state.getTask.isFetching = true;
    },
    getTaskSuccess: (state, action) => {
      state.getTask.isFetching = false;
      state.getTask.task = action.payload;
      state.getTask.error = false;
    },
    getTaskFailed: (state) => {
      state.getTask.isFetching = false;
      state.getTask.error = true;
    },
    createTasksStart: (state) => {
      state.createTasks.isFetching = true;
    },
    createTasksSuccess: (state) => {
      state.createTasks.isFetching = false;
      state.createTasks.error = false;
    },
    createTasksFailed: (state) => {
      state.createTasks.isFetching = false;
      state.createTasks.error = true;
    },
    deleteTasksStart: (state) => {
      state.createTasks.isFetching = true;
    },
    deleteTasksSuccess: (state) => {
      state.createTasks.isFetching = false;
      state.createTasks.error = false;
    },
    deleteTasksFailed: (state) => {
      state.createTasks.isFetching = false;
      state.createTasks.error = true;
    },
    updateTasksStart: (state) => {
      state.updateTask.isFetching = true;
    },
    updateTasksSuccess: (state, action) => {
      state.updateTask.isFetching = false;
      state.updateTask.task = action.payload;
      state.updateTask.error = false;
    },
    updateTasksFailed: (state) => {
      state.updateTask.isFetching = false;
      state.updateTask.error = true;
    },
    getAllTasksStart: (state) => {
      state.getAllTasks.isFetching = true;
    },
    getAllTasksSuccess: (state, action) => {
      state.getAllTasks.isFetching = false;
      state.getAllTasks.tasks = action.payload;
      state.getAllTasks.error = false;
    },
    getAllTasksFailed: (state) => {
      state.getAllTasks.isFetching = false;
      state.getAllTasks.error = true;
    },
  },
});

export const {
  searchTaskStart,
  searchTaskSuccess,
  searchTaskFailed,
  updateStatusTasksStart,
  updateStatusTasksSuccess,
  updateStatusTasksFailed,
  createTasksStart,
  createTasksSuccess,
  createTasksFailed,
  deleteTasksStart,
  deleteTasksSuccess,
  deleteTasksFailed,
  updateTasksStart,
  updateTasksSuccess,
  updateTasksFailed,
  getAllTasksStart,
  getAllTasksSuccess,
  getAllTasksFailed,
  getTaskStart,
  getTaskSuccess,
  getTaskFailed,
} = taskSlice.actions;

export default taskSlice.reducer;

import axios from "axios";
import { baseURL } from "../utils/apiLink";
import {
  loginFailed,
  loginStart,
  loginSuccess,
  logOutFailed,
  logOutStart,
  logOutSuccess,
  registerFailed,
  registerStart,
  registerSuccess,
} from "./authSlice";
import {
  searchUsersStart,
  searchUsersSuccess,
  searchUsersError,
  getUsersStart,
  getUsersSuccess,
  getUsersFailed,
  deleteUserFailed,
  deleteUsersSuccess,
  deleteUserStart,
  getCurrentUserStart,
  getCurrentUserSuccess,
  getCurrentUserFailed,
  updateUserInfoStart,
  updateUserInfoSuccess,
  updateUserInfoFailed,
} from "./userSlice";
import {
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
  getDepartmentFailed,
  getDepartmentSuccess,
  getDepartmentStart,
} from "./departmentSlice";
import {
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
} from "./projectSlice";
import {
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
} from "./taskSlice";

// AUTH SLICE
export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(`${baseURL}/v1/auth/login`, user);
    dispatch(loginSuccess(res.data));
    navigate("/");
  } catch (err) {
    dispatch(loginFailed());
  }
};
export const registerUser = async (user, dispatch, axiosJWT) => {
  dispatch(registerStart());
  try {
    await axiosJWT.post(`${baseURL}/v1/auth/register`, user);
    dispatch(registerSuccess());
  } catch (err) {
    dispatch(registerFailed());
  }
};
export const deleteUser = async (accessToken, dispatch, id, axiosJWT) => {
  dispatch(deleteUserStart());
  try {
    await axiosJWT.delete(`${baseURL}/v1/user/${id}`, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(deleteUsersSuccess());
  } catch (err) {
    dispatch(deleteUserFailed());
  }
};
export const logOut = async (dispatch, id, navigate, accessToken, axiosJWT) => {
  dispatch(logOutStart());
  try {
    await axiosJWT.post(`${baseURL}/v1/auth/logout/`, id, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(logOutSuccess());
    dispatch(getCurrentUserSuccess(null));
    dispatch(getDepartmentSuccess(null));
    localStorage.clear();
    navigate("/login");
  } catch (err) {
    dispatch(logOutFailed());
  }
};

// USER SLICE
export const getCurrentUser = async (accessToken, id, dispatch, axiosJWT) => {
  dispatch(getCurrentUserStart());
  try {
    const res = await axiosJWT.get(`${baseURL}/v1/user/${id}`, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(getCurrentUserSuccess(res.data));
  } catch (error) {
    dispatch(getCurrentUserFailed());
  }
};
export const updateCurrentUser = async (
  user,
  id,
  dispatch,
  accessToken,
  axiosJWT
) => {
  dispatch(updateUserInfoStart());
  try {
    const res = await axiosJWT.put(`${baseURL}/v1/user/edit/${id}`, user, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(updateUserInfoSuccess(res.data));
  } catch (error) {
    dispatch(updateUserInfoFailed());
  }
};
export const getAllUser = async (accessToken, dispatch, axiosJWT) => {
  dispatch(getUsersStart());
  try {
    const res = await axiosJWT.get(`${baseURL}/v1/user/all`, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(getUsersSuccess(res.data));
  } catch (err) {
    dispatch(getUsersFailed());
  }
};
export const searchUser = async (
  searchValue,
  navigate,
  dispatch,
  accessToken,
  axiosJWT
) => {
  dispatch(searchUsersStart());
  try {
    const res = await axiosJWT.get(`${baseURL}/v1/user/search/${searchValue}`, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(searchUsersSuccess(res.data));
    navigate("/search");
  } catch (error) {
    dispatch(searchUsersError());
  }
};

// DEPARTMENT SLICE
export const createDepartment = async (
  formData,
  dispatch,
  navigate,
  accessToken,
  axiosJWT
) => {
  dispatch(createDepartmentStart());
  await axiosJWT.post(`${baseURL}/v1/department/create`, formData, {
    headers: { token: `Bearer ${accessToken}` },
  });
  dispatch(createDepartmentSuccess());
  navigate("/department/listdepartment");
  try {
  } catch (error) {
    dispatch(createDepartmentFailed());
  }
};
export const getDepartment = async (accessToken, id, dispatch, axiosJWT) => {
  dispatch(getDepartmentStart());
  try {
    const res = await axiosJWT.get(`${baseURL}/v1/department/${id}`, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(getDepartmentSuccess(res.data));
  } catch (err) {
    dispatch(getDepartmentFailed());
  }
};
export const RemoveUserInDepartment = async (
  accessToken,
  id,
  dispatch,
  axiosJWT
) => {
  dispatch(removeUserStart());
  try {
    const res = await axiosJWT.put(`${baseURL}/v1/department/takeUser/${id}`, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(removeUserSuccess(res.data));
  } catch (err) {
    dispatch(removeUserFailed());
  }
};
export const getAllDepartment = async (accessToken, dispatch, axiosJWT) => {
  dispatch(getAllDepartmentStart());
  try {
    const res = await axiosJWT.get(`${baseURL}/v1/department/`, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(getAllDepartmentSuccess(res.data));
  } catch (err) {
    dispatch(getAllDepartmentFailed());
  }
};
export const updateDepartment = async (
  newData,
  id,
  accessToken,
  dispatch,
  axiosJWT
) => {
  dispatch(updateDepartmentStart());
  try {
    await axiosJWT.put(`${baseURL}/v1/department/${id}`, newData, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(updateDepartmentSuccess());
  } catch (error) {
    dispatch(updateDepartmentFailed());
  }
};
export const removeDepartment = async (id, dispatch, accessToken, axiosJWT) => {
  dispatch(removeDepartmentStart());
  try {
    await axiosJWT.delete(`${baseURL}/v1/department/${id}`, {
      headers: { token: `Bearer${accessToken}` },
    });
    dispatch(removeDepartmentSuccess());
  } catch (error) {
    dispatch(removeDepartmentFailed());
  }
};
// PROJECT SLICE
export const getAllProjects = async (accessToken, dispatch, axiosJWT) => {
  dispatch(getAllProjectStart());
  try {
    const res = await axiosJWT.get(`${baseURL}/v1/project/`, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(getAllProjectSuccess(res.data));
  } catch (error) {
    dispatch(getAllProjectError());
  }
};

export const createProject = async (
  newProject,
  accessToken,
  dispatch,
  axiosJWT
) => {
  dispatch(createProjectStart());
  try {
    await axiosJWT.post(`${baseURL}/v1/project/create`, newProject, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(createProjectSuccess());
  } catch (error) {
    dispatch(createProjectError());
  }
};

export const getProject = async (accessToken, id, dispatch, axiosJWT) => {
  dispatch(getProjectStart());
  try {
    const res = await axiosJWT.get(`${baseURL}/v1/project/${id}`, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(getProjectSuccess(res.data));
  } catch (error) {
    dispatch(getProjectError());
  }
};

export const updateProject = async (
  user,
  id,
  dispatch,
  accessToken,
  axiosJWT
) => {
  dispatch(updateProjectStart());
  try {
    const res = await axiosJWT.put(`${baseURL}/v1/project/${id}`, user, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(updateProjectSuccess(res.data));
  } catch (error) {
    dispatch(updateProjectError());
  }
};

export const deleteProject = async (id, dispatch, accessToken, axiosJWT) => {
  dispatch(deleteProjectStart());
  try {
    await axiosJWT.delete(`${baseURL}/v1/project/delete/${id}`, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(deleteProjectSuccess());
  } catch (error) {
    dispatch(deleteProjectError());
  }
};

export const searchProject = async (
  searchValue,
  navigate,
  dispatch,
  accessToken,
  axiosJWT
) => {
  dispatch(searchProjectStart());
  try {
    const res = await axiosJWT.get(
      `${baseURL}/v1/project/search/${searchValue}`,
      {
        headers: { token: `Bearer ${accessToken}` },
      }
    );
    dispatch(searchProjectSuccess(res.data));
    navigate("/search");
  } catch (error) {
    dispatch(searchProjectError());
  }
};

export const addStaff = async (
  idProject,
  idStaff,
  navigate,
  dispatch,
  accessToken,
  axiosJWT
) => {
  dispatch(addStaffStart());
  try {
    await axiosJWT.put(`${baseURL}/v1/project/make/${idProject}`, idStaff, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(addStaffSuccess());
    navigate("/list-projects");
  } catch (error) {
    dispatch(addStaffError());
  }
};
// TASKS SLICE

export const createTask = async (newTasks, dispatch, accessToken, axiosJWT) => {
  dispatch(createTasksStart());
  try {
    await axiosJWT.post(`${baseURL}/v1/task/create`, newTasks, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(createTasksSuccess());
  } catch (error) {
    dispatch(createTasksFailed());
  }
};

export const getAllTasks = async (dispatch, accessToken, axiosJWT) => {
  dispatch(getAllTasksStart());
  try {
    const res = await axiosJWT.get(`${baseURL}/v1/task/alltask`, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(getAllTasksSuccess(res.data));
  } catch (error) {
    dispatch(getAllTasksFailed());
  }
};

export const deleteTask = async (id, dispatch, accessToken, axiosJWT) => {
  dispatch(deleteTasksStart());
  try {
    await axiosJWT.delete(`${baseURL}/v1/task/delete/${id}`, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(deleteTasksSuccess());
  } catch (err) {
    dispatch(deleteTasksFailed(err.response.data));
  }
};

export const updateTask = async (
  newTask,
  id,
  dispatch,
  accessToken,
  axiosJWT
) => {
  dispatch(updateTasksStart());
  try {
    const res = await axiosJWT.put(`${baseURL}/v1/task/update/${id}`, newTask, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(updateTasksSuccess(res.data));
  } catch (error) {
    dispatch(updateTasksFailed());
  }
};

export const getTask = async (id, dispatch, accessToken, axiosJWT) => {
  dispatch(getTaskStart());
  try {
    const res = await axiosJWT.get(`${baseURL}/v1/task/${id}`, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(getTaskSuccess(res.data));
  } catch (error) {
    dispatch(getTaskFailed());
  }
};
export const updateStatusTask = async (
  newStatusTask,
  id,
  navigate,
  dispatch,
  accessToken,
  axiosJWT
) => {
  dispatch(updateStatusTasksStart());
  try {
    await axiosJWT.put(`${baseURL}/v1/task/${id}`, newStatusTask, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(updateStatusTasksSuccess());
    navigate("/tasks");
  } catch (error) {
    dispatch(updateStatusTasksFailed());
  }
};

export const searchTasks = async (
  searchValue,
  navigate,
  dispatch,
  accessToken,
  axiosJWT
) => {
  dispatch(searchTaskStart());
  try {
    const res = await axiosJWT.get(`${baseURL}/v1/task/search/${searchValue}`, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(searchTaskSuccess(res.data));
    navigate("/search");
  } catch (error) {
    dispatch(searchTaskFailed());
  }
};

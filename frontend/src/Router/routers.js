import Home from "../Pages/Home/home";
import Department from "../Pages/Department/Department";
import LayoutHome from "../Layout/LayoutHome/layoutHome";
import Profile from "../Pages/Profile/Profile";
import Statistics from "../Pages/Statistics/Statistics";
import ListProjects from "../Pages/Department/ListProjects/ListProjects";
import ListUsers from "../Pages/Department/ListUsers/ListUser";
import TasksLists from "../Pages/Department/ListTask/TasksLists/TasksLists";
import StatisticsTask from "../Pages/Statistics/StatisticsTask/StatisticsTask";
import SearchProject from "../Pages/Department/SearchProject/SearchProject.js";
// PAGE ADMIN
import RegisterAccount from "../PagesAdmin/RegisterAccount/RegisterAccount";
import DepartmentAdmin from "../PagesAdmin/DepartmentAdmin/DepartmentAdmin";
import Departments from "../PagesAdmin/DepartmentAdmin/ListDepartment/Departments.js";
import CreateDepartment from "../PagesAdmin/DepartmentAdmin/CreateDepartment/CreateDepartment.js";
import ListSearchUser from "../PagesAdmin/SearchUser/ListSearchUser/ListSearchUser.js";

// PAGE USERS
import MyTasks from "../PageUsers/MyTasks/MyTasks.js";
import MyStatistics from "../PageUsers/MyStatistics/MyStatistics.js";
import MyDepartment from "../PageUsers/MyDepartment/MyDepartment.js";
import ListSearchTasks from "../PageUsers/SearchTasks/ListSearchTasks/ListSearchTasks.js";

// PAGE MANAGE PROJECT
import StatisticsProject from "../PageProject/StatisticsProject/StatisticsProject.js";
import ManageProjects from "../PageProject/ManageProjects/ManageProjects.js";
import ListProjectsManage from "../PageProject/ManageProjects/ListProjects/ListProjects.js";
import ItemProject from "../PageProject/ManageProjects/ItemProject/ItemProject.js";
// Router Manage Department
export const Routers = [
  { path: "/", component: Home, layout: LayoutHome },
  {
    path: "/department",
    component: Department,
    children: [
      { path: "list-projects", component: ListProjects },
      { path: "list-projects/:projectID", component: TasksLists },
      { path: "list-users", component: ListUsers },
    ],
  },
  { path: "/search", component: SearchProject },
  { path: "/profile", component: Profile },
  {
    path: "/statistics",
    component: Statistics,
    children: [{ path: "tasks", component: StatisticsTask }],
  },
];

// Router admin
export const RouterAdmin = [
  { path: "/", component: Home, layout: LayoutHome },
  { path: "/admin/register", component: RegisterAccount },
  {
    path: "/department",
    component: DepartmentAdmin,
    children: [
      { path: "listdepartment", component: Departments },
      { path: "create", component: CreateDepartment },
    ],
  },
  { path: "/search", component: ListSearchUser },
  { path: "/profile", component: Profile },
];

// Router user (staff)
export const RouterStaff = [
  { path: "/", component: Home, layout: LayoutHome },
  { path: "/profile", component: Profile },
  {
    path: "/tasks",
    component: MyTasks,
  },
  { path: "/search", component: ListSearchTasks },
  {
    path: "/statistics",
    component: MyStatistics,
  },
  {
    path: "/department",
    component: MyDepartment,
  },
];

// Manage Project
export const RouterManageProject = [
  { path: "/", component: Home, layout: LayoutHome },
  { path: "/profile", component: Profile },
  {
    path: "/department",
    component: MyDepartment,
  },
  {
    path: "/projects",
    component: ManageProjects,
    children: [
      { path: "list-projects", component: ListProjectsManage },
      { path: "list-projects/:projectID", component: ItemProject },
    ],
  },
  {
    path: "/statistics",
    component: StatisticsProject,
  },
];

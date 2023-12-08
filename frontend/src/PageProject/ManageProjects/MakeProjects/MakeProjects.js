import classNames from "classnames/bind";
import style from "./MakeProjects.module.scss";
import * as Unicons from "@iconscout/react-unicons";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../../createInstance";
import {
  createTasksSuccess,
  deleteTasksSuccess,
  updateTasksSuccess,
} from "../../../redux/taskSlice";
import { createTask, deleteTask, updateTask } from "../../../redux/apiRequest";
const cx = classNames.bind(style);
export const TaskCrud = ({ handleShowCreate }) => {
  const user = useSelector((state) => state.users.users?.currentUser);
  const authUser = useSelector((state) => state.auth.login?.currentUser);
  const projectEdit = useSelector((state) => state.project.getProject?.project);
  const id = useParams();
  const dispatch = useDispatch();
  const accessToken = authUser?.accessToken;
  let axiosJWT = createAxios(authUser, dispatch, createTasksSuccess);
  const [formData, setFormData] = useState({
    taskName: "",
    createUser: user?.infor?.name,
    user: "",
    description: "",
    dateStart: "",
    dateEnd: "",
    project: id.projectID,
    status: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleShowCreate();
    createTask(formData, dispatch, accessToken, axiosJWT);
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("Create__project--inner")}>
        <div className={cx("Create__project--heading")}>
          <h1>Tạo Mới Công Việc</h1>
          <div
            className={cx("project__heading--icon")}
            onClick={handleShowCreate}
          >
            <Unicons.UilTimesCircle />
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={cx("Create__project--from")}>
            <div className={cx("project__from--item")}>
              <span className={cx("from__item--title")}>Tên Công Việc</span>
              <input
                className={cx("from__item--input")}
                name="taskName"
                onChange={handleChange}
              />
            </div>
            <div className={cx("project__from--item")}>
              <span className={cx("from__item--title")}>Người Thực Hiện</span>
              <select
                className={cx("from__item--input")}
                name="user"
                onChange={handleChange}
              >
                <option>Tùy Chọn</option>
                {projectEdit?.users.map((item) => (
                  <option value={item._id}>
                    {item.infor?.name ? item.infor?.name : item?.username}
                  </option>
                ))}
              </select>
            </div>
            <div className={cx("project__from--item")}>
              <span className={cx("from__item--title")}>Ngày Bắt Đầu</span>
              <input
                type="date"
                className={cx("from__item--input")}
                name="dateStart"
                onChange={handleChange}
              />
            </div>
            <div className={cx("project__from--item")}>
              <span className={cx("from__item--title")}>Thời Hạn</span>
              <input
                type="date"
                className={cx("from__item--input")}
                name="dateEnd"
                onChange={handleChange}
              />
            </div>
            <div className={cx("project__from--item")}>
              <span className={cx("from__item--title")}>Mô Tả</span>
              <textarea
                type="text"
                className={cx("from__item--inputArea")}
                name="description"
                onChange={handleChange}
              />
            </div>
            <div className={cx("project__from--item")}>
              <span className={cx("from__item--title")}>Trạng Thái</span>
              <select
                className={cx("from__item--input")}
                name="status"
                onChange={handleChange}
              >
                <option value={111}>Mới</option>
                <option value={222}>Đang Thực Hiện</option>
                <option value={333}>Hoàn Thành</option>
                <option value={444}>Chưa Hoàn Thành</option>
              </select>
            </div>
          </div>
          <div className={cx("Create__project--btn")}>
            <button className={cx("project__btn--create")} type="submit">
              Xác Nhận
            </button>
            <button className={cx("project__btn--cancel")} type="reset">
              Hủy Bỏ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const statusList = [
  { id: 111, name: "Mới" },
  { id: 222, name: "Đang Thực Hiện" },
  { id: 333, name: "Hoàn Thành" },
  { id: 444, name: "Chưa Hoàn Thành" },
];
export const ChangeInforTask = ({ handleShowChangeInfor, editID }) => {
  const projectTasks = useSelector(
    (state) => state.project.getProject?.project
  );
  const taskEdit = projectTasks?.tasks?.find((item) => item._id === editID);
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auth.login?.currentUser);
  let axiosJWTRemove = createAxios(authUser, dispatch, deleteTasksSuccess);
  let axiosJWTEdit = createAxios(authUser, dispatch, updateTasksSuccess);
  // FROM EDIT TASK
  const [taskName, setTaskName] = useState(taskEdit?.taskName);
  const [user, setUser] = useState(taskEdit?.user?._id);
  const [dateStart, setDateStart] = useState(() => {
    const dateformat = new Date(taskEdit?.dateStart);
    return dateformat.toLocaleDateString("en-CA");
  });
  const [dateEnd, setDateEnd] = useState(() => {
    const dateformat = new Date(taskEdit?.dateEnd);
    return dateformat.toLocaleDateString("en-CA");
  });
  const [decsription, setDecsription] = useState(
    () => taskEdit?.description || ""
  );
  const [status, setStatus] = useState(() => {
    statusList.map((item) => {
      if (item.id === taskEdit?.status) {
        return item.name;
      }
    });
    return taskEdit?.status;
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    handleShowChangeInfor();
    const newInfor = {
      taskName: taskName,
      user: user,
      dateStart: dateStart,
      dateEnd: dateEnd,
      description: decsription,
      status: status,
    };
    updateTask(
      newInfor,
      taskEdit?._id,
      dispatch,
      authUser?.accessToken,
      axiosJWTEdit
    );
  };
  const handleDeleteTask = () => {
    handleShowChangeInfor();
    deleteTask(taskEdit?._id, dispatch, authUser?.accessToken, axiosJWTRemove);
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("Create__project--inner")}>
        <div className={cx("Create__project--heading")}>
          <h1>Chỉnh Sửa Thông Tin Công Việc</h1>
          <div
            className={cx("project__heading--icon")}
            onClick={handleShowChangeInfor}
          >
            <Unicons.UilTimesCircle />
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={cx("Create__project--from")}>
            <div className={cx("project__from--item")}>
              <span className={cx("from__item--title")}>Tên Công Việc</span>
              <input
                value={taskName}
                className={cx("from__item--input")}
                onChange={(e) => setTaskName(e.target.value)}
              />
            </div>
            <div className={cx("project__from--item")}>
              <span className={cx("from__item--title")}>Người Thực Hiện</span>
              <select
                className={cx("from__item--input")}
                onChange={(e) => setUser(e.target.value)}
              >
                <option value={user}>
                  {taskEdit?.user.infor?.name
                    ? taskEdit?.user.infor?.name
                    : taskEdit?.user?.username}
                </option>
              </select>
            </div>
            <div className={cx("project__from--item")}>
              <span className={cx("from__item--title")}>Ngày Bắt Đầu</span>
              <input
                type="date"
                className={cx("from__item--input")}
                value={dateStart}
                onChange={(e) => setDateStart(e.target.value)}
              />
            </div>
            <div className={cx("project__from--item")}>
              <span className={cx("from__item--title")}>Thời Hạn</span>
              <input
                type="date"
                className={cx("from__item--input")}
                value={dateEnd}
                onChange={(e) => setDateEnd(e.target.value)}
              />
            </div>
            <div className={cx("project__from--item")}>
              <span className={cx("from__item--title")}>Mô Tả</span>
              <textarea
                type="text"
                className={cx("from__item--inputArea")}
                name="description"
                value={decsription}
                onChange={(e) => setDecsription(e.target.value)}
              />
            </div>
            <div className={cx("project__from--item")}>
              <span className={cx("from__item--title")}>Trạng Thái</span>
              <select
                className={cx("from__item--input")}
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                {statusList.map((item, index) => (
                  <option value={item.id} key={index}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className={cx("Create__project--btn")}>
            <button className={cx("project__btn--create")} type="submit">
              Xác Nhận
            </button>
            <div
              className={cx("project__btn--delete")}
              onClick={handleDeleteTask}
            >
              Xóa Dự Án
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

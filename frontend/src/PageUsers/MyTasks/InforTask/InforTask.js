import classNames from "classnames/bind";
import style from "./InforTask.module.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Unicons from "@iconscout/react-unicons";
import { getTask, updateStatusTask } from "../../../redux/apiRequest";
import { createAxios } from "../../../createInstance";
import {
  getTaskSuccess,
  updateStatusTasksSuccess,
} from "../../../redux/taskSlice";
import { useNavigate } from "react-router-dom";
const cx = classNames.bind(style);
export const InforTask = ({ idTask, handleShow }) => {
  const authUser = useSelector((state) => state.auth.login?.currentUser);
  const task = useSelector((state) => state.task.getTask?.task);
  const updateTask = useSelector((state) => state.task.updateStatusTask);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = authUser?.accessToken;
  let axiosJWT = createAxios(authUser, dispatch, getTaskSuccess);
  let axiosJWTStatus = createAxios(
    authUser,
    dispatch,
    updateStatusTasksSuccess
  );
  useEffect(() => {
    getTask(idTask, dispatch, accessToken, axiosJWT);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, updateTask]);
  const handleSubmit = (e) => {
    e.preventDefault();
    handleShow();
    const newStatusTask = {
      status: 222,
    };
    updateStatusTask(
      newStatusTask,
      task?._id,
      navigate,
      dispatch,
      accessToken,
      axiosJWTStatus
    );
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("Create__project--inner")}>
        <div className={cx("Create__project--heading")}>
          <h1>Thông Tin Công Việc </h1>
          <div
            className={cx("project__heading--icon")}
            onClick={() => handleShow()}
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
                value={task?.taskName}
              />
            </div>
            <div className={cx("project__from--item")}>
              <span className={cx("from__item--title")}>Người Thực Hiện</span>
              <input
                className={cx("from__item--input")}
                value={
                  task?.user?.infor.name
                    ? task?.user?.infor.name
                    : task?.user?.username
                }
              />
            </div>
            <div className={cx("project__from--item")}>
              <span className={cx("from__item--title")}>Ngày Bắt Đầu</span>
              <input
                readOnly
                type="date"
                className={cx("from__item--input")}
                value={new Date(task?.dateStart).toLocaleDateString("en-CA")}
              />
            </div>
            <div className={cx("project__from--item")}>
              <span className={cx("from__item--title")}>Thời Hạn</span>
              <input
                readOnly
                type="date"
                className={cx("from__item--input")}
                value={new Date(task?.dateEnd).toLocaleDateString("en-CA")}
              />
            </div>
            <div className={cx("project__from--item")}>
              <span className={cx("from__item--title")}>Mô Tả</span>
              <textarea
                readOnly
                type="text"
                className={cx("from__item--inputArea")}
                value={task?.description}
              />
            </div>
            <div className={cx("project__from--item")}>
              <span className={cx("from__item--title")}>Trạng Thái</span>
              {task?.status === 111 && (
                <input
                  className={cx("from__item--input")}
                  value="Mới"
                  readOnly
                />
              )}
              {task?.status === 222 && (
                <input
                  className={cx("from__item--input")}
                  value="Đang Thực Hiện"
                  readOnly
                />
              )}
              {task?.status === 333 && (
                <input
                  className={cx("from__item--input")}
                  value="Hoàn Thành"
                  readOnly
                />
              )}
              {task?.status === 444 && (
                <input
                  className={cx("from__item--input")}
                  value="Chưa Hoàn Thành"
                  readOnly
                />
              )}
            </div>
          </div>
          <div className={cx("Create__project--btn")}>
            <button className={cx("project__btn--create")} type="submit">
              Xác Nhận
            </button>
            <div className={cx("project__btn--delete")}>Xóa Dự Án</div>
          </div>
        </form>
      </div>
    </div>
  );
};

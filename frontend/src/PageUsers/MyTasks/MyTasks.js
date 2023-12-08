import className from "classnames/bind";
import style from "./MyTasks.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { InforTask } from "./InforTask/InforTask";
import { updateStatusTask } from "../../redux/apiRequest";
import { createAxios } from "../../createInstance";
import { updateStatusTasksSuccess } from "../../redux/taskSlice";
import SearchTasks from "../SearchTasks/SearchTasks/SearchTasks";
import { useNavigate } from "react-router-dom";
const cx = className.bind(style);
function MyTasks() {
  const [showInfor, setShowInfor] = useState(false);
  const [idTask, setIDTask] = useState("");
  const authUser = useSelector((state) => state.auth.login?.currentUser);
  const currentUser = useSelector((state) => state.users.users?.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = authUser?.accessToken;
  let axiosJWT = createAxios(authUser, dispatch, updateStatusTasksSuccess);
  const handleShow = (id) => {
    setIDTask(id);
    setShowInfor((showInfor) => !showInfor);
  };
  const handleSubmit = (id) => {
    const newStatusTask = {
      status: 333,
    };
    updateStatusTask(
      newStatusTask,
      id,
      navigate,
      dispatch,
      accessToken,
      axiosJWT
    );
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("heading")}>
        <SearchTasks />
        <h1>Danh Sách Các Công Việc Của Tôi</h1>
      </div>
      {currentUser?.tasks?.map((item) => item).length > 0 ? (
        <div className={cx("content__lists--tasks")}>
          <div className={cx("from__item--tasks")}>
            <div className={cx("lists__tasks--title")}>
              <p className={cx("lists__tasks--item")}>STT</p>
              <p className={cx("lists__tasks--item")}>Tên Công Việc</p>
              <p className={cx("lists__tasks--item")}>Người Thực Hiện</p>
              <p className={cx("lists__tasks--item")}>Trạng Thái</p>
              <p className={cx("lists__tasks--item")}>Công Cụ</p>
            </div>
          </div>
          <ul className={cx("item__tasks--lists")}>
            {currentUser?.tasks?.map((item, index) => (
              <li className={cx("item__tasks--item")} key={index}>
                <p className={cx("lists__tasks--item")}>{index}</p>
                <p className={cx("lists__tasks--item")}>{item.taskName}</p>
                <p className={cx("lists__tasks--item")}>
                  {item.user?.infor?.name
                    ? item.user?.infor?.name
                    : item.user?.username}
                </p>
                <p className={cx("lists__tasks--item")}>
                  {item.status === 111 && "Mới"}
                  {item.status === 222 && "Đang Thực Hiện"}
                  {item.status === 333 && "Hoàn Thành"}
                  {item.status === 444 && "Chưa Hoàn Thành"}
                </p>
                <p className={cx("lists__tasks--item")}>
                  <button
                    className={cx("lists__tasks--btn")}
                    onClick={() => handleShow(item._id)}
                  >
                    Nhận Việc
                  </button>
                  <button
                    className={cx("lists__tasks--btnCompleted")}
                    onClick={() => handleSubmit(item._id)}
                  >
                    Hoàn Thành
                  </button>
                </p>
              </li>
            ))}
          </ul>
          {showInfor && <InforTask idTask={idTask} handleShow={handleShow} />}
        </div>
      ) : (
        <div className={cx("content__lists--tasks")}>
          <h1>Hiện Tại Chưa Có Công Việc Được Giao</h1>
        </div>
      )}
    </div>
  );
}

export default MyTasks;

import classNames from "classnames/bind";
import style from "./editProjects.module.scss";
import * as Unicons from "@iconscout/react-unicons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProject, updateProject } from "../../../../redux/apiRequest";
import { createAxios } from "../../../../createInstance";
import {
  deleteProjectSuccess,
  updateProjectSuccess,
} from "../../../../redux/projectSlice";
const cx = classNames.bind(style);
const statusList = [
  { id: 111, name: "Mới" },
  { id: 222, name: "Đang Thực Hiện" },
  { id: 333, name: "Hoàn Thành" },
  { id: 444, name: "Chưa Hoàn Thành" },
];
function EditProjects({ handlehideEditForm, projectEdit, departmentInfor }) {
  // STORE DATA
  const authUser = useSelector((state) => state.auth.login?.currentUser);
  const dispatch = useDispatch();
  const accessToken = authUser?.accessToken;
  let axiosJWTEdit = createAxios(authUser, dispatch, updateProjectSuccess);
  let axiosJWTDelete = createAxios(authUser, dispatch, deleteProjectSuccess);
  // FROM EDIT
  const [projectName, setProjectName] = useState(projectEdit?.projectName);
  const [manager, setManager] = useState("");
  const [dateStart, setDateStart] = useState(() => {
    const dateformat = new Date(projectEdit?.dateStart);
    return dateformat.toLocaleDateString("en-CA");
  });
  const [dateEnd, setDateEnd] = useState(() => {
    const dateformat = new Date(projectEdit?.dateEnd);
    return dateformat.toLocaleDateString("en-CA");
  });
  const [costs, setCosts] = useState(projectEdit?.costs);
  const [status, setStatus] = useState(() => {
    statusList.map((item) => {
      if (item.id === projectEdit?.status) {
        return item.name;
      }
    });
    return projectEdit?.status;
  });
  // LISTENER
  const handleSubmit = (event) => {
    event.preventDefault();
    handlehideEditForm();
    const newInfor = {
      projectName: projectName,
      manage: manager,
      dateStart: dateStart,
      dateEnd: dateEnd,
      costs: costs,
      status: status,
    };
    updateProject(
      newInfor,
      projectEdit?._id,
      dispatch,
      accessToken,
      axiosJWTEdit
    );
  };
  const handleDeleteProject = () => {
    deleteProject(projectEdit?._id, dispatch, accessToken, axiosJWTDelete);
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("Create__project--inner")}>
        <div className={cx("Create__project--heading")}>
          <h1>Chỉnh Sửa Thông Tin Dự Án</h1>
          <div
            className={cx("project__heading--icon")}
            onClick={handlehideEditForm}
          >
            <Unicons.UilTimesCircle />
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={cx("Create__project--from")}>
            <div className={cx("project__from--item")}>
              <span className={cx("from__item--title")}>Tên Dự Án</span>
              <input
                className={cx("from__item--input")}
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </div>
            <div className={cx("project__from--item")}>
              <span className={cx("from__item--title")}>Quản Lý</span>
              {projectEdit?.manage ? (
                <select className={cx("from__item--input")}>
                  <option>
                    {projectEdit?.manage?.infor.name
                      ? projectEdit?.manage?.infor.name
                      : projectEdit?.manage?.username}
                  </option>
                </select>
              ) : (
                <select
                  className={cx("from__item--input")}
                  onChange={(e) => setManager(e.target.value)}
                >
                  <option disabled selected>
                    Hãy phân công trưởng dự án
                  </option>
                  {departmentInfor?.users?.map((item, index) => (
                    <option value={item._id} key={index}>
                      {item.infor?.name}
                    </option>
                  ))}
                </select>
              )}
            </div>
            <div className={cx("project__from--item")}>
              <span className={cx("from__item--title")}>Ngày Bắt Đầu</span>
              <input
                value={dateStart}
                type="date"
                className={cx("from__item--input")}
                onChange={(e) => setDateStart(e.target.value)}
              />
            </div>
            <div className={cx("project__from--item")}>
              <span className={cx("from__item--title")}>Thời Hạn</span>
              <input
                value={dateEnd}
                type="date"
                className={cx("from__item--input")}
                onChange={(e) => setDateEnd(e.target.value)}
              />
            </div>
            <div className={cx("project__from--item")}>
              <span className={cx("from__item--title")}>Tổng Giá Trị</span>
              <input
                className={cx("from__item--input")}
                value={costs}
                onChange={(e) => setCosts(e.target.value)}
              />
              <p>VNĐ</p>
            </div>
            <div className={cx("project__from--item")}>
              <span className={cx("from__item--title")}>Trạng Thái</span>
              <select
                className={cx("from__item--input")}
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
              className={cx("project__btn--cancel")}
              onClick={handleDeleteProject}
            >
              Xóa Dự Án
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProjects;

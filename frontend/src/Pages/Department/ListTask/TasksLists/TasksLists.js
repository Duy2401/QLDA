import classNames from "classnames/bind";
import style from "./TasksLists.module.scss";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../../../createInstance";
import { getProjectSuccess } from "../../../../redux/projectSlice";
import { useEffect } from "react";
import { getProject } from "../../../../redux/apiRequest";
const cx = classNames.bind(style);
function TasksLists() {
  const id = useParams();
  const projectEdit = useSelector((state) => state.project.getProject?.project);
  const authUser = useSelector((state) => state.auth.login?.currentUser);
  const dispatch = useDispatch();
  const accessToken = authUser?.accessToken;
  let axiosJWT = createAxios(authUser, dispatch, getProjectSuccess);
  useEffect(() => {
    getProject(accessToken, id.projectID, dispatch, axiosJWT);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("Create__project--inner")}>
        <div className={cx("Create__project--heading")}>
          <h1>Thông Tin Dự Án </h1>
        </div>
        <div className={cx("project__content")}>
          <div className={cx("Create__project--from")}>
            <div className={cx("project__from--item")}>
              <span className={cx("from__item--title")}>Tên Dự Án</span>
              <p className={cx("from__item--input")}>
                {projectEdit?.projectName}
              </p>
            </div>
            <div className={cx("project__from--item")}>
              <span className={cx("from__item--title")}>Quản Lý</span>
              <p className={cx("from__item--input")}>
                {projectEdit?.manage?.infor?.name
                  ? projectEdit?.manage?.infor?.name
                  : projectEdit?.manage?.username}
              </p>
            </div>
            <div className={cx("project__from--item")}>
              <span className={cx("from__item--title")}>Ngày Bắt Đầu</span>
              <p className={cx("from__item--input")}>
                {new Date(projectEdit?.dateStart)?.toLocaleDateString("vn-CA")}
              </p>
            </div>
            <div className={cx("project__from--item")}>
              <span className={cx("from__item--title")}>Thời Hạn</span>
              <p className={cx("from__item--input")}>
                {new Date(projectEdit?.dateEnd)?.toLocaleDateString("vn-CA")}
              </p>
            </div>
          </div>
          <div className={cx("project__from--tasks")}>
            <span className={cx("from__tasks--title")}>
              Danh Sách Các Công Việc
            </span>
            {projectEdit?.tasks?.map((item) => item).length >= 1 ? (
              <div className={cx("from__item--tasks")}>
                <div className={cx("lists__tasks--title")}>
                  <p className={cx("lists__tasks--item")}>STT</p>
                  <p className={cx("lists__tasks--item")}>Tên Công Việc</p>
                  <p className={cx("lists__tasks--item")}>Người Thực Hiện</p>
                  <p className={cx("lists__tasks--item")}>Trạng Thái</p>
                </div>
                <ul className={cx("item__tasks--lists")}>
                  {projectEdit?.tasks?.map((item, index) => (
                    <li className={cx("item__tasks--item")} key={item?._id}>
                      <p className={cx("tasks__lists--number")}>{index}</p>
                      <p className={cx("tasks__lists--tasksName")}>
                        {item?.taskName}
                      </p>
                      <p className={cx("tasks__lists--UserName")}>
                        {item?.user?.infor?.name
                          ? item?.user?.infor?.name
                          : item?.user?.username}
                      </p>
                      <p className={cx("tasks__lists--Status")}>
                        {item?.status === 111 && "Mới"}
                        {item?.status === 222 && "Đang Thực Hiện"}
                        {item?.status === 333 && "Hoàn Thành"}
                        {item?.status === 444 && "Chưa Hoàn Thành"}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className={cx("item__task--NotCreate")}>
                Dự án chưa có công việc nào được tạo và phân công !{" "}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default TasksLists;

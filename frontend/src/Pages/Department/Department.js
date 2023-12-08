import className from "classnames/bind";
import styles from "./Department.module.scss";
import { Link, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Search from "../../components/Search/Search";
import { createAxios } from "../../createInstance";
import { getDepartmentSuccess } from "../../redux/departmentSlice";
import { getDepartment } from "../../redux/apiRequest";
const cx = className.bind(styles);
function Department() {
  const authUser = useSelector((state) => state.auth.login?.currentUser);
  const createProject = useSelector((state) => state.project.projects);
  const deleteProject = useSelector((state) => state.project.deleteProject);
  const removeUser = useSelector((state) => state.department.RemoveUser);
  const id = authUser.OfDepartment?._id;
  const accessToken = authUser?.accessToken;
  const dispatch = useDispatch();
  let axiosJWT = createAxios(authUser, dispatch, getDepartmentSuccess);
  useEffect(() => {
    getDepartment(accessToken, id, dispatch, axiosJWT);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, createProject, deleteProject, removeUser]);
  return (
    <div className={cx("wrapper")}>
      {authUser.OfDepartment?._id ? (
        <div>
          <div className={cx("header")}>
            <Search />
            <div className={cx("department__heading")}>
              <h1>{authUser?.OfDepartment?.departmentName}</h1>
            </div>
            <div className={cx("department__lists")}>
              <Link to="/department/list-users">
                <div className={cx("department__lists--members")}>
                  <p className={cx("lists__members-item")}>
                    Danh Sách Nhân Viên
                  </p>
                </div>
              </Link>
              <Link to="/department/list-projects">
                <div className={cx("department__lists--members")}>
                  <p className={cx("lists__members-item")}>Danh Sách Dự Án</p>
                </div>
              </Link>
            </div>
          </div>
          <Outlet />
        </div>
      ) : (
        <h1>Chưa có phòng ban</h1>
      )}
    </div>
  );
}
export default Department;

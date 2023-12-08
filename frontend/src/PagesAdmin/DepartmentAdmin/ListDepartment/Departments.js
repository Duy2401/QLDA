import classname from "classnames/bind";
import style from "./Departmentsmodule.scss";
import * as Unicons from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { createAxios } from "../../../createInstance";
import { getAllDepartmentSuccess } from "../../../redux/departmentSlice";
import { getAllDepartment } from "../../../redux/apiRequest";
import EditDepartment from "../Edit/EditDepartment";
const cx = classname.bind(style);
function Departments() {
  const [edit, setEdit] = useState(false);
  const [editID, setEditID] = useState("");
  const authUser = useSelector((state) => state.auth.login?.currentUser);
  const listDepartment = useSelector((state) =>
    Object.values(state.department.getAllDepartment?.departments)
  );
  const createDepartment = useSelector(
    (state) => state.department.createDepartment
  );
  const updateDepartment = useSelector(
    (state) => state.department.updateDepartment
  );
  const removeDepartment = useSelector(
    (state) => state.department.removeDepartment
  );
  const dispatch = useDispatch();
  const accessToken = authUser?.accessToken;
  let axiosJWT = createAxios(authUser, dispatch, getAllDepartmentSuccess);
  useEffect(() => {
    getAllDepartment(accessToken, dispatch, axiosJWT);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createDepartment, updateDepartment, removeDepartment]);
  const handleShowChangeInfor = (event) => {
    setEditID(event);
    setEdit((edit) => !edit);
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("listdepartment__lists")}>
        {listDepartment?.map((department, index) => (
          <div key={index} className={cx("listdepartment__lists--item")}>
            <h1 className={cx("lists__item--title")}>
              {department?.departmentName}
            </h1>
            <div className={cx("lists__item--infor")}>
              <div className={cx("item__infor--manage")}>
                {department?.manage ? (
                  <p>
                    {" "}
                    Trường Phòng:{" "}
                    {department.manage?.infor?.name
                      ? department.manage?.infor?.name
                      : department?.manage?.username}
                  </p>
                ) : (
                  <p>Chưa có trưởng phòng</p>
                )}
              </div>
              {department?.projects?.filter((item) => item).length > 0 ? (
                <div className={cx("item__infor--countProject")}>
                  {department.projects?.filter((item) => item).length} / Dự Án
                </div>
              ) : (
                <div className={cx("item__infor--countProject")}>
                  Chưa có dự án
                </div>
              )}
              {department?.users?.filter((item) => item).length > 0 ? (
                <div className={cx("item__infor--countStaff")}>
                  {department.users?.filter((item) => item).length} / Nhân Viên
                </div>
              ) : (
                <div className={cx("item__infor--countStaff")}>
                  Chưa có nhân viên
                </div>
              )}
            </div>
            <div
              className={cx("edit__department")}
              onClick={() => handleShowChangeInfor(department?._id)}
            >
              <Unicons.UilEdit className={cx("department__icon")} />
            </div>
          </div>
        ))}
      </div>
      {edit && (
        <EditDepartment
          listDepartment={listDepartment}
          editID={editID}
          handleShowChangeInfor={handleShowChangeInfor}
        />
      )}
      <Link to="/department/create">
        <div className={cx("department__crud")}>
          <Unicons.UilPlusCircle className={cx("department__crud--icon")} />
        </div>
      </Link>
    </div>
  );
}
export default Departments;

import classNames from "classnames/bind";
import style from "./EditDepartment.module.scss";
import * as Unicons from "@iconscout/react-unicons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../../createInstance";
import {
  removeDepartmentSuccess,
  updateDepartmentSuccess,
} from "../../../redux/departmentSlice";
import { removeDepartment, updateDepartment } from "../../../redux/apiRequest";
const cx = classNames.bind(style);
const EditDepartment = (props) => {
  const { listDepartment, editID, handleShowChangeInfor } = props;
  const getInfor = listDepartment.filter((item) => item._id === editID);
  const [departmentName, setDepartmentName] = useState(() => {
    return getInfor.map((item) => item.departmentName) || "";
  });
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auth.login?.currentUser);
  const accessToken = authUser?.accessToken;
  let axiosJWT = createAxios(authUser, dispatch, updateDepartmentSuccess);
  let axiosJWTDelete = createAxios(authUser, dispatch, removeDepartmentSuccess);
  const handleSubmit = (event) => {
    event.preventDefault();
    handleShowChangeInfor();
    const newInfor = {
      departmentName: departmentName,
    };
    updateDepartment(newInfor, editID, accessToken, dispatch, axiosJWT);
  };
  const handleRemoveDepartment = () => {
    handleShowChangeInfor();
    removeDepartment(editID, dispatch, accessToken, axiosJWTDelete);
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("Create__department--inner")}>
        <div className={cx("Create__department--heading")}>
          <h1>Chỉnh sửa thông tin phòng ban</h1>
          <div
            className={cx("department__heading--icon")}
            onClick={handleShowChangeInfor}
          >
            <Unicons.UilTimesCircle />
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={cx("Create__department--from")}>
            <div className={cx("department__from--item")}>
              <span className={cx("from__item--title")}>Tên Phòng Ban</span>
              <input
                className={cx("from__item--input")}
                placeholder="Vui lòng nhập tên phòng ban"
                value={departmentName}
                onChange={(e) => setDepartmentName(e.target.value)}
              />
            </div>
          </div>
          <div className={cx("Create__department--btn")}>
            <button className={cx("department__btn--create")} type="submit">
              Xác Nhận
            </button>
            <button
              className={cx("department__btn--cancel")}
              onClick={() => handleRemoveDepartment()}
            >
              Xóa Phòng Ban
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditDepartment;

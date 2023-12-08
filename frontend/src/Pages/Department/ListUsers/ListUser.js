import className from "classnames/bind";
import style from "./ListUsers.module.scss";
import * as Unicons from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { createAxios } from "../../../createInstance";
import { removeUserSuccess } from "../../../redux/departmentSlice";
import { RemoveUserInDepartment } from "../../../redux/apiRequest";
const cx = className.bind(style);
function ListUsers() {
  const [showExtend, setShowExtend] = useState(false);
  const authUser = useSelector((state) => state.auth.login?.currentUser);
  const departmentInfor = useSelector(
    (state) => state.department.InfoDepartment?.getDepartment
  );
  const dispatch = useDispatch();
  const accessToken = authUser?.accessToken;
  let axiosJWT = createAxios(authUser, dispatch, removeUserSuccess);
  const handleExtendTool = (index) => {
    setShowExtend(index);
  };

  const handleRemoveUserInDepartment = (id) => {
    RemoveUserInDepartment(accessToken, id, dispatch, axiosJWT);
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("users__list--title")}>
        <ul>
          <li>Họ và tên</li>
          <li>Email</li>
          <li>Chức vụ</li>
          <li>Số điện thoại</li>
        </ul>
      </div>
      {departmentInfor?.users?.filter((item) => item).length === 0 && (
        <h1 className={cx("text__none")}>PHÒNG BAN CHƯA CÓ THÀNH VIÊN </h1>
      )}
      {departmentInfor?.users?.map((item) => (
        <div className={cx("users__list--content")} key={item._id}>
          <div className={cx("users__list--inner")}>
            <div className={cx("users__list--item")}>
              <img
                src={item.infor.avatarUrl}
                className={cx("list__item-avt")}
                alt="error"
              />
              <span className={cx("list__item--fullName")}>
                {item.infor?.name ? item.infor.name : item.username}
              </span>
            </div>
            <div className={cx("users__list--item")}>
              {item?.infor?.email ? (
                <span className={cx("list__item--text")}>
                  {item.infor.email}
                </span>
              ) : (
                <span className={cx("list__item--text")}>Chưa có Email</span>
              )}
            </div>
            <div className={cx("users__list--item")}>
              {item?.infor?.position ? (
                <span className={cx("list__item--text")}>
                  {item.infor.position}
                </span>
              ) : (
                <span className={cx("list__item--text")}>Chưa có chức vụ</span>
              )}
            </div>
            <div className={cx("users__list--item")}>
              {item?.infor?.phoneNumber ? (
                <span className={cx("list__item--text")}>
                  {item.infor.phoneNumber}
                </span>
              ) : (
                <span className={cx("list__item--text")}>Chưa có liên hệ</span>
              )}
            </div>
            <div className={cx("users__list--tools")}>
              <span onClick={() => handleExtendTool(item._id)}>...</span>
              <div
                className={cx(
                  "list__tools--extend",
                  item._id === showExtend ? "active" : "unactive"
                )}
              >
                <ul className={cx("list__tools--inner")}>
                  <div
                    className={cx("tools__extend--item")}
                    onClick={() => handleRemoveUserInDepartment(item?._id)}
                  >
                    <Unicons.UilTrash className={cx("tools__extend--icon")} />
                    <li>Xóa</li>
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
export default ListUsers;

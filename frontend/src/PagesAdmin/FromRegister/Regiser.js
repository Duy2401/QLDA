import classNames from "classnames/bind";
import style from "./Regiser.module.scss";
import { useState } from "react";
import * as Unicons from "@iconscout/react-unicons";
import { registerUser } from "../../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../createInstance";
import { registerSuccess } from "../../redux/authSlice";
const cx = classNames.bind(style);
function Register({ listDepartment, handleShowFrom }) {
  const authUser = useSelector((state) => state.auth.login?.currentUser);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  let axiosJWT = createAxios(authUser, dispatch, registerSuccess);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    handleShowFrom();
    registerUser(formData, dispatch, axiosJWT);
  };
  console.log(listDepartment);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("Create__project--inner")}>
        <div className={cx("Create__project--heading")}>
          <h1>Tạo Tài Khoản Mới</h1>
          <div
            className={cx("project__heading--icon")}
            onClick={handleShowFrom}
          >
            <Unicons.UilTimesCircle />
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={cx("Create__project--from")}>
            <div className={cx("project__from--item")}>
              <span className={cx("from__item--title")}>Email</span>
              <input
                type="email"
                className={cx("from__item--input")}
                name="email"
                onChange={handleChange}
              />
            </div>
            <div className={cx("project__from--item")}>
              <span className={cx("from__item--title")}>Tên Đăng Nhập</span>
              <input
                className={cx("from__item--input")}
                name="username"
                onChange={handleChange}
              />
            </div>
            <div className={cx("project__from--item")}>
              <span className={cx("from__item--title")}>Mật Khẩu</span>
              <input
                type="password"
                className={cx("from__item--input")}
                name="password"
                onChange={handleChange}
              />
            </div>
            <div className={cx("project__from--item")}>
              <span className={cx("from__item--title")}>Phân Quyền</span>
              <select
                className={cx("from__item--input")}
                name="isRole"
                onChange={handleChange}
              >
                <option disabled selected>
                  Chọn Phân Quyền
                </option>
                <option value={2001}>Nhân Viên</option>
                <option value={2003}>Trưởng Phòng Ban</option>
              </select>
            </div>
            <div className={cx("project__from--item")}>
              <span className={cx("from__item--title")}>Phòng Ban</span>
              <select
                className={cx("from__item--input")}
                name="OfDepartment"
                onChange={handleChange}
              >
                <option disabled selected>
                  Chọn Phòng Ban
                </option>
                {listDepartment?.map((item) => (
                  <option value={item?._id}>{item?.departmentName}</option>
                ))}
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
}

export default Register;

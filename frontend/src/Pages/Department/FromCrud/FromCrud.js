import classNames from "classnames/bind";
import style from "./FromCrud.module.scss";
import * as Unicons from "@iconscout/react-unicons";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createProject } from "../../../redux/apiRequest";
import { createAxios } from "../../../createInstance";
import { createProjectSuccess } from "../../../redux/projectSlice";
const cx = classNames.bind(style);
function FromCrud({ departmentInfor, handleShow, authUser }) {
  const listStaf = departmentInfor?.users?.filter(
    (item) => item.isRole !== 2003
  );
  const dispatch = useDispatch();
  let axiosJWT = createAxios(authUser, dispatch, createProjectSuccess);
  const [formData, setFormData] = useState({
    projectName: "",
    manage: "",
    dateStart: "",
    dateEnd: "",
    costs: "",
    department: "",
    status: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    handleShow();
    createProject(formData, authUser?.accessToken, dispatch, axiosJWT);
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("Create__project--inner")}>
        <div className={cx("Create__project--heading")}>
          <h1>Tạo Mới Dự Án</h1>
          <div className={cx("project__heading--icon")} onClick={handleShow}>
            <Unicons.UilTimesCircle />
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={cx("Create__project--from")}>
            <div className={cx("project__from--item")}>
              <span className={cx("from__item--title")}>Tên Dự Án</span>
              <input
                className={cx("from__item--input")}
                name="projectName"
                onChange={handleChange}
              />
            </div>
            <div className={cx("project__from--item")}>
              <span className={cx("from__item--title")}>Quản Lý</span>
              <select
                className={cx("from__item--input")}
                name="manage"
                onChange={handleChange}
              >
                <option>Tùy Chọn</option>
                {listStaf?.map((item, index) => (
                  <option value={item?._id} key={index}>
                    {item?.infor?.name ? item?.infor?.name : item?.username}
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
              <span className={cx("from__item--title")}>Tổng Giá Trị</span>
              <input
                className={cx("from__item--input")}
                name="costs"
                onChange={handleChange}
              />
              <p>VNĐ</p>
            </div>
            <div className={cx("project__from--item")}>
              <span className={cx("from__item--title")}>Phòng Ban</span>
              <select
                className={cx("from__item--input")}
                name="department"
                onChange={handleChange}
              >
                <option>Tùy Chọn</option>
                <option value={departmentInfor?._id}>
                  {departmentInfor?.departmentName}
                </option>
              </select>
            </div>
            <div className={cx("project__from--item")}>
              <span className={cx("from__item--title")}>Trạng Thái</span>
              <select
                className={cx("from__item--input")}
                name="status"
                onChange={handleChange}
              >
                <option>Tùy Chọn</option>
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
}
export default FromCrud;

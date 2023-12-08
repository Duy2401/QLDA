import classNames from "classnames/bind";
import style from "./CreateDepartment.module.scss";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createAxios } from "../../../createInstance";
import { createDepartmentSuccess } from "../../../redux/departmentSlice";
import { createDepartment } from "../../../redux/apiRequest";
const cx = classNames.bind(style);
function CreateDepartment() {
  const authUser = useSelector((state) => state.auth.login?.currentUser);
  const Users = useSelector((state) =>
    Object.values(state.users.getUsers?.listusers).filter(
      (item) => item.OfDepartment === null && item.isRole === 2001
    )
  );
  const dispatch = useDispatch();
  const accessToken = authUser?.accessToken;
  const navigate = useNavigate();
  let axiosJWT = createAxios(authUser, dispatch, createDepartmentSuccess);
  const [departmentName, setDepartmentName] = useState("");
  const [manage, setManage] = useState("");
  const [staffs, setStaffs] = useState([]);
  const handleChange = (e) => {
    e.preventDefault();
    const newDepartment = {
      departmentName: departmentName,
      manage: manage,
      staffs: staffs,
    };
    createDepartment(newDepartment, dispatch, navigate, accessToken, axiosJWT);
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("Create__department--inner")}>
        <div className={cx("Create__department--heading")}>
          <h1>Tạo Phòng Ban</h1>
        </div>
        <form onSubmit={handleChange}>
          <div className={cx("Create__department--from")}>
            <div className={cx("department__from--item")}>
              <span className={cx("from__item--title")}>Tên Phòng Ban</span>
              <input
                className={cx("from__item--input")}
                value={departmentName}
                placeholder="Vui lòng nhập tên phòng ban"
                onChange={(e) => setDepartmentName(e.target.value)}
              />
            </div>
            <div className={cx("department__from--item")}>
              <span className={cx("from__item--title")}>Trưởng Phòng</span>
              <select
                value={manage}
                className={cx("from__item--input")}
                name="manage"
                onChange={(e) => setManage(e.target.value)}
              >
                <option selected>Chọn trưởng phòng</option>
                {Users?.map((item, index) => (
                  <option value={item?._id} key={index}>
                    {item.infor?.name ? item.infor?.name : item?.username}
                  </option>
                ))}
              </select>
            </div>
            <div className={cx("department__from--item2")}>
              <span className={cx("from__item--title")}>Nhân Viên</span>
              {Users.length > 0 ? (
                <div className={cx("from__item--lists")}>
                  {Users?.map((item, index) => (
                    <div className={cx("from__item--radioButton")} key={index}>
                      <input
                        type="checkbox"
                        className={cx("item__radioButton--input")}
                        name="users"
                        value={item._id}
                        onChange={(e) =>
                          setStaffs((staffs) => [...staffs, e.target.value])
                        }
                      />
                      <span>
                        {item.infor?.name ? item.infor?.name : item.username}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={cx("from__item--lists")}>
                  <span>Nhân viên đã tham gia các phòng ban</span>
                </div>
              )}
            </div>
          </div>
          <div className={cx("Create__department--btn")}>
            <button className={cx("department__btn--create")} type="submit">
              Xác Nhận
            </button>
            <button className={cx("department__btn--cancel")} type="reset">
              Hủy Bỏ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateDepartment;

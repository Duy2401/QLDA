import classNames from "classnames/bind";
import style from "./SideBarRight.module.scss";
import * as Unicons from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { getCurrentUser } from "../../redux/apiRequest";
import { createAxios } from "../../createInstance";
import { getCurrentUserSuccess } from "../../redux/userSlice";
const Roles = [
  {
    id: 2001,
    name: "Nhân Viên",
  },
  {
    id: 2002,
    name: "Admin",
  },
  {
    id: 2003,
    name: "Trưởng Phòng",
  },
  {
    id: 2004,
    name: "Quản Lý Dự Án",
  },
];
const cx = classNames.bind(style);
function SideBarRight() {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const userInfo = useSelector((state) => state.users.users?.currentUser);
  const id = user?._id;
  const dispatch = useDispatch();
  const axiosJWT = createAxios(user, dispatch, getCurrentUserSuccess);
  useEffect(() => {
    if (user?.accessToken) {
      getCurrentUser(user?.accessToken, id, dispatch, axiosJWT);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("Avatar__users")}>
        <img
          src={userInfo?.avatarUrl}
          className={cx("Avatar__users--img")}
          alt="failed"
        />
      </div>
      <div className={cx("Infor__users")}>
        <div className={cx("Infor__users--Name")}>
          <h3>
            {userInfo?.infor?.name ? userInfo?.infor?.name : userInfo?.username}
          </h3>
        </div>
        <div className={cx("Infor__users--Email")}>
          {userInfo?.email ? <p>{userInfo?.email}</p> : <p>Not Email</p>}
        </div>
        <Link to="/profile">
          <button className={cx("btn__editProfile")}>Chỉnh Sửa</button>
        </Link>

        <div className={cx("Infor__users--personal")}>
          <div className={cx("Infor__position--department")}>
            <Unicons.UilBuilding className={cx("Infor__department--icon")} />
            {userInfo?.OfDepartment !== null ? (
              <p className={cx("Infor__department--title")}>
                {userInfo?.OfDepartment?.departmentName}
              </p>
            ) : (
              <p className={cx("Infor__department--title")}>
                Chưa vào phòng ban
              </p>
            )}
          </div>
          <div className={cx("Infor__position--permission")}>
            <Unicons.UilUser className={cx("Infor__permission--icon")} />
            {Roles.map(
              (item) =>
                item.id === userInfo?.isRole && (
                  <p className={cx("Infor__department--title")} key={item.id}>
                    {item.name}
                  </p>
                )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default SideBarRight;

import * as Unicons from "@iconscout/react-unicons";
import logo from "../../assets/Images/Logo.png";
import classNames from "classnames/bind";
import style from "./Sidebar.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../../redux/apiRequest";
import { createAxios } from "../../createInstance";
import { logOutSuccess } from "../../redux/authSlice";
const cx = classNames.bind(style);
function SideBar() {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const accessToken = user?.accessToken;
  const id = user?._id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let axiosJWT = createAxios(user, dispatch, logOutSuccess);
  const handleLogout = () => {
    logOut(dispatch, id, navigate, accessToken, axiosJWT);
    localStorage.removeItem("persist:root");
  };
  return (
    <div className={cx("wrapper")}>
      <Link to="/">
        <div className={cx("Logo__app")}>
          <img src={logo} className={cx("logo")} alt="FileError" />
        </div>
      </Link>
      <div className={cx("List__menu")}>
        <Link to="/">
          <div className={cx("List__menu--item")}>
            <div className={cx("menu__item--icon")}>
              <Unicons.UilEstate className={cx("icon")} />
            </div>
            <h3 className={cx("menu__item--title")}>Trang Chủ</h3>
          </div>
        </Link>
        {user?.isRole === 2002 && (
          <Link to="/department/listdepartment">
            <div className={cx("List__menu--item")}>
              <div className={cx("menu__item--icon")}>
                <Unicons.UilBuilding className={cx("icon")} />
              </div>
              <h3 className={cx("menu__item--title")}>Phòng Ban</h3>
            </div>
          </Link>
        )}
        {user?.isRole === 2003 && (
          <Link to="/department/list-projects">
            <div className={cx("List__menu--item")}>
              <div className={cx("menu__item--icon")}>
                <Unicons.UilBuilding className={cx("icon")} />
              </div>
              <h3 className={cx("menu__item--title")}>Phòng Ban</h3>
            </div>
          </Link>
        )}
        {user?.isRole === 2002 && (
          <Link to="/admin/register">
            <div className={cx("List__menu--item")}>
              <div className={cx("menu__item--icon")}>
                <Unicons.UilRegistered className={cx("icon")} />
              </div>
              <h3 className={cx("menu__item--title")}>Tạo Tài Khoản</h3>
            </div>
          </Link>
        )}
        {user?.isRole === 2003 && (
          <Link to="/statistics/tasks">
            <div className={cx("List__menu--item")}>
              <div className={cx("menu__item--icon")}>
                <Unicons.UilChartLine className={cx("icon")} />
              </div>
              <h3 className={cx("menu__item--title")}>Thống Kê</h3>
            </div>
          </Link>
        )}
        {/* isRole is Staff */}
        {user?.isRole === 2001 && (
          <Link to="/tasks">
            <div className={cx("List__menu--item")}>
              <div className={cx("menu__item--icon")}>
                <Unicons.UilFileCheckAlt className={cx("icon")} />
              </div>
              <h3 className={cx("menu__item--title")}>Công Việc Của Tôi</h3>
            </div>
          </Link>
        )}
        {user?.isRole === 2001 && (
          <Link to="/department">
            <div className={cx("List__menu--item")}>
              <div className={cx("menu__item--icon")}>
                <Unicons.UilBuilding className={cx("icon")} />
              </div>
              <h3 className={cx("menu__item--title")}>Phòng Ban</h3>
            </div>
          </Link>
        )}
        {user?.isRole === 2001 && (
          <Link to="/statistics">
            <div className={cx("List__menu--item")}>
              <div className={cx("menu__item--icon")}>
                <Unicons.UilChartLine className={cx("icon")} />
              </div>
              <h3 className={cx("menu__item--title")}>Thống Kê</h3>
            </div>
          </Link>
        )}
        {/* ROUTER OF MANAGE PROJECT */}
        {user?.isRole === 2004 && (
          <Link to="/projects/list-projects">
            <div className={cx("List__menu--item")}>
              <div className={cx("menu__item--icon")}>
                <Unicons.UilListOl className={cx("icon")} />
              </div>
              <h3 className={cx("menu__item--title")}>Dự Án Của Tôi</h3>
            </div>
          </Link>
        )}
        {user?.isRole === 2004 && (
          <Link to="/department">
            <div className={cx("List__menu--item")}>
              <div className={cx("menu__item--icon")}>
                <Unicons.UilBuilding className={cx("icon")} />
              </div>
              <h3 className={cx("menu__item--title")}>Phòng Ban</h3>
            </div>
          </Link>
        )}
        {user?.isRole === 2004 && (
          <Link to="/statistics">
            <div className={cx("List__menu--item")}>
              <div className={cx("menu__item--icon")}>
                <Unicons.UilChartLine className={cx("icon")} />
              </div>
              <h3 className={cx("menu__item--title")}>Thống Kê</h3>
            </div>
          </Link>
        )}
        <div className={cx("line--border")}></div>
        <div className={cx("List__menu--item")} onClick={handleLogout}>
          <div className={cx("menu__item--icon")}>
            <Unicons.UilSignout className={cx("icon")} />
          </div>
          <h3 className={cx("menu__item--title")}>Đăng xuất</h3>
        </div>
      </div>
    </div>
  );
}
export default SideBar;

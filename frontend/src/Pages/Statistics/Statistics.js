import classnames from "classnames/bind";
import style from "./Statistics.module.scss";
import { Link, Outlet } from "react-router-dom";
const cx = classnames.bind(style);

function Statistics() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <div className={cx("header__title--lists")}>
          <h1 className={cx("header__title--item")}>Thống Kê Công Việc Của</h1>
          <h1 className={cx("header__title--item")}>Phòng Kỹ Thuật</h1>
        </div>
        <div className={cx("header__feature")}>
          <Link to="/statistics/tasks">
            <div className={cx("feature__lists--item")}>
              <p className={cx("feature__item--text")}>Thống Kê Phòng Ban</p>
            </div>
          </Link>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
export default Statistics;

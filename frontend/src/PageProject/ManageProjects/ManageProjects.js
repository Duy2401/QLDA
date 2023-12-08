import classNames from "classnames/bind";
import style from "./ManageProjects.module.scss";
import { Outlet } from "react-router-dom";
const cx = classNames.bind(style);
function ManageProjects() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("Search")}>
        <h1>Dự Án Của Tôi</h1>
      </div>
      <Outlet />
    </div>
  );
}
export default ManageProjects;

import classname from "classnames/bind";
import style from "./DepartmentAdmin.module.scss";
import { Outlet } from "react-router-dom";
const cx = classname.bind(style);
function DepartmentAdmin() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("listdepartment__heading")}>
        <h1>DANH SÁCH CÁC PHÒNG BAN</h1>
      </div>
      <Outlet />
    </div>
  );
}

export default DepartmentAdmin;

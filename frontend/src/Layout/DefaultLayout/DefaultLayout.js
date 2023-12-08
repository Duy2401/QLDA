import classNames from "classnames/bind";
import style from "./DefaultLayout.module.scss";

import SideBar from "../../components/Sidebar/Sidebar";
const cx = classNames.bind(style);
function DefaultLayout({ children }) {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <SideBar />
        <div className={cx("content")}>{children}</div>
      </div>
    </div>
  );
}
export default DefaultLayout;

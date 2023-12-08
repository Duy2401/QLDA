import classNames from "classnames/bind";
import style from "../DefaultLayout/DefaultLayout.module.scss";

import SideBar from "../../components/Sidebar/Sidebar";
import SideBarRight from "../../components/SideBarRight/SideBarRight";
const cx = classNames.bind(style);
function LayoutHome({ children }) {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <SideBar />
        <div className={cx("content")}>{children}</div>
        <SideBarRight />
      </div>
    </div>
  );
}
export default LayoutHome;

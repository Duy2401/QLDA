import classname from "classnames/bind";
import style from "./MyDepartment.module.scss";
import MyProject from "./MyProject/MyProject";
import InforDepartment from "./StaffsInDepartment/InforDepartment";
import { useSelector } from "react-redux";
const cx = classname.bind(style);
function MyDepartment() {
  const currentUser = useSelector((state) => state.users.users?.currentUser);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <div className={cx("department__heading")}>
          <h1>{currentUser.OfDepartment?.departmentName}</h1>
        </div>
      </div>
      <div className={cx("department__lists")}>
        <InforDepartment />
        <MyProject />
      </div>
    </div>
  );
}
export default MyDepartment;

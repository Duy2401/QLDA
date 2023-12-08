import className from "classnames/bind";
import style from "./ListProjects.module.scss";
import * as Unicons from "@iconscout/react-unicons";
import { useSelector } from "react-redux";
import FromCrud from "../FromCrud/FromCrud";
import {
  ItemProjectNew,
  ItemProjectsDoing,
  ItemProjectsCompleted,
  ItemProjectsNotCompleted,
} from "./ItemProjectsList/ItemProjectsList";
import { useState } from "react";
const cx = className.bind(style);
function ListProjects() {
  const [showFrom, setShowFrom] = useState(false);
  const authUser = useSelector((state) => state.auth.login?.currentUser);
  const departmentInfor = useSelector(
    (state) => state.department.InfoDepartment?.getDepartment
  );
  const handleShow = () => {
    setShowFrom((showFrom) => !showFrom);
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("listProjects__inner")}>
        <div className={cx("listProjects__status")}>
          <div className={cx("listProjects__status--heading")}>
            <Unicons.UilLightbulbAlt className={cx("status__heading--icon")} />
            <p className={cx("status__heading--title")}>Mới Giao</p>
            <p className={cx("status__heading--Quantity")}>
              {
                departmentInfor?.projects?.filter((item) => item.status === 111)
                  .length
              }
            </p>
          </div>
          <ItemProjectNew departmentInfor={departmentInfor} />
        </div>
        <div className={cx("listProjects__status")}>
          <div className={cx("listProjects__status--heading")}>
            <Unicons.UilLightbulbAlt className={cx("status__heading--icon")} />
            <p className={cx("status__heading--title")}>Đang Thực Hiện</p>
            <p className={cx("status__heading--Quantity")}>
              {
                departmentInfor?.projects?.filter((item) => item.status === 222)
                  .length
              }
            </p>
          </div>
          <ItemProjectsDoing departmentInfor={departmentInfor} />
        </div>
        <div className={cx("listProjects__status")}>
          <div className={cx("listProjects__status--heading")}>
            <Unicons.UilLightbulbAlt className={cx("status__heading--icon")} />
            <p className={cx("status__heading--title")}>Hoàn Thành</p>
            <p className={cx("status__heading--Quantity")}>
              {
                departmentInfor?.projects?.filter((item) => item.status === 333)
                  .length
              }
            </p>
          </div>
          <ItemProjectsCompleted departmentInfor={departmentInfor} />
        </div>
        <div className={cx("listProjects__status")}>
          <div className={cx("listProjects__status--heading")}>
            <Unicons.UilLightbulbAlt className={cx("status__heading--icon")} />
            <p className={cx("status__heading--title")}>Chưa Hoàn Thành</p>
            <p className={cx("status__heading--Quantity")}>
              {
                departmentInfor?.projects?.filter((item) => item.status === 444)
                  .length
              }
            </p>
          </div>
          <ItemProjectsNotCompleted departmentInfor={departmentInfor} />
        </div>
      </div>
      <div className={cx("department__crud")} onClick={handleShow}>
        <Unicons.UilPlusCircle className={cx("department__crud--icon")} />
      </div>
      {showFrom && (
        <div>
          <div className={cx("department__mask")}></div>
          <FromCrud
            departmentInfor={departmentInfor}
            handleShow={handleShow}
            authUser={authUser}
          />
        </div>
      )}
    </div>
  );
}
export default ListProjects;

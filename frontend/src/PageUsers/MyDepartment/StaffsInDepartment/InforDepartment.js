import classNames from "classnames/bind";
import style from "./InforDepartment.module.scss";
import { useSelector } from "react-redux";
const cx = classNames.bind(style);
const InforDepartment = () => {
  const currentUser = useSelector((state) => state.users.users?.currentUser);
  return (
    <div className={cx("wrapper")}>
      {currentUser?.OfDepartment ? (
        <>
          <div className={cx("general__infor")}>
            <h1>Thông Tin Tổng Quan Phòng Ban</h1>
          </div>
          <ul className={cx("lists__content--infor")}>
            <li>
              {currentUser?.OfDepartment?.manage ? (
                <div className={cx("content__infor--item")}>
                  <span>Trưởng Phòng:</span>
                  <span className={cx("infor__item--text")}>
                    {currentUser?.OfDepartment?.manage?.infor?.name
                      ? currentUser?.OfDepartment?.manage?.infor?.name
                      : currentUser?.OfDepartment?.manage?.username}
                  </span>
                </div>
              ) : (
                <div className={cx("content__infor--item")}>
                  <span>Chưa Có Trưởng Phòng</span>
                </div>
              )}
              <div className={cx("content__infor--item")}>
                <span>Số lượng nhân viên:</span>
                <span className={cx("infor__item--text")}>
                  {currentUser?.OfDepartment?.users?.map((item) => item).length}
                </span>
              </div>
              <div className={cx("content__infor--item")}>
                <span>Số lượng dự án đang thực hiện:</span>
                <span className={cx("infor__item--text")}>
                  {
                    currentUser?.OfDepartment?.projects?.map(
                      (item) => item.status === 222
                    ).length
                  }
                </span>
              </div>
            </li>
          </ul>
        </>
      ) : (
        <h1 className={cx("notification")}>Chưa Tham Gia Phòng Ban</h1>
      )}
    </div>
  );
};
export default InforDepartment;

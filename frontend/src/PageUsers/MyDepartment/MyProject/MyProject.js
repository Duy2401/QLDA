import classNames from "classnames/bind";
import style from "./MyProject.module.scss";
import { useSelector } from "react-redux";
const cx = classNames.bind(style);
const MyProject = () => {
  const currentUser = useSelector((state) => state.users.users?.currentUser);
  return (
    <>
      {currentUser?.OfDepartment?.projects?.map((item) => item).length > 0 ? (
        <div className={cx("wrapper")}>
          <div className={cx("users__list--title")}>
            <ul>
              <li>STT</li>
              <li>Tên dự án</li>
              <li>Quản lý</li>
              <li>Trạng thái</li>
              <li>Ngày Kết Thúc</li>
            </ul>
          </div>
          <ul className={cx("lists__content--project")}>
            {currentUser?.OfDepartment?.projects?.map((item, index) => (
              <li key={index}>
                <div className={cx("content__project--item")}>
                  <span className={cx("project__item--text")}>{index}</span>
                </div>
                <div className={cx("content__project--item")}>
                  <span className={cx("project__item--text")}>
                    {item.projectName}
                  </span>
                </div>
                <div className={cx("content__project--item")}>
                  <span className={cx("project__item--text")}>
                    {item.manage === null
                      ? "Chưa có quản lý"
                      : item.manage?.infor.name
                      ? item.manage?.infor.name
                      : item.manage?.username}
                  </span>
                </div>
                <div className={cx("content__project--item")}>
                  <span className={cx("project__item--text")}>
                    {item?.status === 111 && "Mới"}
                    {item?.status === 222 && "Đang Thực Hiện"}
                    {item?.status === 333 && "Hoàn Thành"}
                    {item?.status === 444 && "Chưa Hoàn Thành"}
                  </span>
                </div>
                <div className={cx("content__project--item")}>
                  <span className={cx("project__item--text")}>
                    {new Date(item.dateEnd).toLocaleDateString()}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className={cx("lists__content--notification")}>
          <h1 className={cx("title__notification")}>
            Phòng Ban Chưa Có Dự Án Nào
          </h1>
        </div>
      )}
    </>
  );
};
export default MyProject;

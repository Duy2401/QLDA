import classNames from "classnames/bind";
import style from "./ListProjects.module.scss";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const cx = classNames.bind(style);
const ListProjects = () => {
  const listProject = useSelector((state) => state.users.users?.currentUser);
  return (
    <div className={cx("users__list--content")}>
      <div className={cx("users__list--title")}>
        <ul>
          <li>Tên Dự Án</li>
          <li>Người Quản Lý</li>
          <li>Tiến Độ</li>
          <li>Bắt Đầu Dự Án</li>
          <li>Kết Thúc Dự Án</li>
        </ul>
      </div>
      <div className={cx("users__list--project")}>
        {listProject.OfProject?.map((item, index) => (
          <Link to={`${item._id}`}>
            <div className={cx("users__list--inner")} key={index}>
              <div className={cx("users__list--item")}>
                <span className={cx("list__item--fullName")}>
                  {item.projectName}
                </span>
              </div>
              <div className={cx("users__list--item")}>
                <span className={cx("list__item--text")}>
                  {item.manage?.infor?.name
                    ? item.manage?.infor.name
                    : item.manage?.username}
                </span>
              </div>
              <div className={cx("users__list--item")}>
                <span className={cx("list__item--text")}>
                  {item?.status === 111 && "Mới"}
                  {item?.status === 222 && "Đang Thực Hiện"}
                  {item?.status === 333 && "Hoàn Thành"}
                  {item?.status === 444 && "Chưa Hoàn Thành"}
                </span>
              </div>
              <div className={cx("users__list--item")}>
                <span className={cx("list__item--text")}>
                  {new Date(item.dateStart).toLocaleDateString()}
                </span>
              </div>
              <div className={cx("users__list--item")}>
                <span className={cx("list__item--text")}>
                  {new Date(item.dateEnd).toLocaleDateString()}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default ListProjects;

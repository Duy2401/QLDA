import classNames from "classnames/bind";
import style from "./ListSearchUser.module.scss";
import SearchUser from "../SearchUser/SearchUser";
import { useSelector } from "react-redux";
const cx = classNames.bind(style);
const ListSearchUser = () => {
  const listUser = useSelector((state) =>
    Object.values(state.users.searchUsers?.userSearch)
  );
  return (
    <div className={cx("wrapper")}>
      <div className={cx("Search")}>
        <SearchUser />
      </div>
      <div className={cx("users__list--content")}>
        {listUser?.map((user, index) => (
          <div className={cx("users__list--inner")} key={index}>
            <div className={cx("users__list--item")}>
              <span className={cx("list__item--fullName")}>
                {user.username}
              </span>
            </div>
            <div className={cx("users__list--item")}>
              <span className={cx("list__item--text")}>{user.email}</span>
            </div>
            {user.infor?.gender ? (
              <div className={cx("users__list--item")}>
                <span className={cx("list__item--text")}>
                  {user.infor?.gender}
                </span>
              </div>
            ) : (
              <div className={cx("users__list--item")}>
                <span className={cx("list__item--text")}>
                  Chưa tạo thông tin
                </span>
              </div>
            )}
            {user.infor?.dateOfBirth ? (
              <div className={cx("users__list--item")}>
                <span className={cx("list__item--text")}>
                  {new Date(user.infor?.dateOfBirth).toLocaleDateString()}
                </span>
              </div>
            ) : (
              <div className={cx("users__list--item")}>
                <span className={cx("list__item--text")}>
                  Chưa tạo thông tin
                </span>
              </div>
            )}
            {user.OfDepartment?.departmentName ? (
              <div className={cx("users__list--item")}>
                <span className={cx("list__item--text")}>
                  {user.OfDepartment?.departmentName}
                </span>
              </div>
            ) : (
              <div className={cx("users__list--item")}>
                <span className={cx("list__item--text")}>
                  Chưa tạo thông tin
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListSearchUser;

import classNames from "classnames/bind";
import style from "./ListAccount.module.scss";
import { deleteUser } from "../../../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../../createInstance";
import { deleteUsersSuccess } from "../../../redux/userSlice";
const cx = classNames.bind(style);
function LisstAccount({ Users }) {
  const authUser = useSelector((state) => state.auth.login?.currentUser);
  const accessToken = authUser?.accessToken;
  const dispatch = useDispatch();
  let axiosJWTRemove = createAxios(authUser, dispatch, deleteUsersSuccess);
  const handleRemove = (id) => {
    deleteUser(accessToken, dispatch, id, axiosJWTRemove);
  };
  return (
    <div className={cx("wrapper")}>
      {Users?.map((item, index) => (
        <div className={cx("users__list--inner")} key={index}>
          <div className={cx("users__list--item")}>
            <span className={cx("list__item--text")}>{index}</span>
          </div>
          <div className={cx("users__list--item")}>
            {item?.username && (
              <span className={cx("list__item--text")}>{item.username}</span>
            )}
          </div>
          <div className={cx("users__list--item")}>
            {item?.infor?.name ? (
              <span className={cx("list__item--text")}>{item.infor?.name}</span>
            ) : (
              <span className={cx("list__item--text")}>
                Chưa thêm họ và tên
              </span>
            )}
          </div>
          <div className={cx("users__list--item")}>
            {item?.email && (
              <span className={cx("list__item--text")}>{item.email}</span>
            )}
          </div>
          <div
            className={cx("users__list--item")}
            onClick={() => handleRemove(item._id)}
          >
            <span className={cx("list__item--btn")}>Xóa Tài Khoản</span>
          </div>
        </div>
      ))}
    </div>
  );
}
export default LisstAccount;

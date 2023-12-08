import classNames from "classnames/bind";
import style from "./RegisterAccount.module.scss";
import * as Unicons from "@iconscout/react-unicons";
import Register from "../FromRegister/Regiser";
import { useEffect, useState } from "react";
import { getAllUser } from "../../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../createInstance";
import LisstAccount from "./ListAccount/ListAccount";
import { getUsersSuccess } from "../../redux/userSlice";
import SearchUser from "../SearchUser/SearchUser/SearchUser";
const cx = classNames.bind(style);
function RegisterAccount() {
  const [show, setShow] = useState(false);
  const authUser = useSelector((state) => state.auth.login?.currentUser);
  const addUser = useSelector((state) => state.auth.register);
  const deleteUser = useSelector((state) => state.users.removeUser);
  const dispatch = useDispatch();
  const listDepartment = useSelector((state) =>
    Object.values(state.department.getAllDepartment?.departments)
  );
  console.log(listDepartment);
  const Users = useSelector((state) =>
    Object.values(state.users.getUsers?.listusers)
  );
  let axiosJWTUser = createAxios(authUser, dispatch, getUsersSuccess);
  useEffect(() => {
    getAllUser(authUser?.accessToken, dispatch, axiosJWTUser);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, addUser, deleteUser]);
  const handleShowFrom = () => {
    setShow((show) => !show);
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("wrapper__heading")}>
        <SearchUser />
        <h1>Đăng Ký Tài Khoản Cho Nhân Viên</h1>
      </div>
      <div className={cx("users__list--title")}>
        <ul>
          <li>STT</li>
          <li>Tên Tài Khoản</li>
          <li>Tên Nhân Viên</li>
          <li>Email</li>
        </ul>
      </div>
      <div className={cx("users__list--content")}>
        <LisstAccount Users={Users} />
      </div>
      <div className={cx("department__crud")} onClick={handleShowFrom}>
        <Unicons.UilPlusCircle className={cx("department__crud--icon")} />
      </div>
      {show && (
        <Register
          listDepartment={listDepartment}
          handleShowFrom={handleShowFrom}
        />
      )}
    </div>
  );
}
export default RegisterAccount;

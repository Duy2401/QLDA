import classname from "classnames/bind";
import style from "./SearchUser.module.scss";
import * as Unicons from "@iconscout/react-unicons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createAxios } from "../../../createInstance";
import { searchUsersSuccess } from "../../../redux/userSlice";
import { searchUser } from "../../../redux/apiRequest";
const cx = classname.bind(style);
const SearchUser = () => {
  const [searchValue, setSearchValue] = useState("");
  const authUser = useSelector((state) => state.auth.login?.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = authUser?.accessToken;
  let axiosJWT = createAxios(authUser, dispatch, searchUsersSuccess);
  const handleSearchUser = (e) => {
    if (e.keyCode === 13) {
      searchUser(searchValue, navigate, dispatch, accessToken, axiosJWT);
    }
  };

  return (
    <div className={cx("wrapper")}>
      <header className={cx("department__header")}>
        <div className={cx("department__header--search")}>
          <Unicons.UilSearch className={cx("header__search--icon")} />
          <input
            type="text"
            value={searchValue}
            className={cx("header__search--input")}
            placeholder="Tìm Kiếm"
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => handleSearchUser(e)}
          />
        </div>
      </header>
    </div>
  );
};
export default SearchUser;

import * as Unicons from "@iconscout/react-unicons";
import classNames from "classnames/bind";
import styles from "./Search.module.scss";
import { useState } from "react";
import { searchProject } from "../../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../createInstance";
import { searchProjectSuccess } from "../../redux/projectSlice";
import { useNavigate } from "react-router-dom";
const cx = classNames.bind(styles);
const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const authUser = useSelector((state) => state.auth.login?.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = authUser?.accessToken;
  let axiosJWT = createAxios(authUser, dispatch, searchProjectSuccess);
  const handleSearchValue = (e) => {
    if (e.keyCode === 13) {
      searchProject(searchValue, navigate, dispatch, accessToken, axiosJWT);
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
            onKeyDown={(e) => handleSearchValue(e)}
          />
        </div>
      </header>
    </div>
  );
};
export default Search;

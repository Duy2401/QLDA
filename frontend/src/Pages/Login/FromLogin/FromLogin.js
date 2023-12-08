import className from "classnames/bind";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../redux/apiRequest";
import style from "./FromLogin.module.scss";
const cx = className.bind(style);
function FromLogin() {
  const [username, setUserName] = useState("");
  const [password, setPassWord] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const newUser = {
      username: username,
      password: password,
    };
    loginUser(newUser, dispatch, navigate);
  };

  return (
    <div className={cx("wrapper")}>
      <form className={cx("login")} onSubmit={handleLogin}>
        <h1 className={cx("login__heading")}>Login </h1>
        <input
          type="text"
          placeholder="Please Username"
          className={cx("login__username")}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className={cx("login__password")}
          onChange={(e) => setPassWord(e.target.value)}
        />
        <button className={cx("login__btn")}>Login</button>
      </form>
    </div>
  );
}
export default FromLogin;

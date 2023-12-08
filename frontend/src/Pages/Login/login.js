import classNames from "classnames/bind";
import style from "./login.module.scss";
import FromLogin from "./FromLogin/FromLogin";
import logo from "../../assets/Images/Logo.png";
const cx = classNames.bind(style);
function Login() {
  return (
    <div className={cx("wrapper")}>
      <img alt="FileError " className={cx("Login_Img")} src={logo} />
      <FromLogin />
    </div>
  );
}

export default Login;

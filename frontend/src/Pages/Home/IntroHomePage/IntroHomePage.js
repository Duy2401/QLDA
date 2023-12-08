import className from "classnames/bind";
import style from "./IntroHomePage.module.scss";

const cx = className.bind(style);
function IntroHomePage() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("intro__background")} />
      <div className={cx("intro__heading")}>
        <div className={cx("intro-title")}>
          <h1 className={cx("intro__title--frist")}>Công Việc Toàn Diện &</h1>
          <h1 className={cx("intro__title--second")}>
            Giải Pháp Quản Lý Dự Án Cho Doanh Nghiệp
          </h1>
        </div>
        <p className={cx("intro__description")}>
          Giải pháp giúp doanh nghiệp giải quyết bài toán hiệu quả công việc.
          Giúp người quản lý và nhân viên quản lý công việc, tránh thiếu sót.
          Đây được xem là giải pháp hữu hiệu cho các công ty hiện nay
        </p>
      </div>
    </div>
  );
}

export default IntroHomePage;

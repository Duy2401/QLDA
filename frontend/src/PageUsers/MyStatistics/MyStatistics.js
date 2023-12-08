import classNames from "classnames/bind";
import style from "./MyStatistics.module.scss";
import { Chart } from "react-google-charts";
import { useSelector } from "react-redux";
const cx = classNames.bind(style);
var options = {
  width: 600,
  height: 300,
  backgroundColor: "transparent",
};
function MyStatistics() {
  const currentUser = useSelector((state) => state.users.users?.currentUser);
  console.log(currentUser);
  const data = [
    ["task", "percent"],
    [
      "Công Việc Mới",
      currentUser?.tasks?.filter((item) => item.status === 111).length,
    ],
    [
      "Công Việc Đang Thực Hiện",
      currentUser?.tasks?.filter((item) => item.status === 222).length,
    ],
    [
      "Công Việc Hoàn Thành",
      currentUser?.tasks?.filter((item) => item.status === 333).length,
    ],
    [
      "Công Việc Chưa Hoàn Thành",
      currentUser?.tasks?.filter((item) => item.status === 444).length,
    ],
  ];
  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <h1 className={cx("header__title--item")}>
          Thống Kê Công Việc Của Tôi
        </h1>
      </div>
      <div className={cx("chart__statistics")}>
        <div className={cx("container__statictics")}>
          <div className={cx("container__statictics--chart")}>
            <h1 className={cx("container__statictics--heading")}>
              Tổng Quan Tình Hình Công Việc
            </h1>
            <Chart chartType="PieChart" data={data} options={options} />
          </div>
          <div className={cx("container__statictics--chart")}>
            <h1 className={cx("container__statictics--heading")}>
              Thống Kê Khối Lượng Công Việc
            </h1>
            <div className={cx("container__statictics--list")}>
              <div className={cx("container__statictics--item")}>
                <p className={cx("statictics__item--title")}>Tổng Công Việc</p>
                <p className={cx("statictics__item--count")}>
                  {currentUser?.tasks?.filter((item) => item).length}/ công việc
                </p>
              </div>
              <div className={cx("container__statictics--item")}>
                <p className={cx("statictics__item--title")}>
                  Chất Lượng Công Việc
                </p>
                {currentUser?.tasks !== undefined ? (
                  <p className={cx("statictics__item--count")}>
                    {Math.floor(
                      (currentUser?.tasks.filter((item) => item.status === 333)
                        .length /
                        currentUser?.tasks.filter((item) => item).length) *
                        100
                    )}{" "}
                    %
                  </p>
                ) : (
                  <p className={cx("statictics__item--count")}>0%</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default MyStatistics;

import classNames from "classnames/bind";
import style from "./StatisticsTask.module.scss";
import { Chart } from "react-google-charts";
import { useSelector } from "react-redux";
var options = {
  width: 600,
  height: 300,
  backgroundColor: "transparent",
};
const cx = classNames.bind(style);
function StatisticsTask() {
  const dataCountTask = useSelector(
    (state) => state.department.InfoDepartment?.getDepartment
  );
  const data = [
    ["task", "percent"],
    [
      "Dự Án Mới",
      dataCountTask?.projects?.filter((item) => item.status === 111).length,
    ],
    [
      "Dự Án Đang Thực Hiện",
      dataCountTask?.projects?.filter((item) => item.status === 222).length,
    ],
    [
      "Dự Án Hoàn Thành",
      dataCountTask?.projects?.filter((item) => item.status === 333).length,
    ],
    [
      "Dự Án Chưa Hoàn Thành",
      dataCountTask?.projects?.filter((item) => item.status === 444).length,
    ],
  ];
  return (
    <div className={cx("wrapper")}>
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
                {dataCountTask?.projects?.filter((item) => item).length} / công
                việc
              </p>
            </div>
            <div className={cx("container__statictics--item")}>
              <p className={cx("statictics__item--title")}>Tổng Nhân Sự</p>
              <p className={cx("statictics__item--count")}>
                {dataCountTask?.users?.filter((item) => item).length} / nhân sự
              </p>
            </div>
            <div className={cx("container__statictics--item")}>
              <p className={cx("statictics__item--title")}>
                Chất Lượng Công Việc
              </p>
              {dataCountTask?.projects !== undefined ? (
                <p className={cx("statictics__item--count")}>
                  {Math.floor(
                    (dataCountTask?.projects.filter(
                      (item) => item.status === 333
                    ).length /
                      dataCountTask?.projects.filter((item) => item).length) *
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
  );
}
export default StatisticsTask;

import classNames from "classnames/bind";
import style from "./StatisticsProject.module.scss";
import { Chart } from "react-google-charts";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllProjects } from "../../redux/apiRequest";
import { createAxios } from "../../createInstance";
import { getAllProjectSuccess } from "../../redux/projectSlice";
const cx = classNames.bind(style);
var options = {
  width: 550,
  height: 280,
  backgroundColor: "transparent",
};
function StatisticsProject() {
  const currentUser = useSelector((state) => state.users.users?.currentUser);
  const authUser = useSelector((state) => state.auth.login?.currentUser);
  const listProject = useSelector((state) =>
    Object.values(state.project.getAllProject?.projects).filter(
      (item) => item?.manage?._id === currentUser?._id
    )
  );
  const accessToken = authUser?.accessToken;
  const dispatch = useDispatch();
  let axiosJWT = createAxios(authUser, dispatch, getAllProjectSuccess);
  useEffect(() => {
    getAllProjects(accessToken, dispatch, axiosJWT);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(
    listProject.map((item) => item.users?.map((item, index) => item))
  );
  const data = [
    ["task", "percent"],
    [
      "Dự Án Mới",
      currentUser?.OfProject?.filter((item) => item.status === 111).length,
    ],
    [
      "Dự Án Đang Thực Hiện",
      currentUser?.OfProject?.filter((item) => item.status === 222).length,
    ],
    [
      "Dự Án Hoàn Thành",
      currentUser?.OfProject?.filter((item) => item.status === 333).length,
    ],
    [
      "Dự Án Chưa Hoàn Thành",
      currentUser?.OfProject?.filter((item) => item.status === 444).length,
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
                <p className={cx("statictics__item--title")}>
                  Tổng Dự Án Đang Quản Lý
                </p>
                <p className={cx("statictics__item--count")}>
                  {currentUser?.OfProject?.filter((item) => item).length}/ Dự Án
                </p>
              </div>
              <div className={cx("container__statictics--item")}>
                <p className={cx("statictics__item--title")}>
                  Chất Lượng Hoàn Thành Dự Án
                </p>
                {currentUser?.OfProject !== undefined ? (
                  <p className={cx("statictics__item--count")}>
                    {Math.floor(
                      (currentUser?.OfProject?.filter(
                        (item) => item.status === 333
                      ).length /
                        currentUser?.OfProject?.filter((item) => item).length) *
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
      <div className={cx("chart__statistics--staffs")}>
        <h1 className={cx("statistics__staffs--heading")}>Thống Kê Nhân Sự</h1>
        <ul className={cx("statistics__staffs--title")}>
          <li>STT</li>
          <li>Tên Nhân Sự</li>
          <li>Số Công Việc</li>
          <li>Số Công Việc Hoàn Thành</li>
          <li>Chất Lượng Hoàn Thành Công Việc</li>
        </ul>
        <ul className={cx("statistics__staffs--lists")}>
          {listProject.map((item) =>
            item.users?.map((item, index) => (
              <li key={item._id}>
                <div className={cx("staffs--lists--item")}>
                  <span className={cx("staffs--lists--text")}>{index}</span>
                </div>
                <div className={cx("staffs--lists--item")}>
                  <span className={cx("staffs--lists--text")}>
                    {item.infor?.name ? item.infor?.name : item?.username}
                  </span>
                </div>
                <div className={cx("staffs--lists--item")}>
                  <span className={cx("staffs--lists--text")}>
                    {item.tasks.filter((item) => item).length}
                  </span>
                </div>
                <div className={cx("staffs--lists--item")}>
                  <span className={cx("staffs--lists--text")}>
                    {item.tasks.filter((item) => item.status === 333).length}
                  </span>
                </div>
                <div className={cx("staffs--lists--item")}>
                  <span className={cx("staffs--lists--text")}>
                    {(item.tasks.filter((item) => item.status === 333).length /
                      item.tasks.filter((item) => item).length) *
                      100}{" "}
                    %
                  </span>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
export default StatisticsProject;

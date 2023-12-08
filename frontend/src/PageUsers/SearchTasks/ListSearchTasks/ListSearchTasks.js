import classNames from "classnames/bind";
import style from "./ListSearchTasks.module.scss";
import SearchTasks from "../SearchTasks/SearchTasks";
import { useSelector } from "react-redux";
const cx = classNames.bind(style);
const ListSearchTasks = () => {
  const listTask = useSelector((state) =>
    Object.values(state.task.searchTasks.tasks)
  );
  console.log(listTask);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("Search")}>
        <SearchTasks />
      </div>
      <div className={cx("users__list--content")}>
        {listTask?.map((task, index) => (
          <div className={cx("users__list--inner")} key={index}>
            <div className={cx("users__list--item")}>
              <span className={cx("list__item--fullName")}>
                {task.taskName}
              </span>
            </div>
            {task.createUser ? (
              <div className={cx("users__list--item")}>
                <span className={cx("list__item--text")}>
                  {task.createUser}
                </span>
              </div>
            ) : (
              <div className={cx("users__list--item")}>
                <span className={cx("list__item--text")}>
                  Chưa tạo thông tin
                </span>
              </div>
            )}
            {task.user ? (
              <div className={cx("users__list--item")}>
                <span className={cx("list__item--text")}>
                  {task.user.infor?.name}
                </span>
              </div>
            ) : (
              <div className={cx("users__list--item")}>
                <span className={cx("list__item--text")}>
                  Chưa tạo thông tin
                </span>
              </div>
            )}
            {task.dateStart ? (
              <div className={cx("users__list--item")}>
                <span className={cx("list__item--text")}>
                  {new Date(task.dateStart).toLocaleDateString()}
                </span>
              </div>
            ) : (
              <div className={cx("users__list--item")}>
                <span className={cx("list__item--text")}>
                  Chưa tạo thông tin
                </span>
              </div>
            )}
            {task.dateEnd ? (
              <div className={cx("users__list--item")}>
                <span className={cx("list__item--text")}>
                  {new Date(task.dateEnd).toLocaleDateString()}
                </span>
              </div>
            ) : (
              <div className={cx("users__list--item")}>
                <span className={cx("list__item--text")}>
                  Chưa tạo thông tin
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListSearchTasks;

import classNames from "classnames/bind";
import style from "./SearchProject.module.scss";
import Search from "../../../components/Search/Search";
import { useSelector } from "react-redux";
const cx = classNames.bind(style);
const SearchProject = () => {
  const listSearch = useSelector((state) =>
    Object.values(state.project.searchProject?.searchValue)
  );
  return (
    <div className={cx("wrapper")}>
      <div className={cx("Search")}>
        <Search />
      </div>
      <div className={cx("users__list--content")}>
        {listSearch?.map((project, index) => (
          <div className={cx("users__list--inner")} key={index}>
            <div className={cx("users__list--item")}>
              <span className={cx("list__item--fullName")}>
                {project.projectName}
              </span>
            </div>
            <div className={cx("users__list--item")}>
              {project.manage !== null ? (
                <span className={cx("list__item--text")}>
                  {project.manage?.infor?.name}
                </span>
              ) : (
                <span className={cx("list__item--text")}>Chưa có quản lý</span>
              )}
            </div>
            <div className={cx("users__list--item")}>
              <span className={cx("list__item--text")}>
                {new Date(project.dateStart).toLocaleDateString()}
              </span>
            </div>
            <div className={cx("users__list--item")}>
              <span className={cx("list__item--text")}>
                {new Date(project.dateEnd).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchProject;

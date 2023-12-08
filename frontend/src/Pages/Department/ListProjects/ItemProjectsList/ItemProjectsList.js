import className from "classnames/bind";
import style from "./ItemProjectsList.module.scss";
import * as Unicons from "@iconscout/react-unicons";
import EditProjects from "../editProjects/editProjects";
import { useState } from "react";
import { getProject } from "../../../../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../../../createInstance";
import { getProjectSuccess } from "../../../../redux/projectSlice";
import { Link } from "react-router-dom";
const cx = className.bind(style);
export const ItemProjectNew = ({ departmentInfor }) => {
  const [edit, setEdit] = useState(false);
  const projectEdit = useSelector((state) => state.project.getProject?.project);
  const authUser = useSelector((state) => state.auth.login?.currentUser);
  const listTask = departmentInfor?.projects?.filter(
    (item) => item.status === 111
  );

  const dispatch = useDispatch();
  const accessToken = authUser?.accessToken;
  let axiosJWT = createAxios(authUser, dispatch, getProjectSuccess);
  const handleShowEditForm = (id) => {
    setEdit(true);
    getProject(accessToken, id, dispatch, axiosJWT);
  };
  const handlehideEditForm = () => {
    setEdit(false);
  };
  return (
    <div className={cx("listProjects__inner")}>
      {listTask?.map((item) => (
        <div className={cx("listProjects__lists")} key={item._id}>
          <div className={cx("listProjects__lists--item")}>
            <Link to={`${item._id}`}>
              <div className={cx("lists__item--heading")}>
                {item?.projectName}
              </div>
            </Link>
            {item.status === "Mới"}
            <div className={cx("lists__item--percent")}>0%</div>
            <div className={cx("lists__item--staffAvt")}>
              {item?.users.filter((item) => item).length > 0 ? (
                <>
                  {item?.users.map((item, index) => (
                    <div className={cx("item__staffAvt")} key={index}>
                      <img src={item.infor?.avatarUrl} alt="image_error" />
                    </div>
                  ))}
                </>
              ) : (
                <div className={cx("item__staffAvt--notStaff")}>
                  <p>Chưa có nhân viên cho dự án</p>
                </div>
              )}
            </div>
            <div className={cx("lists__item--deadline")}>
              {item?.dateEnd ? (
                <p className={cx("item__deadline--timeEnd")}>
                  {"Deadline: "}
                  {new Date(item?.dateEnd)?.toLocaleDateString("vn-CA")}
                </p>
              ) : (
                <p className={cx("item__deadline--timeEnd")}></p>
              )}
            </div>
            <div
              className={cx("lists__item--tools")}
              onClick={() => handleShowEditForm(item._id)}
            >
              <Unicons.UilEllipsisH />
            </div>
            {edit && (
              <EditProjects
                handlehideEditForm={handlehideEditForm}
                projectEdit={projectEdit}
                departmentInfor={departmentInfor}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
export const ItemProjectsDoing = ({ departmentInfor }) => {
  const [edit, setEdit] = useState(false);
  const authUser = useSelector((state) => state.auth.login?.currentUser);
  const projectEdit = useSelector((state) => state.project.getProject?.project);

  const listTask = departmentInfor?.projects?.filter(
    (item) => item.status === 222
  );
  const dispatch = useDispatch();
  const accessToken = authUser?.accessToken;
  let axiosJWT = createAxios(authUser, dispatch, getProjectSuccess);
  const handleShowEditForm = (id) => {
    setEdit(true);
    getProject(accessToken, id, dispatch, axiosJWT);
  };
  const handlehideEditForm = () => {
    setEdit(false);
  };
  return (
    <div className={cx("listProjects__inner")}>
      {listTask?.map((item) => (
        <div className={cx("listProjects__lists")} key={item._id}>
          <div className={cx("listProjects__lists--item")}>
            <Link to={`${item._id}`}>
              <div className={cx("lists__item--heading")}>
                {item?.projectName}
              </div>
            </Link>
            {item?.tasks?.filter((item) => item.status === 333).length ? (
              <div className={cx("lists__item--percent")}>
                {Math.floor(
                  (item?.tasks?.filter((item) => item.status === 333).length /
                    listTask?.tasks?.filter((item) => item).length) *
                    100
                )}
                %
              </div>
            ) : (
              <div className={cx("lists__item--percent")}>0%</div>
            )}
            <div className={cx("lists__item--staffAvt")}>
              {item?.users.filter((item) => item).length > 0 ? (
                <>
                  {item?.users.map((item) => (
                    <div className={cx("item__staffAvt")}>
                      <img src={item.infor?.avatarUrl} alt="image_error" />
                    </div>
                  ))}
                </>
              ) : (
                <div className={cx("item__staffAvt--notStaff")}>
                  <p>Chưa có nhân viên cho dự án</p>
                </div>
              )}
            </div>
            <div className={cx("lists__item--deadline")}>
              {item?.dateEnd ? (
                <p className={cx("item__deadline--timeEnd")}>
                  {"Deadline: "}
                  {new Date(item?.dateEnd)?.toLocaleDateString("vn-CA")}
                </p>
              ) : (
                <p className={cx("item__deadline--timeEnd")}></p>
              )}
            </div>
            <div
              className={cx("lists__item--tools")}
              onClick={() => handleShowEditForm(item._id)}
            >
              <Unicons.UilEllipsisH />
            </div>
            {edit && (
              <EditProjects
                handlehideEditForm={handlehideEditForm}
                projectEdit={projectEdit}
                departmentInfor={departmentInfor}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
export const ItemProjectsCompleted = ({ departmentInfor }) => {
  const [edit, setEdit] = useState(false);
  const authUser = useSelector((state) => state.auth.login?.currentUser);
  const projectEdit = useSelector((state) => state.project.getProject?.project);
  const listTask = departmentInfor?.projects?.filter(
    (item) => item.status === 333
  );
  const dispatch = useDispatch();
  const accessToken = authUser?.accessToken;
  let axiosJWT = createAxios(authUser, dispatch, getProjectSuccess);
  const handleShowEditForm = (id) => {
    setEdit(true);
    getProject(accessToken, id, dispatch, axiosJWT);
  };
  const handlehideEditForm = () => {
    setEdit(false);
  };
  return (
    <div className={cx("listProjects__inner")}>
      {listTask?.map((item) => (
        <div className={cx("listProjects__lists")} key={item._id}>
          <div className={cx("listProjects__lists--item")}>
            <Link to={`${item._id}`}>
              <div className={cx("lists__item--heading")}>
                {item?.projectName}
              </div>
            </Link>
            {item?.tasks?.filter((item) => item.status === 333).length ? (
              <div className={cx("lists__item--percent")}>
                {Math.floor(
                  (item?.tasks?.filter((item) => item.status === 333).length /
                    listTask?.tasks?.filter((item) => item).length) *
                    100
                )}
                %
              </div>
            ) : (
              <div className={cx("lists__item--percent")}>0%</div>
            )}
            <div className={cx("lists__item--staffAvt")}>
              {item?.users.filter((item) => item).length > 0 ? (
                <>
                  {item?.users.map((item) => (
                    <div className={cx("item__staffAvt")}>
                      <img src={item.infor?.avatarUrl} alt="image_error" />
                    </div>
                  ))}
                </>
              ) : (
                <div className={cx("item__staffAvt--notStaff")}>
                  <p>Chưa có nhân viên cho dự án</p>
                </div>
              )}
            </div>
            <div className={cx("lists__item--deadline")}>
              {item?.dateEnd ? (
                <p className={cx("item__deadline--timeEnd")}>
                  {"Deadline: "}
                  {new Date(item?.dateEnd)?.toLocaleDateString("vn-CA")}
                </p>
              ) : (
                <p className={cx("item__deadline--timeEnd")}></p>
              )}
            </div>
            <div
              className={cx("lists__item--tools")}
              onClick={() => handleShowEditForm(item._id)}
            >
              <Unicons.UilEllipsisH />
            </div>
            {edit && (
              <EditProjects
                handlehideEditForm={handlehideEditForm}
                projectEdit={projectEdit}
                departmentInfor={departmentInfor}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
export const ItemProjectsNotCompleted = ({ departmentInfor }) => {
  const [edit, setEdit] = useState(false);
  const authUser = useSelector((state) => state.auth.login?.currentUser);
  const projectEdit = useSelector((state) => state.project.getProject?.project);
  const listTask = departmentInfor?.projects?.filter(
    (item) => item.status === 444
  );
  const dispatch = useDispatch();
  const accessToken = authUser?.accessToken;
  let axiosJWT = createAxios(authUser, dispatch, getProjectSuccess);
  const handleShowEditForm = (id) => {
    setEdit(true);
    getProject(accessToken, id, dispatch, axiosJWT);
  };
  const handlehideEditForm = () => {
    setEdit(false);
  };
  return (
    <div className={cx("listProjects__inner")}>
      {listTask?.map((item) => (
        <div className={cx("listProjects__lists")} key={item._id}>
          <div className={cx("listProjects__lists--item")}>
            <Link to={`${item._id}`}>
              <div className={cx("lists__item--heading")}>
                {item?.projectName}
              </div>
            </Link>
            {item.status === 444}
            <div className={cx("lists__item--percent")}>0%</div>
            <div className={cx("lists__item--staffAvt")}>
              {item?.users.filter((item) => item).length > 0 ? (
                <>
                  {item?.users.map((item) => (
                    <div className={cx("item__staffAvt")}>
                      <img src={item.infor?.avatarUrl} alt="image_error" />
                    </div>
                  ))}
                </>
              ) : (
                <div className={cx("item__staffAvt--notStaff")}>
                  <p>Chưa có nhân viên cho dự án</p>
                </div>
              )}
            </div>
            <div className={cx("lists__item--deadline")}>
              {item?.dateEnd ? (
                <p className={cx("item__deadline--timeEnd")}>
                  {"Deadline: "}
                  {new Date(item?.dateEnd)?.toLocaleDateString("vn-CA")}
                </p>
              ) : (
                <p className={cx("item__deadline--timeEnd")}></p>
              )}
            </div>
            <div
              className={cx("lists__item--tools")}
              onClick={() => handleShowEditForm(item._id)}
            >
              <Unicons.UilEllipsisH />
            </div>
            {edit && (
              <EditProjects
                handlehideEditForm={handlehideEditForm}
                projectEdit={projectEdit}
                departmentInfor={departmentInfor}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

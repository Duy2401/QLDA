import className from "classnames/bind";
import style from "./editProfile.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { createAxios } from "../../../createInstance";
import { getCurrentUser, updateCurrentUser } from "../../../redux/apiRequest";
import { getCurrentUserSuccess } from "../../../redux/userSlice";
const cx = className.bind(style);
function EditProfile() {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const userInfo = useSelector((state) => state.users.users?.currentUser);
  const id = user?._id;
  const dispatch = useDispatch();
  const accessToken = user?.accessToken;
  let axiosJWT = createAxios(user, dispatch, getCurrentUserSuccess);
  const [fullname, setFullName] = useState(() => {
    return (userInfo?.infor?.name && userInfo?.infor?.name) || "";
  });
  const [email, setEmail] = useState(() => {
    return (userInfo?.email && userInfo?.email) || "";
  });
  const [gender, setGender] = useState(() => {
    return (userInfo?.infor?.gender && userInfo?.infor?.gender) || "";
  });
  const [dateOfBirth, setDateOfBirth] = useState(() => {
    if (userInfo?.infor?.dateOfBirth) {
      const dateFormat = new Date(userInfo?.infor?.dateOfBirth);
      return dateFormat.toLocaleDateString("en-CA");
    }
    return "";
  });
  const [numberPhone, setNumberPhone] = useState(() => {
    return (userInfo?.infor?.numberPhone && userInfo?.infor?.numberPhone) || "";
  });
  const [address, setAddress] = useState(() => {
    return (userInfo?.infor?.address && userInfo?.infor?.address) || "";
  });
  const [profileURL, setProfileURl] = useState("");
  const handleUpdateProfile = (e) => {
    e.preventDefault();
    if (profileURL) {
      const updatedUser = {
        email: email,
        infor: {
          name: fullname,
          gender: gender,
          dateOfBirth: dateOfBirth,
          numberPhone: numberPhone,
          address: address,
        },
        avatarUrl: profileURL,
      };
      updateCurrentUser(updatedUser, id, dispatch, accessToken, axiosJWT);
    } else if (!profileURL) {
      const updatedUser = {
        email: email,
        infor: {
          name: fullname,
          gender: gender,
          dateOfBirth: dateOfBirth,
          numberPhone: numberPhone,
          address: address,
        },
      };
      updateCurrentUser(updatedUser, id, dispatch, accessToken, axiosJWT);
    }
  };
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setProfileURl(reader.result);
    };
  };
  useEffect(() => {
    if (accessToken) {
      getCurrentUser(accessToken, id, dispatch, axiosJWT);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={cx("wrapper")}>
      <h1 className={cx("editProfile__heading")}>
        Chỉnh Sửa Thông Tin Cá Nhân
      </h1>
      <form className={cx("editProfile")} onSubmit={handleUpdateProfile}>
        <div className={cx("editProfile__infor")}>
          <div className={cx("avt__change--file")}>
            {userInfo?.avatarUrl ? (
              <img
                alt="fileError"
                src={userInfo?.avatarUrl}
                className={cx("avt__change--img")}
              />
            ) : (
              <img
                alt="fileError"
                className={cx("avt__change--img")}
                src="https://static.vecteezy.com/system/resources/previews/002/275/847/original/male-avatar-profile-icon-of-smiling-caucasian-man-vector.jpg"
              />
            )}
          </div>
          <div className={cx("avt__change--input")}>
            {userInfo?.infor?.name === null ? (
              <span>NO NAME</span>
            ) : (
              <span>{userInfo?.infor?.name}</span>
            )}
            <input
              type="file"
              id="file"
              name="image"
              className={cx("input__change--file")}
              onChange={handleFileInputChange}
            />
            <label htmlFor="file" className={cx("input__change--text")}>
              Choose a file
            </label>
          </div>
        </div>
        <div className={cx("editProfile__infor")}>
          <label className={cx("infor__change--title")}>Họ và tên</label>
          <div className={cx("infor__change--input")}>
            <input
              type="text"
              placeholder="Please enter your name"
              value={fullname}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
        </div>
        <div className={cx("editProfile__infor")}>
          <label className={cx("infor__change--title")}>Email</label>
          <div className={cx("infor__change--input")}>
            <input
              type="text"
              value={email}
              placeholder="Please enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className={cx("editProfile__infor")}>
          <label className={cx("infor__change--title")}>Giới Tính</label>
          <div className={cx("infor__change--input")}>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              placeholder="Please enter your gender"
            >
              <option value={null}>Tùy chỉnh</option>
              <option>Nam</option>
              <option>Nữ</option>
            </select>
          </div>
        </div>
        <div className={cx("editProfile__infor")}>
          <label className={cx("infor__change--title")}>Ngày Sinh</label>
          <div className={cx("infor__change--input")}>
            <input
              type="date"
              value={dateOfBirth}
              placeholder="Please enter your dateOfBirth"
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
          </div>
        </div>
        <div className={cx("editProfile__infor")}>
          <label className={cx("infor__change--title")}>Số điện thoại</label>
          <div className={cx("infor__change--input")}>
            <input
              type="text"
              value={numberPhone}
              placeholder="Please enter your numberPhone"
              onChange={(e) => setNumberPhone(e.target.value)}
            />
          </div>
        </div>
        <div className={cx("editProfile__infor")}>
          <label className={cx("infor__change--title")}>Địa chỉ</label>
          <div className={cx("infor__change--input")}>
            <input
              type="text"
              value={address}
              placeholder="Please enter your address"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>
        <div className={cx("editProfile__btn")}>
          <button className={cx("editProfile__btn--cancel")} type="reset">
            Hủy
          </button>
          <button className={cx("editProfile__btn--save")}>Xác nhận</button>
        </div>
      </form>
    </div>
  );
}
export default EditProfile;

import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { auth, getData } from "@/services/fireBase";
import { signOut } from "firebase/auth";
import style from "./profilePage.module.scss";

export default function ProfilePage() {
  const [userInfo, setUserInfo] = useState(null);
  console.log(userInfo);
  useEffect(() => {
    const uid = auth.currentUser.uid;
    // console.log(uid);
    getData(`user/${uid}`).then((data) => setUserInfo(data));
  }, []);
  const navigate = useNavigate();
  const name = auth.currentUser.displayName;
  // const userSignOut = () => {
  //   signOut(auth)
  //     .then(() => {
  //       setUserInfo(null);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };
  const userSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Ошибка выхода:", error);
    }
  };
  return (
    <div className={style["profile-inner"]}>
      <div className={style["profile-top"]}>
        <NavLink to="/menu">
          <div className={style["profile-back"]}></div>
        </NavLink>
        <div className={style["profile-title"]}>Profile</div>
      </div>
      <div className={style["profile-wrapper"]}>
        <div className={style["profile-item"]}>
          <div className={style["profile-img"]}>
            <div
              className={`${style["profile-icon"]} ${style["icon-name"]}`}
            ></div>
          </div>
          <div>
            <div className={style["profile-subtitle"]}>Name: </div>
            <div className={style["profile-text"]}>{name}</div>
          </div>
        </div>
        <div className={style["profile-item"]}>
          <div className={style["profile-img"]}>
            <div
              className={`${style["profile-icon"]} ${style["icon-email"]}`}
            ></div>
          </div>
          <div>
            <div className={style["profile-subtitle"]}>Email: </div>
            <div className={style["profile-text"]}>{userInfo?.email}</div>
          </div>
        </div>
        <div className={style["profile-item"]}>
          <div className={style["profile-img"]}>
            <div
              className={`${style["profile-icon"]} ${style["icon-phone"]}`}
            ></div>
          </div>
          <div>
            <div className={style["profile-subtitle"]}>Phone: </div>
            <div className={style["profile-text"]}>{userInfo?.phone}</div>
          </div>
        </div>
      </div>
      <div className={style["profile-bottom"]}>
        <div
          onClick={() => {
            userSignOut();
            navigate("/");
          }}
          className={style["profile-button"]}
        >
          Sign out
        </div>
      </div>
    </div>
  );
}

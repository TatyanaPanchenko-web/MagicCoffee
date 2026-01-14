import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { auth, getDataFromBD, editUserDataBase } from "@/services/fireBase";
import { signOut } from "firebase/auth";
import style from "./profilePage.module.scss";

export default function ProfilePage() {
  const user = auth.currentUser;
  const uid = user?.uid;
  const [userInfo, setUserInfo] = useState(null);
  const [errorEdit, setErrorEdit] = useState(false);
  const [isEditing, setIsEditing] = useState({
    name: false,
    email: false,
    phone: false,
  });

  useEffect(() => {
    if (!uid) return;
    getDataFromBD(`user/${uid}`).then((data) => setUserInfo(data));
  }, [uid]);

  const navigate = useNavigate();

  const changeUserInfo = async (place, changeInfo) => {
    if (!uid) return;
    await editUserDataBase(place, changeInfo, uid);

    const data = await getDataFromBD(`user/${uid}`);
    setUserInfo(data);

    if (place === "name") {
      await updateProfile(user, {
        displayName: changeInfo,
      });
    }
  };

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

          <div
            className={`${style["profile-field"]} ${
              isEditing.name ? style["edit-field"] : ""
            }`}
          >
            {isEditing.name ? (
              <>
                <input
                  name="name"
                  type="text"
                  value={userInfo?.name}
                  onChange={(e) => {
                    setErrorEdit(!/^[A-Za-z]+$/i.test(e.target.value));
                    setUserInfo((prev) => ({ ...prev, name: e.target.value }));
                  }}
                  className={style["profile-edit-text"]}
                />

                <div
                  onClick={() => {
                    if (!errorEdit) {
                      setIsEditing((prev) => ({ ...prev, name: false }));
                      changeUserInfo("name", userInfo.name);
                    }
                  }}
                  className={style["profile-save"]}
                ></div>
              </>
            ) : (
              <>
                <div className={style["profile-text-group"]}>
                  <div className={style["profile-subtitle"]}>Name: </div>
                  <div className={style["profile-text"]}>{userInfo?.name}</div>
                </div>
                <div
                  onClick={() =>
                    setIsEditing({
                      name: true,
                      email: false,
                      phone: false,
                    })
                  }
                  className={style["profile-edit-icon"]}
                ></div>
              </>
            )}
          </div>
        </div>
        <div className={style["profile-item"]}>
          <div className={style["profile-img"]}>
            <div
              className={`${style["profile-icon"]} ${style["icon-email"]}`}
            ></div>
          </div>
          <div
            className={`${style["profile-field"]} ${
              isEditing.email ? style["edit-field"] : ""
            }`}
          >
            {isEditing.email ? (
              <>
                <input
                  name="email"
                  type="email"
                  value={userInfo?.email}
                  onChange={(e) => {
                    setErrorEdit(
                      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value)
                    );

                    setUserInfo((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }));
                  }}
                  className={style["profile-edit-text"]}
                />

                <div
                  onClick={() => {
                    if (!errorEdit) {
                      setIsEditing((prev) => ({ ...prev, email: false }));
                      changeUserInfo("email", userInfo.email);
                    }
                  }}
                  className={style["profile-save"]}
                ></div>
              </>
            ) : (
              <>
                <div className={style["profile-text-group"]}>
                  <div className={style["profile-subtitle"]}>Email: </div>
                  <div className={style["profile-text"]}>{userInfo?.email}</div>
                </div>
                <div
                  onClick={() =>
                    setIsEditing({
                      name: false,
                      email: true,
                      phone: false,
                    })
                  }
                  className={style["profile-edit-icon"]}
                ></div>
              </>
            )}
          </div>
        </div>

        <div className={style["profile-item"]}>
          <div className={style["profile-img"]}>
            <div
              className={`${style["profile-icon"]} ${style["icon-phone"]}`}
            ></div>
          </div>
          <div
            className={`${style["profile-field"]} ${
              isEditing.phone ? style["edit-field"] : ""
            }`}
          >
            {isEditing.phone ? (
              <>
                <input
                  name="phone"
                  type="tel"
                  value={userInfo?.phone}
                  onChange={(e) => {
                    setErrorEdit(
                      !/^\+?375[\s-]?\(?(25|29|33|44)\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/.test(
                        e.target.value
                      )
                    );
                    setUserInfo((prev) => ({
                      ...prev,
                      phone: e.target.value,
                    }));
                  }}
                  className={style["profile-edit-text"]}
                />

                <div
                  onClick={() => {
                    if (!errorEdit) {
                      setIsEditing((prev) => ({ ...prev, phone: false }));
                      changeUserInfo("phone", userInfo.phone);
                    }
                  }}
                  className={style["profile-save"]}
                ></div>
              </>
            ) : (
              <>
                <div className={style["profile-text-group"]}>
                  <div className={style["profile-subtitle"]}>Phone: </div>
                  <div className={style["profile-text"]}>{userInfo?.phone}</div>
                </div>
                <div
                  onClick={() =>
                    setIsEditing({
                      name: false,
                      email: false,
                      phone: true,
                    })
                  }
                  className={style["profile-edit-icon"]}
                ></div>
              </>
            )}
          </div>
        </div>
        {errorEdit ? (
          <div className={style["error-field"]}>Field contain invalid data</div>
        ) : (
          ""
        )}
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

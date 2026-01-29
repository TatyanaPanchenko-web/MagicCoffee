import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { updateProfile, updatePassword } from "firebase/auth";
import { auth, getDataFromBD, editUserDataBase } from "@/services/fireBase";
import { signOut } from "firebase/auth";
import { useAppSelector } from "@/store/index";
import { UserType } from "@/types";
import Footer from "@/Components/Footer/Footer";
import style from "./profilePage.module.scss";
import Preloader from "../Preloader/Preloader";

type UserField = keyof UserType;

export default function ProfilePage() {
  const user = auth.currentUser;

  const storeUser = useAppSelector((state) => state.user.userInfo);
  const [userInfo, setUserInfo] = useState<UserType | null>(null);
  const [errorEdit, setErrorEdit] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [isEditing, setIsEditing] = useState({
    name: false,
    password: false,
    email: false,
    phone: false,
  });

  useEffect(() => {
    if (storeUser) {
      getDataFromBD<UserType>(`user/${storeUser.uid}`)
        .then((data) => setUserInfo(data))
        .catch((error) => console.error(error));
    }
  }, [storeUser]);

  const navigate = useNavigate();

  const changeUserInfo = async (place: string, changeInfo: string) => {
    if (!user || !storeUser) return;

    try {
      await editUserDataBase(place, changeInfo, storeUser.uid);

      const data = await getDataFromBD<UserType>(`user/${storeUser.uid}`);
      setUserInfo(data);

      if (place === "name") {
        await updateProfile(user, { displayName: changeInfo });
      } else if (place === "password") {
        await updatePassword(user, changeInfo);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Ошибка при обновлении пользователя:", error);
      } else {
        console.error("Unknown error", error);
      }
    }
  };

  const saveNewValue = (target: UserField) => {
    if (!userInfo || errorEdit) return;
    setIsEditing((prev) => ({ ...prev, [target]: false }));
    changeUserInfo(target, userInfo[target]);
  };

  const updateFieldValue = (target: string, value: string) => {
    setUserInfo((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        [target]: value,
      };
    });
  };

  const changeEditFlag = (target: string) => {
    setIsEditing({
      name: false,
      password: false,
      email: false,
      phone: false,
      [target]: true,
    });
  };

  const userSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Ошибка выхода:", error);
      } else {
        console.error("Unknown error", error);
      }
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
                    updateFieldValue("name", e.target.value);
                  }}
                  className={style["profile-edit-text"]}
                />

                <div
                  onClick={() => {
                    saveNewValue("name");
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
                  onClick={() => changeEditFlag("name")}
                  className={style["profile-edit-icon"]}
                ></div>
              </>
            )}
          </div>
        </div>

        <div className={style["profile-item"]}>
          <div className={style["profile-img"]}>
            <div
              className={`${style["profile-icon"]} ${style["icon-password"]}`}
            ></div>
          </div>

          <div
            className={`${style["profile-field"]} ${
              isEditing.password ? style["edit-field"] : ""
            }`}
          >
            {isEditing.password ? (
              <>
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={userInfo?.password}
                  onChange={(e) => {
                    setErrorEdit(!/^.{6,}$/.test(e.target.value));
                    updateFieldValue("password", e.target.value);
                  }}
                  className={style["profile-edit-text"]}
                />
                <div
                  onClick={() => {
                    setShowPassword((prev) => !prev);
                  }}
                  className={
                    showPassword
                      ? `${style["password-show"]} ${style["show-true"]}`
                      : `${style["password-show"]} ${style["show-false"]}
            `
                  }
                ></div>
                <div
                  onClick={() => {
                    saveNewValue("password");
                  }}
                  className={style["profile-save"]}
                ></div>
              </>
            ) : (
              <>
                <div className={style["profile-text-group"]}>
                  <div className={style["profile-subtitle"]}>Password: </div>
                  <input
                    name="viewPassword"
                    type="password"
                    value={userInfo?.password}
                    className={style["profile-text"]}
                  />
                </div>
                <div
                  onClick={() => changeEditFlag("password")}
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
            <div className={style["profile-text-group"]}>
              <div className={style["profile-subtitle"]}>Email: </div>
              <div className={style["profile-text"]}>{userInfo?.email}</div>
            </div>
            <div
              onClick={() => navigate("/verification")}
              className={style["profile-edit-icon"]}
            ></div>
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
                        e.target.value,
                      ),
                    );
                    updateFieldValue("phone", e.target.value);
                  }}
                  className={style["profile-edit-text"]}
                />

                <div
                  onClick={() => {
                    saveNewValue("phone");
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
                  onClick={() => changeEditFlag("phone")}
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

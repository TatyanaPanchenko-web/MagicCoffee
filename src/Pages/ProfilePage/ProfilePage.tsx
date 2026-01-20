import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  EmailAuthProvider,
  updateProfile,
  reauthenticateWithCredential,
  verifyBeforeUpdateEmail,
} from "firebase/auth";
import { auth, getDataFromBD, editUserDataBase } from "@/services/fireBase";
import { signOut } from "firebase/auth";
import style from "./profilePage.module.scss";
import { UserType } from "@/types";

type UserField = keyof UserType;

export default function ProfilePage() {
  const user = auth.currentUser;
  const uid = user?.uid;

  const [userInfo, setUserInfo] = useState<UserType | null>(null);
  const [errorEdit, setErrorEdit] = useState(false);
  const [isEditing, setIsEditing] = useState({
    name: false,
    email: false,
    phone: false,
  });

  useEffect(() => {
    if (!uid) return;
    getDataFromBD<UserType>(`user/${uid}`)
      .then((data) => setUserInfo(data))
      .catch((error) => console.error(error));
  }, [uid]);

  const navigate = useNavigate();

  const changeUserInfo = async (place: string, changeInfo: string) => {
    if (!uid) return;
    await editUserDataBase(place, changeInfo, uid);

    const data = await getDataFromBD<UserType>(`user/${uid}`);
    setUserInfo(data);

    if (place === "name") {
      await updateProfile(user, {
        displayName: changeInfo,
      });
    }
    if (place === "email") {
      if (!user.email) {
        throw new Error("User email is missing");
      }

      const credential = EmailAuthProvider.credential(user.email, "147147");

      await reauthenticateWithCredential(user, credential);
      await verifyBeforeUpdateEmail(user, changeInfo);
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
      email: false,
      phone: false,
      [target]: true,
    });
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
                      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value),
                    );
                    updateFieldValue("email", e.target.value);
                  }}
                  className={style["profile-edit-text"]}
                />

                <div
                  onClick={() => {
                    saveNewValue("email");
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
                  onClick={() => changeEditFlag("email")}
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

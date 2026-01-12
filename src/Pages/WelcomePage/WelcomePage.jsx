import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/services/fireBase";
import { NavLink } from "react-router-dom";
import style from "./welcomePage.module.scss";

export default function WelcomePage() {
  const [userAuth, setUserAuth] = useState(false);

  useEffect(() => {
    const getUser = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(auth);
        setUserAuth(true);
        // const getUserFromBD: Promise<UserInfoType | null> = getData(
        //   `users/${user.uid}`
        // );
        // getUserFromBD.then((result) => {
        //   setUserInfo(result);
        // });
      } else {
        setUserAuth(false);
      }
    });
    return () => {
      getUser();
    };
  }, []);
console.log(userAuth);
  return (
    <div className={style["welcomepage"]}>
      <div className={style["welcomepage-logo"]}></div>
      <div className={style["welcomepage-title"]}>
        Feel yourself like a barista!
      </div>
      <div className={style["welcomepage-subtitle"]}>Magic coffee on order</div>
      <div className={style["welcomepage-button"]}>
        {userAuth ? (
          <NavLink to="/menu">
            <div className={style["welcomepage-btn"]}></div>
          </NavLink>
        ) : (
          <NavLink to="/auth">
            <div className={style["welcomepage-btn"]}></div>
          </NavLink>
        )}
      </div>
    </div>
  );
}

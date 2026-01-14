import { auth } from "@/services/fireBase";
import { NavLink } from "react-router-dom";
import style from "./header.module.scss";

export default function Header() {

  const name = auth.currentUser?.displayName;

  return (
    <header>
      <div className={style["header-container"]}>
        <div className={style["header-greeting"]}>
          <p>Welcome, {name}!</p>
          <p className={style["header-name"]}>{}</p>
        </div>
        <div className={style["header-icons"]}>
          <NavLink to="/profile">
            <div className={style["header-profile"]}></div>
          </NavLink>
        </div>
      </div>
    </header>
  );
}

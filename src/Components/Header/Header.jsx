import { useEffect, useState } from "react";
import { auth } from "@/services/fireBase";
import { NavLink } from "react-router-dom";
import style from "./header.module.scss";

export default function Header({ currentUsers }) {
  // const [name, setName] = useState([]);
  //console.log(currentUsers);
  const name = auth.currentUser?.displayName;
  // //console.log(Object?.keys(currentUsers));
  // useEffect(() => {
  //   if (typeof currentUsers !== "undefined") {
  //     setName(Object?.values(currentUsers));
  //   }
  // }, []);

  //console.log(name);
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

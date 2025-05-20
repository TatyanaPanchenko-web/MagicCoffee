import React from "react";
import { NavLink } from "react-router-dom";
import style from "./header.module.scss";

export default function Header() {
  return (
    <header>
      <div className={style["header-container"]}>
        <div className={style["header-greeting"]}>
          <p>Welcome!</p>
          <p className={style["header-name"]}>{}</p>
        </div>
        <div className={style["header-icons"]}>
          <NavLink to="/cart">
            <div className={style["header-cart"]}></div>
          </NavLink>
        </div>
      </div>
    </header>
  );
}

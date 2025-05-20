import React from "react";
import { NavLink } from "react-router-dom";
import style from "./footer.module.scss";

export default function Footer() {
  return (
    <footer className={style["footer"]}>
      <div className={style["footer-inner"]}>
        <div className={style["footer-icons"]}>
          <NavLink to="/">
            <div
              className={`${style["footer-icon"]} ${style["icon-home"]}`}
            ></div>
          </NavLink>

          <div
            className={`${style["footer-icon"]} ${style["icon-gift"]}`}
          ></div>
          <div
            className={`${style["footer-icon"]} ${style["icon-about"]}`}
          ></div>
        </div>
      </div>
    </footer>
  );
}

import React from "react";
import { NavLink } from "react-router-dom";
import style from "./welcomePage.module.scss";

export default function WelcomePage({ auth }) {
  return (
    <div className={style["welcomepage"]}>
      <div className={style["welcomepage-logo"]}></div>
      <div className={style["welcomepage-title"]}>
        Feel yourself like a barista!
      </div>
      <div className={style["welcomepage-subtitle"]}>Magic coffee on order</div>
      <div className={style["welcomepage-button"]}>
        {auth ? (
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

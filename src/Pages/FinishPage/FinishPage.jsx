import React from "react";
import { NavLink } from "react-router-dom";
import style from "./finishPage.module.scss";

export default function FinishPage() {
  return (
    <div className={style["finish-wrapper"]}>
      <div className={style["finish-top"]}>
        <NavLink to="/menu">
          <div className={style["finish-back"]}></div>
        </NavLink>
      </div>
      <div className={style["finish-title"]}>Ordered</div>
      <div className={style["finish-subtitle"]}>
        Your order has been successfully placed.
      </div>
    </div>
  );
}

import React from "react";
import style from "./preloader.module.scss";

export default function Preloader() {
  return (
    <div className={style["startpage"]}>
      <div className={style["startpage-logo"]}></div>
    </div>
  );
}

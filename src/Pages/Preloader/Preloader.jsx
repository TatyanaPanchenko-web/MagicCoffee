import style from "./preloader.module.scss";

export default function Preloader({ show }) {
  if (!show) return null;
  return (
    <div className={style["startpage"]}>
      <div className={style["startpage-logo"]}></div>
    </div>
  );
}

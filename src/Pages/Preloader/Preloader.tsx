import style from "./preloader.module.scss";

type PreloaderPropsType = {
  show: boolean;
};
export default function Preloader({ show }: PreloaderPropsType) {
  if (!show) return null;
  return (
    <div className={style["startpage"]}>
      <div className={style["startpage-logo"]}></div>
    </div>
  );
}

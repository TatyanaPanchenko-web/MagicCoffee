import { useAppSelector } from "@/store";
import style from "./preloader.module.scss";

export default function Preloader() {
    const isLoading = useAppSelector((state) => state.preloader);
  if (!isLoading) return null;
  return (
    <div className={style["startpage"]}>
      <div className={style["startpage-logo"]}></div>
    </div>
  );
}

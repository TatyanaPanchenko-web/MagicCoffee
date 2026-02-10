import { NavLink } from "react-router-dom";
import { useAppSelector } from "@/store/index";
import style from "./welcomePage.module.scss";

export default function WelcomePage() {
  const storeUser = useAppSelector((state) => state.user.userInfo);
  return (
    <div className={style["welcomepage"]}>
      <div className={style["welcomepage-logo"]}></div>
      <div className={style["welcomepage-title"]}>
        Feel yourself like a barista!
      </div>
      <div className={style["welcomepage-subtitle"]}>Magic coffee on order</div>
      <div className={style["welcomepage-button"]}>
        {storeUser ? (
          <NavLink to="/menu">
            <div className={style["welcomepage-btn"]}></div>
            <span className={"text-hidden"}>Continue</span>
          </NavLink>
        ) : (
          <NavLink to="/auth">
            <div className={style["welcomepage-btn"]}></div>
            <span className={"text-hidden"}>Continue</span>
          </NavLink>
        )}
      </div>
    </div>
  );
}

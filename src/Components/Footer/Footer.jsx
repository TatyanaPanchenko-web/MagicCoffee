import { NavLink } from "react-router-dom";
import style from "./footer.module.scss";

export default function Footer({ bg }) {
  return (
    <footer
      className={`${style["footer"]} ${
        bg === "light" ? style["footer-light"] : style["footer-dark"]
      }`}
    >
      <div className={style["footer-inner"]}>
        <div className={style["footer-icons"]}>
          <NavLink to="/menu">
            <div
              className={`${style["footer-icon"]} ${style["icon-home"]}`}
            ></div>
          </NavLink>

          <div
            className={`${style["footer-icon"]} ${style["icon-gift"]}`}
          ></div>

          <NavLink to="/cart">
            <div
              className={`${style["footer-icon"]} ${style["icon-cart"]}`}
            ></div>
          </NavLink>
        </div>
      </div>
    </footer>
  );
}

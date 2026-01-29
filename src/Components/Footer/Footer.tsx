import { useState } from "react";
import { NavLink } from "react-router-dom";
import IconMenu from "./IconMenu";
import IconList from "./IconList";
import IconCart from "./IconCart";
import style from "./footer.module.scss";

type FooterProps = {
  bg?: "light" | "dark";
  activeItem?: "menu" | "orders" | "cart";
};
export default function Footer({ bg, activeItem }: FooterProps) {
  const [isActiveItem, setIsActiveItem] = useState({
    menu: activeItem === "menu",
    orders: activeItem === "orders",
    cart: activeItem === "cart",
  });

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
              onClick={() => {
                setIsActiveItem(() => ({
                  menu: true,
                  orders: false,
                  cart: false,
                }));
              }}
            >
              <IconMenu isActiveItem={isActiveItem.menu} />
            </div>
          </NavLink>
          <NavLink to="/list">
            <IconList isActiveItem={isActiveItem.orders} />
            <div
              onClick={() => {
                setIsActiveItem(() => ({
                  menu: false,
                  orders: true,
                  cart: false,
                }));
              }}
            ></div>
          </NavLink>

          <NavLink to="/cart">
            <div
              onClick={() => {
                setIsActiveItem(() => ({
                  menu: false,
                  orders: false,
                  cart: true,
                }));
              }}
            >
              <IconCart isActiveItem={isActiveItem.cart} />
            </div>
          </NavLink>
        </div>
      </div>
    </footer>
  );
}

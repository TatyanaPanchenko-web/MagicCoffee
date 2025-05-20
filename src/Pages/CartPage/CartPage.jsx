import React from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addOrder } from "../../store/slice/OrderSlice";
import { totalPrice } from "../../common/cartFunction";
import CartItem from "../../Components/CartItem/CartItem";
import style from "./cartPage.module.scss";

export default function OrderPage() {
  const getCartItems = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className={style["cart-inner"]}>
      <div className={style["cart-top"]}>
        <NavLink to="/menu">
          <div className={style["cart-back"]}></div>
        </NavLink>
        <div className={style["cart-title"]}>My order</div>
      </div>
      <div className={style["cart-wrapper"]}>
        {getCartItems.map((item, index) => {
          return <CartItem key={index} item={item} />;
        })}
      </div>
      <div className={style["cart-bottom"]}>
        <div className={style["cart-total-price"]}>
          <div className={style["cart-total-price-title"]}>Total Price</div>
          <div className={style["cart-total-price-sum"]}>
            {totalPrice(getCartItems)} BYN
          </div>
        </div>
        <div
          onClick={() => {
            dispatch(addOrder(getCartItems));
            navigate("/finish");
          }}
          className={style["cart-button"]}
        >
          Order now
        </div>
      </div>
    </div>
  );
}

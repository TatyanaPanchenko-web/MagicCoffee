import { NavLink, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/store/index";
import { deleteAllCart } from "@/store/slice/CartSlice";
import { totalPrice } from "@/common/cartFunction";
import CartItem from "@/Components/CartItem/CartItem";
import Footer from "@/Components/Footer/Footer";
import { setOrderDataBase } from "@/services/fireBase";

import style from "./cartPage.module.scss";

export default function OrderPage() {
  const uid = useAppSelector((state) => state.user.userInfo?.uid);
  const getCartItems = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <>
      <div className={style["cart-inner"]}>
        <div className={style["cart-top"]}>
          <NavLink to="/menu">
            <div className={style["cart-back"]}></div>
          </NavLink>
          <div className={style["cart-title"]}>My order</div>
        </div>
        <div className={style["cart-wrapper"]}>
          {getCartItems.map((item, index: number) => {
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
          <button
            disabled={getCartItems.length === 0 ? true : false}
            onClick={() => {
              if (getCartItems.length === 0) return;
              if (uid) {
                setOrderDataBase(getCartItems, uid);
              }
              // dispatch(addOrder(getCartItems));
              dispatch(deleteAllCart());
              navigate("/finish");
            }}
            className={style["cart-button"]}
          >
            Order now
          </button>
        </div>
      </div>
      <Footer activeItem={"cart"} />
    </>
  );
}

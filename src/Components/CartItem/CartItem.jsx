import style from "./cartItem.module.scss";
import { useDispatch } from "react-redux";
import { deleteItemCart } from "@/store/slice/CartSlice";

export default function CartItem({ item }) {
  const dispatch = useDispatch();
  return (
    <div className={style["cart-item"]}>
      <div className={style["cart-wrapper"]}>
        <div className={style["cart-img"]}>
          <img src={`./img/coffee/coffee_${item.name}.png`} alt={item.name} />
        </div>
        <div className={style["cart-info"]}>
          <div className={style["cart-name"]}>{item.name}</div>
          <div>{item.volume} ml</div>
          <div>{item.ristretto === "Two" ? "Ristretto" : ""}</div>
          <div className={style["cart-count"]}>x {item.count}</div>
        </div>
        <div className={style["cart-price"]}>
          <div> BYN</div>
          {item.price * item.count},00
        </div>
      </div>
      <div
        onClick={() => {
          dispatch(deleteItemCart(item));
        }}
        className={style["cart-delete"]}
      >
        <div className={style["cart-delete-img"]}> </div>
      </div>
    </div>
  );
}

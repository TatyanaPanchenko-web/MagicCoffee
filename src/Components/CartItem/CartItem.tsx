import style from "./cartItem.module.scss";
import { useAppDispatch } from "@/store/index";
import { deleteItemCart } from "@/store/slice/CartSlice";
import { CartType } from "@/types";

type CartItemPropsType = {
  item:CartType
}
export default function CartItem({ item }:CartItemPropsType) {
 
  const dispatch = useAppDispatch();
  return (
    <div className={style["cart-item"]}>
      <div className={style["cart-wrapper"]}>
        <div className={style["cart-img"]}>
          <img src={`/img/coffee/coffee_${item.name}.png`} alt={item.name} />
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

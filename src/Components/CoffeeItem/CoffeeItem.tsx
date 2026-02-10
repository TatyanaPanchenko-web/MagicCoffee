import { useAppSelector } from "@/store/index";
import { useNavigate } from "react-router-dom";
import style from "./coffeeItem.module.scss";

export default function CoffeeItem() {
  const navigate = useNavigate();
  const getCoffeeStore = useAppSelector((state) => state.coffeeList);

  return (
    <>
      {getCoffeeStore.map((item, index) => {
        return (
          <button
            className={style["coffee-item"]}
            key={index}
            onClick={() => {
              localStorage.setItem("currentItem", JSON.stringify(item));
              navigate(`/order`);
            }}
          >
            <div className={style["coffee-img"]}>
              <img src={`/img/coffee/coffee_${item.name}.png`} alt="" />
            </div>
            <div className={style["coffee-name"]}>{item.name}</div>
          </button>
        );
      })}
    </>
  );
}

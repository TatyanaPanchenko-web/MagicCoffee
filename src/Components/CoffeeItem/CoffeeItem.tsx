
import {  useAppSelector, useAppDispatch } from "@/store/index";
import { useNavigate } from "react-router-dom";
import { setCurrentItem } from "@/store/slice/CurrentItemSlice";
import style from "./coffeeItem.module.scss";

export default function CoffeeItem() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const getCoffeeStore = useAppSelector((state) => state.coffeeList);

  return (
    <>
      {getCoffeeStore.map((item, index) => {
      
        return (
          <div
            className={style["coffee-item"]}
            key={index}
            onClick={() => {
              dispatch(setCurrentItem(item));
              navigate(`/order`);
            }}
          >
            <div className={style["coffee-img"]}>
              <img
                src={`/img/coffee/coffee_${item.name}.png`}
                alt={item.name}
              />
            </div>
            <div className={style["coffee-name"]}>{item.name}</div>
          </div>
        );
      })}
    </>
  );
}

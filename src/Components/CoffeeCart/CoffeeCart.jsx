import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentItem } from "../../store/slice/CurrentItemSlice";
import style from "./coffeeCart.module.scss";

export default function HomePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getCoffeeStore = useSelector((state) => state.coffee);
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
                src={`./img/coffee/coffee_${item.name}.png`}
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

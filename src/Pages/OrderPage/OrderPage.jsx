import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  incCurrentItem,
  decCurrentItem,
} from "../../store/slice/CurrentItemSlice";
import { addItemCart } from "../../store/slice/CartSlice";
import style from "./orderPage.module.scss";
import IconsSvg from "./IconsSvg";

export default function OrderPage() {
  const [orderInfo, setOrderInfo] = useState({
    ristretto: null,
    where: null,
    volume: null,
  });
  const navigate = useNavigate();
  const getCurrentItem = useSelector((state) => state.currentItem.currentItem);
  const dispatch = useDispatch();

  const addActiveStyle = (e) => {
    const arr = e.target.parentElement.parentElement.children;
    for (let i = 0; i < arr.length; i++) {
      arr[i].classList.remove("active");
    }
    if (e.target.parentElement.classList.contains("item-check")) {
      e.target.parentElement.classList.toggle("active");
    }
  };
  return (
    <div className={style["order-inner"]}>
      <div className={style["order-top"]}>
        <NavLink to="/menu">
          <div className={style["order-back"]}></div>
        </NavLink>
        <div className={style["order-title"]}>Order</div>
      </div>
      <div className={style["order-img"]}>
        <img
          src={`./img/coffee/coffee_${getCurrentItem.name}.png`}
          alt={getCurrentItem.name}
        />
      </div>
      <div className={style["order-info"]}>
        <div className={style["order-info-item"]}>
          <div className={style["order-name"]}>{getCurrentItem.name}</div>
          <div className={style["order-count"]}>
            <span
              onClick={() => {
                dispatch(decCurrentItem(getCurrentItem));
              }}
            >
              -
            </span>
            {getCurrentItem.count}
            <span
              onClick={() => {
                dispatch(incCurrentItem(getCurrentItem));
              }}
            >
              +
            </span>
          </div>
        </div>
        <div className={style["order-info-item"]}>
          <div className={style["order-ristertto"]}>Ristretto</div>
          <div
            onClick={(e) => {
              addActiveStyle(e);
              setOrderInfo({ ...orderInfo, ristretto: e.target.innerText });
            }}
            className={`${style["order-choose"]} ${style["choose-ristretto"]}`}
          >
            {getCurrentItem.ristretto.map((item) => {
              return (
                <div class="item-check" key={item.id}>
                  <span>{item}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className={style["order-info-item"]}>
          <div className={style["order-where"]}>Onsite / Takeaway</div>
          <div
            onClick={(e) => {
              console.log(e.target);
              addActiveStyle(e);
              setOrderInfo({
                ...orderInfo,
                where: e.target.nextSibling.innerText,
              });
            }}
            className={`${style["order-choose"]} ${style["choose-where"]}`}
          >
            {getCurrentItem.where.map((item) => {
              return (
                <div class="item-check" key={item.id}>
                  <IconsSvg id={`${item}`} />
                  <span style={{ display: "none" }}>{item}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className={style["order-info-item"]}>
          <div className={style["order-volume"]}>Volume, ml</div>
          <div
            onClick={(e) => {
              addActiveStyle(e);
              setOrderInfo({
                ...orderInfo,
                volume: e.target.nextSibling.innerText,
              });
            }}
            className={`${style["order-choose"]} ${style["choose-volume"]}`}
          >
            {getCurrentItem.volume.map((item) => {
              return (
                <div class="item-check" key={item.id}>
                  <IconsSvg id={`Volume${item}`} />
                  <span>{item}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className={style["order-price"]}>
        <span>Total Amount</span>
        <span>BYN {getCurrentItem.price * getCurrentItem.count},00</span>
      </div>
      <div
        onClick={() => {
          dispatch(addItemCart(getCurrentItem));
          navigate("/cart");
        }}
        className={style["order-button"]}
      >
        Add to cart
      </div>
    </div>
  );
}

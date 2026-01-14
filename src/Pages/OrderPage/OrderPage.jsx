import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItemCart } from "@/store/slice/CartSlice";
import Footer from "@/Components/Footer/Footer";
import IconsSvg from "./IconsSvg";
import style from "./orderPage.module.scss";

export default function OrderPage() {
  const getCurrentItem = useSelector((state) => state.currentItem.currentItem);
  const [activeItem, setActiveItem] = useState({
    ristretto: 0,
    where: 0,
    volume: 0,
  });
  const [orderInfo, setOrderInfo] = useState({
    count: getCurrentItem.count,
    id: getCurrentItem.id,
    name: getCurrentItem.name,
    ristretto: getCurrentItem.ristretto[activeItem.ristretto],
    where: getCurrentItem.where[activeItem.where],
    volume: getCurrentItem.volume[activeItem.volume],
    price: getCurrentItem.price[activeItem.volume],
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <>
      <div className={style["order-inner"]}>
        <div className={style["order-top"]}>
          <NavLink to="/menu">
            <div className={style["order-back"]}></div>
          </NavLink>
          <div className={style["order-title"]}>Order</div>
        </div>
        <div className={style["order-img"]}>
          <img
            src={`/img/coffee/coffee_${getCurrentItem.name}.png`}
            alt={getCurrentItem.name}
          />
        </div>
        <div className={style["order-info"]}>
          <div className={style["order-info-item"]}>
            <div className={style["order-name"]}>{getCurrentItem.name}</div>
            <div className={style["order-count"]}>
              <span
                onClick={() => {
                  if (orderInfo.count > 1) {
                    setOrderInfo((prev) => ({
                      ...prev,
                      count: prev.count - 1,
                    }));
                  }
                }}
              >
                -
              </span>
              {orderInfo.count}
              <span
                onClick={() => {
                  setOrderInfo((prev) => ({ ...prev, count: prev.count + 1 }));
                }}
              >
                +
              </span>
            </div>
          </div>
          <div className={style["order-info-item"]}>
            <div>Ristretto</div>
            <div
              className={`${style["order-choose"]} ${style["choose-ristretto"]}`}
            >
              {getCurrentItem.ristretto.map((item, index) => {
                return (
                  <div
                    onClick={() => {
                      if (activeItem.ristretto === index) return;
                      setActiveItem((prev) => ({
                        ...prev,
                        ristretto: index,
                      }));

                      if (activeItem.ristretto === index) return;

                      setOrderInfo((prev) => ({
                        ...prev,
                        ristretto: getCurrentItem.ristretto[index],
                        price: index === 1 ? prev.price + 1 : prev.price - 1,
                      }));
                    }}
                    className={`${
                      activeItem.ristretto === index ? style.active : ""
                    }`}
                    key={index}
                  >
                    <span>{item}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div
            className={`${style["order-info-item"]} ${style["item-takeaway"]}`}
          >
            <div className={style["order-where"]}>Onsite / Takeaway</div>
            <div
              className={`${style["order-choose"]} ${style["choose-where"]}`}
            >
              {getCurrentItem.where.map((item, index) => {
                return (
                  <div
                    onClick={() => {
                      setActiveItem({
                        ...activeItem,
                        where: index,
                      });
                      setOrderInfo({
                        ...orderInfo,
                        where: getCurrentItem.where[index],
                      });
                    }}
                    className={`${
                      activeItem.where === index ? style.active : ""
                    }`}
                    key={index}
                  >
                    <IconsSvg id={`${item}`} />
                    <span style={{ display: "none" }}>{item}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div
            className={`${style["order-info-item"]} ${style["item-volume"]}`}
          >
            <div className={style["order-volume"]}>Volume, ml</div>
            <div
              className={`${style["order-choose"]} ${style["choose-volume"]}`}
            >
              {getCurrentItem.volume.map((item, index) => {
                return (
                  <div
                    onClick={() => {
                      setActiveItem({
                        ...activeItem,
                        volume: index,
                      });
                      setOrderInfo({
                        ...orderInfo,
                        volume: getCurrentItem.volume[index],
                        price: getCurrentItem.price[index],
                      });
                    }}
                    className={`${
                      activeItem.volume === index ? style.active : ""
                    }`}
                    key={index}
                  >
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
          <span>
            BYN {orderInfo.price * orderInfo.count}
            ,00
          </span>
        </div>
        <div
          onClick={() => {
            dispatch(addItemCart(orderInfo));
            navigate("/cart");
          }}
          className={style["order-button"]}
        >
          Add to cart
        </div>
      </div>
      <Footer bg={"light"} />
    </>
  );
}

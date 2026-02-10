import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/store/index";
import { addItemCart } from "@/store/slice/CartSlice";
import Footer from "@/Components/Footer/Footer";
import IconsSvg from "./IconsSvg";
import style from "./orderPage.module.scss";
import { CartType, CoffeeType } from "@/types";

type ActiveItemKeyType = "ristretto" | "where" | "volume";

export default function OrderPage() {
  const item = localStorage.getItem("currentItem");
  const getCurrentItem: CoffeeType | null = item ? JSON.parse(item) : null;

  if (!getCurrentItem) return null;
  const [activeItem, setActiveItem] = useState({
    ristretto: 0,
    where: 0,
    volume: 0,
  });

  const [orderInfo, setOrderInfo] = useState<CartType>({
    count: getCurrentItem.count,
    id: getCurrentItem.id,
    name: getCurrentItem.name,
    ristretto: getCurrentItem.ristretto[activeItem.ristretto] ?? "",
    where: getCurrentItem.where[activeItem.where] ?? "",
    volume: getCurrentItem.volume[activeItem.volume] ?? 0,
    price: getCurrentItem.price[activeItem.volume] ?? 0,
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const getCountItem = (flag: boolean) => {
    if (flag) {
      setOrderInfo((prev) => ({ ...prev, count: prev.count + 1 }));
    } else {
      if (orderInfo.count > 1) {
        setOrderInfo((prev) => ({
          ...prev,
          count: prev.count - 1,
        }));
      }
    }
  };
  const checkElement = (target: ActiveItemKeyType, index: number) => {
    setActiveItem((prev) => ({
      ...prev,
      [target]: index,
    }));

    setOrderInfo((prev) => {
      let price = prev.price;
      if (target === "ristretto" && activeItem.ristretto === index) {
        return prev;
      }
      if (target === "ristretto") {
        price = index === 1 ? prev.price + 1 : prev.price - 1;
      }
      if (target === "volume") {
        price = getCurrentItem.price[index] ?? prev.price;
      }
      return {
        ...prev,
        [target]: getCurrentItem[target][index],
        price,
      };
    });
  };

  return (
    <>
      <div className={style["order-inner"]}>
        <div className={style["order-top"]}>
          <NavLink to="/menu">
            <div className={style["order-back"]}></div>
            <span className={"text-hidden"}>Back</span>
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
              <button
                onClick={() => {
                  getCountItem(false);
                }}
              >
                <span
                  className={"text-hidden"}
                >{`Count ${orderInfo.count}, decrease`}</span>
                -
              </button>
              <span> {orderInfo.count}</span>

              <button
                               onClick={() => {
                  getCountItem(true);
                }}
              >
                <span
                  className={"text-hidden"}
                >{`Count ${orderInfo.count}, increase`}</span>
                +
              </button>
            </div>
          </div>
          <div className={style["order-info-item"]}>
            <div>Ristretto</div>
            <div
              className={`${style["order-choose"]} ${style["choose-ristretto"]}`}
            >
              {getCurrentItem.ristretto.map((item, index) => {
                return (
                  <button
                    onClick={() => {
                      checkElement("ristretto", index);
                    }}
                    className={`${
                      activeItem.ristretto === index ? style.active : ""
                    }`}
                    key={index}
                  >
                    {item}
                  </button>
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
                  <button
                    onClick={() => {
                      checkElement("where", index);
                    }}
                    className={`${
                      activeItem.where === index ? style.active : ""
                    }`}
                    key={index}
                  >
                    <IconsSvg id={`${item}`} />
                    <span className={"text-hidden"}>{item}</span>
                  </button>
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
                  <button
                    onClick={() => {
                      checkElement("volume", index);
                    }}
                    className={`${
                      activeItem.volume === index ? style.active : ""
                    }`}
                    key={index}
                  >
                    <IconsSvg id={`Volume${item}`} />
                    <span>{item}</span>
                  </button>
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
        <button
          onClick={() => {
            dispatch(addItemCart(orderInfo));
            navigate("/cart");
          }}
          className={style["order-button"]}
        >
          Add to cart
        </button>
      </div>
      <Footer bg={"light"} />
    </>
  );
}

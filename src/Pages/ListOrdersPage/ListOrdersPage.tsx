import { NavLink } from "react-router-dom";
import { useAppSelector } from "@/store";
import { totalPrice } from "@/common/cartFunction";

import Footer from "@/Components/Footer/Footer";
import style from "./listOrdersPage.module.scss";

export default function ListOrdersPage() {
  const listOrders = useAppSelector((state) => state.ordersList);

  return (
    <>
      <div className={style["list-inner"]}>
        <div className={style["list-top"]}>
          <NavLink to="/menu">
            <div className={style["list-back"]}></div>
          </NavLink>
          <div className={style["list-title"]}>My orders</div>
        </div>
        <div className={style["list-wrapper"]}>
          {listOrders.length === 0 && <div>You don’t have any orders yet</div>}
          {Object.values(listOrders).map((el) => (
            <div className={style["list-order"]}>
              <div className={style["list-left"]}>
                <div className={style["list-date"]}>
                  {el.date.slice(0, 10)} | {el.date.slice(11, 17)}
                </div>
                {el.items.map((item) => (
                  <div className={style["list-item"]}>
                    <div className={style["list-img"]}></div>
                    <div>
                      <div className={style["list-name"]}>{item.name}</div>
                      <div className={style["list-info"]}>
                        {item.volume} ml x {item.count}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className={style["list-right"]}>
                {totalPrice(el.items)} BYN
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer activeItem="orders" />
    </>
  );
}

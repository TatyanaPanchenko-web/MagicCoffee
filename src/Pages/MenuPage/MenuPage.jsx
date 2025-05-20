import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import CoffeeCart from "../../Components/CoffeeCart/CoffeeCart";
import { setCoffee } from "../../store/slice/CoffeeSlice";
import { getData } from "../../services/fireBase.js";
import style from "./menuPage.module.scss";

export default function MenuPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    const getCoffeeBase = getData("coffee");
    const getUser = getData("user");
    Promise.allSettled([getCoffeeBase, getUser]).then((results) => {
      console.log(results);
      if (results[0].status === "fulfilled") {
        dispatch(setCoffee(results[0].value));
      }
      if (results[1].status === "fulfilled") {
        dispatch(setCoffee(results[1].value));
      }
    });
  }, []);

  const getCoffeeStore = useSelector((state) => state.coffee);

  return (
    <div className={style.container}>
      <Header />
      <main>
        <div className={style["main-container"]}>
          <div className={style["main-title"]}>Select your coffee</div>
          <div className={style["main-carts"]}>
            {getCoffeeStore.length === 0 ? (
              <div className={style["main-error"]}>
                К сожалению, в данной категории ничего нет.
              </div>
            ) : (
              <CoffeeCart />
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

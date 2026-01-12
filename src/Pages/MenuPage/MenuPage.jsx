import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Header from "@/Components/Header/Header";
import Footer from "@/Components/Footer/Footer";
import CoffeeList from "@/Components/CoffeeList/CoffeeList";
import Preloader from "@/Pages/Preloader/Preloader";
import {
  activatePreloader,
  deactivatePreloader,
} from "@/store/slice/PreloaderSlice";
import { setCoffee } from "@/store/slice/CoffeeSlice";
// import { setUsers } from "@/store/slice/UsersSlice";
import { getData } from "@/services/fireBase.js";
import style from "./menuPage.module.scss";

export default function MenuPage() {
  const [currentUsers, setCurrentUsers] = useState();
  const isLoading = useSelector((state) => state.preloader.preloader);
  const dispatch = useDispatch();

  const getCoffeeStore = useSelector((state) => state.coffee);

  useEffect(() => {
    dispatch(activatePreloader());
    const getCoffeeBase = getData("coffee");
    const getUsers = getData("user");

    Promise.allSettled([getCoffeeBase, getUsers]).then((results) => {
      if (results[0].status === "fulfilled") {
        dispatch(setCoffee(results[0].value));
      }
      if (results[1].status === "fulfilled") {
        setCurrentUsers(results[1].value);
      }
      dispatch(deactivatePreloader());
    });
  }, []);

  return (
    <>
      <Preloader show={isLoading} />
      <div className={style.container}>
        <Header currentUsers={currentUsers} />
        <main>
          <div className={style["main-container"]}>
            <div className={style["main-title"]}>Select your coffee</div>
            <div className={style["main-carts"]}>
              {getCoffeeStore.length === 0 ? (
                <div className={style["main-error"]}>
                  К сожалению, в данной категории ничего нет.
                </div>
              ) : (
                <CoffeeList />
              )}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

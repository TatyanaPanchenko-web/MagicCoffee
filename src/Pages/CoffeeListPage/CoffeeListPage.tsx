import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppSelector, useAppDispatch } from "@/store/index";
import Header from "@/Components/Header/Header";
import Footer from "@/Components/Footer/Footer";
import CoffeeItem from "@/Components/CoffeeItem/CoffeeItem";
import Preloader from "@/Pages/Preloader/Preloader";
import {
  activatePreloader,
  deactivatePreloader,
} from "@/store/slice/PreloaderSlice";
import { setCoffee } from "@/store/slice/CoffeeListSlice";
import { auth, getDataFromBD } from "@/services/fireBase.js";
import { CoffeeType, UserType } from "@/types";
import style from "./coffeeListPage.module.scss";

type UserFromDB = {
  [uid: string]: UserType;
};

export default function CoffeeListPage() {
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const isLoading = useAppSelector((state) => state.preloader);
  const dispatch = useAppDispatch();

  const getCoffeeStore = useAppSelector((state) => state.coffeeList);
  const user = auth.currentUser;
  const uid = user?.uid;
  useEffect(() => {
    dispatch(activatePreloader());
    const getCoffeeBase = getDataFromBD<CoffeeType[]>("coffee");
    const getUsers = getDataFromBD<UserFromDB>("user");

    Promise.allSettled([getCoffeeBase, getUsers]).then((results) => {
      if (results[0].status === "fulfilled") {
        dispatch(setCoffee(results[0].value));
      }
      if (results[1].status === "fulfilled" && uid) {
        const currentUser = results[1].value[uid];
        setCurrentUser(currentUser ?? null);
      }

      dispatch(deactivatePreloader());
    });
  }, []);

  return (
    <>
      <Preloader show={isLoading} />
      <Header />

      <main className={style["main-inner"]}>
        <div className={style["main-title"]}>Select your coffee</div>
        <div className={style["main-carts"]}>
          {getCoffeeStore.length === 0 ? (
            <>
              <div className={style["main-error"]}>
                К сожалению, в данной категории ничего нет.
              </div>
            </>
          ) : (
            <CoffeeItem />
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}

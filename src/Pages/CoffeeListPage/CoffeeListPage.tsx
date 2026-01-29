import { useAppSelector } from "@/store/index";
import Header from "@/Components/Header/Header";
import Footer from "@/Components/Footer/Footer";
import CoffeeItem from "@/Components/CoffeeItem/CoffeeItem";

import style from "./coffeeListPage.module.scss";

export default function CoffeeListPage() {
  const getCoffeeStore = useAppSelector((state) => state.coffeeList);

  return (
    <>
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

      <Footer activeItem="menu" />
    </>
  );
}

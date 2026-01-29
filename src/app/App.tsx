import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, getDataFromBD } from "@/services/fireBase";
import { useAppDispatch } from "@/store/index";
import { setDataAboutUser, changeLoadingStatus } from "@/store/slice/UserSlice";
import {
  activatePreloader,
  deactivatePreloader,
} from "@/store/slice/PreloaderSlice";
import { Routes, Route, Outlet } from "react-router-dom";
import WelcomePage from "@/Pages/WelcomePage/WelcomePage";
import CoffeeListPage from "@/Pages/CoffeeListPage/CoffeeListPage";
import AuthPage from "@/Pages/AuthPage/AuthPage";
import RegPage from "@/Pages/RegPage/RegPage";
import TermsOfUsePage from "@/Pages/TermsOfUsePage/TermsOfUsePage";
import ProfilePage from "@/Pages/ProfilePage/ProfilePage";
import VerificationPage from "@/Pages/VerificationPage/VerificationPage";
import OrderPage from "@/Pages/OrderPage/OrderPage";
import CartPage from "@/Pages/CartPage/CartPage";
import ListOrdersPage from "@/Pages/ListOrdersPage/ListOrdersPage";
import FinishPage from "@/Pages/FinishPage/FinishPage";
import Redirect from "@/Components/Redirect/Redirect";
import style from "./app.module.scss";
import Preloader from "@/Pages/Preloader/Preloader";
import { setCoffee } from "@/store/slice/CoffeeListSlice";
import { addOrderToList } from "@/store/slice/ListOrdersSlice";
import { CoffeeType, OrdersListType } from "@/types";

export default function App() {
  const [uid, setUid] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(activatePreloader());
    const getUser = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
        dispatch(
          setDataAboutUser({
            name: user.displayName ?? "",
            email: user.email ?? "",
            uid: user.uid ?? "",
          }),
        );
      } else {
        dispatch(setDataAboutUser(null));
      }
      dispatch(changeLoadingStatus());
      dispatch(deactivatePreloader());
    });

    return getUser;
  }, []);

  useEffect(() => {
    dispatch(activatePreloader());
    const getCoffeeBase = getDataFromBD<CoffeeType[]>("coffee");
    const getListOrders = getDataFromBD<{ [uid: string]: OrdersListType[] }>(
      "orders",
    );
   
    Promise.allSettled([getCoffeeBase, getListOrders]).then((results) => {
      if (results[0].status === "fulfilled") {
        dispatch(setCoffee(results[0].value));
      }
      if (results[1].status === "fulfilled" && results[1].value) {
               if (uid) {
          const userOrders = results[1].value[uid];
          if (userOrders) {
            dispatch(addOrderToList(userOrders));
          }
        }
      }
      dispatch(deactivatePreloader());
    });
  }, [uid]);

  return (
    <div className={style.container}>
      <Preloader />
      <Routes>
        <Route path="/" element={<WelcomePage />}></Route>
        <Route path="/auth" element={<AuthPage />}></Route>
        <Route path="/reg" element={<RegPage />}></Route>
        <Route path="/terms" element={<TermsOfUsePage />}></Route>
        <Route element={<RedirectLayout />}>
          <Route path="/menu" element={<CoffeeListPage />}></Route>
          <Route path="/profile" element={<ProfilePage />}></Route>
          <Route path="/verification" element={<VerificationPage />}></Route>
          <Route path="/order" element={<OrderPage />}></Route>
          <Route path="/cart" element={<CartPage />}></Route>
          <Route path="/list" element={<ListOrdersPage />}></Route>
          <Route path="/finish" element={<FinishPage />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

const RedirectLayout = () => {
  return (
    <Redirect>
      <Outlet />
    </Redirect>
  );
};

import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/services/fireBase";
import { useAppDispatch } from "@/store/index";
import { setDataAboutUser } from "@/store/slice/UserSlice";
import { Routes, Route, useNavigate } from "react-router-dom";
import WelcomePage from "@/Pages/WelcomePage/WelcomePage";
import CoffeeListPage from "@/Pages/CoffeeListPage/CoffeeListPage";
import AuthPage from "@/Pages/AuthPage/AuthPage";
import RegPage from "@/Pages/RegPage/RegPage";
import TermsOfUsePage from "@/Pages/TermsOfUsePage/TermsOfUsePage";
import ProfilePage from "@/Pages/ProfilePage/ProfilePage";
import VerificationPage from "@/Pages/VerificationPage/VerificationPage";
import OrderPage from "@/Pages/OrderPage/OrderPage";
import CartPage from "@/Pages/CartPage/CartPage";
import FinishPage from "@/Pages/FinishPage/FinishPage";

import style from "./app.module.scss";

export default function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const getUser = onAuthStateChanged(auth, (user) => {
      if (user) {
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
    });
    return () => {
      getUser();
    };
  }, []);

  return (
    <div className={style.container}>
      <Routes>
        <Route path="/" element={<WelcomePage />}></Route>
        <Route path="/menu" element={<CoffeeListPage />}></Route>
        <Route path="/auth" element={<AuthPage />}></Route>
        <Route path="/reg" element={<RegPage />}></Route>
        <Route path="/terms" element={<TermsOfUsePage />}></Route>
        <Route path="/profile" element={<ProfilePage />}></Route>
        <Route path="/verification" element={<VerificationPage />}></Route>
        <Route path="/order" element={<OrderPage />}></Route>
        <Route path="/cart" element={<CartPage />}></Route>
        <Route path="/finish" element={<FinishPage />}></Route>
      </Routes>
    </div>
  );
}

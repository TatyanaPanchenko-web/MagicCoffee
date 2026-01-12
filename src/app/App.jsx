import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import WelcomePage from "@/Pages/WelcomePage/WelcomePage";
import MenuPage from "@/Pages/MenuPage/MenuPage";
import AuthPage from "@/Pages/AuthPage/AuthPage";
import RegPage from "@/Pages/RegPage/RegPage";
import TermsOfUsePage from "@/Pages/TermsOfUsePage/TermsOfUsePage";
import ProfilePage from "@/Pages/ProfilePage/ProfilePage";
import OrderPage from "@/Pages/OrderPage/OrderPage";
import CartPage from "@/Pages/CartPage/CartPage";
import FinishPage from "@/Pages/FinishPage/FinishPage";

export default function App() {
  const [auth, setAuth] = useState(false);

  return (
    <Routes>
      <Route path="/" element={<WelcomePage />}></Route>
      <Route path="/menu" element={<MenuPage />}></Route>
      <Route path="/auth" element={<AuthPage setAuth={setAuth} />}></Route>
      <Route path="/reg" element={<RegPage />}></Route>
      <Route path="/terms" element={<TermsOfUsePage />}></Route>
      <Route
        path="/profile"
        element={<ProfilePage setAuth={setAuth} />}
      ></Route>
      <Route path="/order" element={<OrderPage />}></Route>
      <Route path="/cart" element={<CartPage />}></Route>
      <Route path="/finish" element={<FinishPage />}></Route>
    </Routes>
  );
}

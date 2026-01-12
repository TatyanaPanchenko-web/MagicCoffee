import { auth } from "@/services/fireBase";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import { getCurrentUser } from "@/services/fireBase";
import {
  activatePreloader,
  deactivatePreloader,
} from "@/store/slice/PreloaderSlice";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { EmailAuthProvider, GoogleAuthProvider } from "firebase/auth";
import Preloader from "@/Pages/Preloader/Preloader";
import style from "./authPage.module.scss";

export default function AuthPage({ setAuth }) {
  const [show, setShow] = useState(false);
  const [errAuth, setErrAuth] = useState(false);
  const isLoading = useSelector((state) => state.preloader.preloader);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // const auth = getAuth();
  const navigate = useNavigate();

    const onSubmit = async (data) => {
    dispatch(activatePreloader());
    setErrAuth(false);
    try {
      await signInWithEmailAndPassword(auth, data.mail, data.password);

      // setAuth(true);
      navigate("/menu");
    } catch (error) {
      console.error(error.message);
      setErrAuth(true);
    } finally {
      dispatch(deactivatePreloader());
    }
  };

  return (
    <>
      <Preloader show={isLoading} />
      <div className={style["auth-inner"]}>
        <NavLink to="/">
          <div className={style["auth-back"]}></div>
        </NavLink>
        <div className={style["auth-title"]}>Sign in</div>
        <div className={style["auth-subtitle"]}>Welcome back</div>
        <form onSubmit={handleSubmit(onSubmit)} className={style["auth-form"]}>
          <div className={style["input-str"]}>
            <span className={style["email-icon"]}></span>
            <input
              placeholder="Email address"
              {...register("mail", {
                required: "Must be filled in",
                pattern: {
                  value: /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/,
                  message: "Incorrect characters",
                },
              })}
            />
            {errors.mail && (
              <p className={style.errorField}>{errors.mail?.message}</p>
            )}
          </div>
          <div className={style["input-str"]}>
            <div className={style["password-icon"]}></div>
            <input
              placeholder="Password"
              type={show ? "text" : "password"}
              {...register("password", {
                required: "Must be filled in",
                minLength: {
                  value: 6,
                  message: "At least 6 characters",
                },
              })}
            />
            <div
              onClick={() => {
                setShow((prev) => !prev);
              }}
              className={
                show
                  ? `${style["password-show"]} ${style["show-true"]}`
                  : `${style["password-show"]} ${style["show-false"]}
            `
              }
            ></div>
            {errors.password && (
              <p className={style.errorField}>{errors.password?.message}</p>
            )}
          </div>
          {errAuth && (
            <div className={style.errorField}>Incorrect password or login</div>
          )}

          <input type="submit" value="" />
        </form>

        <div className={style["auth-link"]}>
          New member?
          <NavLink to="/reg"> Sign up</NavLink>
        </div>
      </div>
    </>
  );
}

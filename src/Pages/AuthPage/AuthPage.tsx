import { auth } from "@/services/fireBase";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, NavLink } from "react-router-dom";
import { useAppDispatch } from "@/store/index";
import {
  activatePreloader,
  deactivatePreloader,
} from "@/store/slice/PreloaderSlice";
import { signInWithEmailAndPassword } from "firebase/auth";
import style from "./authPage.module.scss";

type FormValuesType = {
  email: string;
  password: string;
};

export default function AuthPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [errAuth, setErrAuth] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValuesType>();

  const onSubmit = async (data: FormValuesType) => {
    dispatch(activatePreloader());
    setErrAuth(false);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      navigate("/menu");
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        setErrAuth(true);
      } else {
        console.error("Unknown error", error);
      }
    } finally {
      dispatch(deactivatePreloader());
    }
  };

  return (
    <div className={style["auth-inner"]}>
      <NavLink to="/">
        <div className={style["auth-back"]}></div>
        <span className={"text-hidden"}>Back</span>
      </NavLink>
      <div className={style["auth-title"]}>Sign in</div>
      <div className={style["auth-subtitle"]}>Welcome back</div>
      <form onSubmit={handleSubmit(onSubmit)} className={style["auth-form"]}>
        <div className={style["input-str"]}>
          <div className={style["input-wrapper-icon"]}>
            <span
              className={`${style["input-icon"]} ${style["email-icon"]}`}
            ></span>
          </div>
          <input
            placeholder="Email address"
            {...register("email", {
              required: "Must be filled in",
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/,
                message: "Incorrect characters",
              },
            })}
          />
          {errors.email && (
            <p
              className={`${style["errorField"]} ${style["errorField-right"]}`}
            >
              {errors.email?.message}
            </p>
          )}
        </div>
        <div className={style["input-str"]}>
          <div className={style["input-wrapper-icon"]}>
            <span
              className={`${style["input-icon"]} ${style["password-icon"]}`}
            ></span>
          </div>
          <input
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            {...register("password", {
              required: "Must be filled in",
              minLength: {
                value: 6,
                message: "At least 6 characters",
              },
            })}
          />
          <button
            type="button"
            onClick={() => {
              setShowPassword((prev) => !prev);
            }}
            className={
              showPassword
                ? `${style["password-show"]} ${style["show-true"]}`
                : `${style["password-show"]} ${style["show-false"]}
            `
            }
          >
            <span className={"text-hidden"}>
              {showPassword ? "Password show" : "Password hidden"}
            </span>
          </button>
          {errors.password && (
            <p
              className={`${style["errorField"]} ${style["errorField-right"]}`}
            >
              {errors.password?.message}
            </p>
          )}
        </div>
        {errAuth && (
          <div className={style.errorField}>Incorrect password or login</div>
        )}

        <input type="submit" value="" aria-label="Submit form" />
      </form>

      <div className={style["auth-link"]}>
        New member? &nbsp;
        <NavLink to="/reg">Sign up</NavLink>
      </div>
    </div>
  );
}

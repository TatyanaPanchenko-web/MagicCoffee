import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import InputMask from "react-input-mask";
import { auth } from "@/services/fireBase";
import { NavLink, Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { setUserDataBase } from "@/services/fireBase";
import { useAppSelector, useAppDispatch } from "@/store/index";
import {
  activatePreloader,
  deactivatePreloader,
} from "@/store/slice/PreloaderSlice";
import Preloader from "@/Pages/Preloader/Preloader";
import style from "./regPage.module.scss";
import { setUser } from "@/store/slice/UserSlice";
import { UserType } from "@/types";

type FormValuesType = {
  email: string;
  password: string;
  name: string;
  phone: string;
};
export default function RegPage() {
  const [successMessage, setSuccessMessage] = useState(false);
  const [show, setShow] = useState(false);
  const [errAuth, setErrAuth] = useState(false);
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValuesType>();

  const isLoading = useAppSelector((state) => state.preloader);
  const dispatch = useAppDispatch();
  const onSubmit = async (data: UserType) => {
    dispatch(activatePreloader());
    setErrAuth(false);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );

      const user = userCredential.user;

      await updateProfile(user, {
        displayName: data.name,
      });

      await setUserDataBase(data, user.uid);
      setSuccessMessage(true);
      setUser([data]);
      reset();
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
    <>
      <Preloader show={isLoading} />
      <div className={style["reg-inner"]}>
        <NavLink to="/">
          <div className={style["reg-back"]}></div>
        </NavLink>

        {successMessage ? (
          <div className={style["reg-success"]}>
            <div>Registration was successful. </div>
            <div>
              Now you can <NavLink to="/auth">sign in</NavLink>
            </div>
          </div>
        ) : (
          <div className={style["reg-container"]}>
            <div className={style["reg-title"]}>Sign up</div>
            <div className={style["reg-subtitle"]}>Create an account here</div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className={style["reg-form"]}
            >
              <div className={style["input-str"]}>
                <span
                  className={`${style["input-icon"]} ${style["user-icon"]}`}
                ></span>
                <input
                  placeholder="Name"
                  {...register("name", {
                    required: "This field is required",
                    maxLength: 30,
                    pattern: {
                      value: /^[A-Za-z]+$/i,
                      message: "Incorrect characters",
                    },
                  })}
                />
                {errors.name && (
                  <p
                    className={`${style["errorField"]} ${style["errorField-right"]}`}
                  >
                    {errors.name?.message}
                  </p>
                )}
              </div>
              <div className={style["input-str"]}>
                <span
                  className={`${style["input-icon"]} ${style["mobile-icon"]}`}
                ></span>

                <Controller
                  control={control}
                  {...register("phone", {
                    required: "This field is required",
                    pattern: {
                      value:
                        /^\+375\s?\((25|29|33|44)\)\s?\d{3}[-\s]?\d{2}[-\s]?\d{2}$/,
                      message: "Incorrect characters",
                    },
                  })}
                  render={({ field }) => (
                    <InputMask
                      {...field}
                      mask="+375 (99) 999-99-99"
                      placeholder="+375 (29) 123-45-67"
                    >
                      {(inputProps) => <input type="tel" {...inputProps} />}
                    </InputMask>
                  )}
                />

                {errors.phone && (
                  <p
                    className={`${style["errorField"]} ${style["errorField-right"]}`}
                  >
                    {errors.phone?.message}
                  </p>
                )}
              </div>
              <div className={style["input-str"]}>
                <span
                  className={`${style["input-icon"]} ${style["email-icon"]}`}
                ></span>
                <input
                  placeholder="Email address"
                  type="email"
                  {...register("email", {
                    required: "This field is required",
                    pattern: {
                      value: /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/,
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
                <span
                  className={`${style["input-icon"]} ${style["password-icon"]}`}
                ></span>
                <input
                  placeholder="Password"
                  type={show ? "text" : "password"}
                  {...register("password", {
                    required: "This field is required",
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
                  <p
                    className={`${style["errorField"]} ${style["errorField-right"]}`}
                  >
                    {errors.password?.message}
                  </p>
                )}
              </div>
              {errAuth && (
                <div className={style.errorField}>
                  Registration failed: user already exists
                </div>
              )}
              <div className={style["reg-agree"]}>
                By signing up you agree with our &nbsp;
                <Link to="/terms">Terms of Use</Link>
              </div>

              <input type="submit" value="" />
            </form>
            <div className={style["reg-link"]}>
              Already a member?
              <NavLink to="/auth"> Sign in</NavLink>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  verifyBeforeUpdateEmail,
} from "firebase/auth";
import { auth } from "@/services/fireBase";
import { useAppDispatch, useAppSelector } from "@/store/index";
import {
  activatePreloader,
  deactivatePreloader,
} from "@/store/slice/PreloaderSlice";
import Footer from "@/Components/Footer/Footer";
import Preloader from "@/Pages/Preloader/Preloader";
import style from "./verificationPage.module.scss";

type FormValuesType = {
  email: string;
  password: string;
};
type successMessageType = {
  status: boolean;
  newEmail: string | null;
};
export default function VerificationPage() {
  const [show, setShow] = useState(false);
  const [errAuth, setErrAuth] = useState(false);
  const [successMessage, setSuccessMessage] = useState<successMessageType>({
    status: false,
    newEmail: null,
  });
  const user = auth.currentUser;

  const isLoading = useAppSelector((state) => state.preloader);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValuesType>();

  const onSubmit = async (data: FormValuesType) => {
    dispatch(activatePreloader());
    setErrAuth(false);
    try {
      if (!user?.email) {
        throw new Error("You need to sign in to continue");
      }

      const credential = EmailAuthProvider.credential(
        user.email,
        data.password,
      );

      await reauthenticateWithCredential(user, credential);
      await verifyBeforeUpdateEmail(user, data.email);

      setSuccessMessage({ status: true, newEmail: data.email });
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

      <div className={style["verification-inner"]}>
        {successMessage.status ? (
          <>
            <div className={style["verification-top"]}>
              <NavLink to="/profile">
                <div className={style["verification-back"]}></div>
              </NavLink>
            </div>
            <div className={style["success-message"]}>
              A confirmation email has been sent to your new email address:
              <span> {successMessage.newEmail}</span>. Check your inbox and
              follow the link. Don’t forget to check your spam folder.
            </div>
          </>
        ) : (
          <>
            <div className={style["verification-top"]}>
              <NavLink to="/profile">
                <div className={style["verification-back"]}></div>
              </NavLink>
              <div className={style["verification-title"]}>Change Email</div>
              <div className={style["verification-subtitle"]}>
                Enter your new email and current password to confirm
              </div>
            </div>
            <div className={style["verification-wrapper"]}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className={style["auth-form"]}
              >
                <div className={style["input-str"]}>
                  <span className={style["email-icon"]}></span>
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
                    <p
                      className={`${style["errorField"]} ${style["errorField-right"]}`}
                    >
                      {errors.password?.message}
                    </p>
                  )}
                </div>
                {errAuth && (
                  <div className={style.errorField}>Email change error</div>
                )}
                <input type="submit" value="Confirm Email" />
              </form>
            </div>
          </>
        )}
      </div>
      <Footer bg={"light"} />
    </>
  );
}

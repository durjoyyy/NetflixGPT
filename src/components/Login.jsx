import React, { useRef, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  DEFAULT_PROFILE_IMAGE_URL,
  LOGIN_ALREADY_USER,
  LOGIN_BACKGROUND_IMAGE_URL,
  LOGIN_NEW_TO_NETFLIX,
  LOGIN_PLACEHOLDER_EMAIL,
  LOGIN_PLACEHOLDER_FULL_NAME,
  LOGIN_PLACEHOLDER_PASSWORD,
  LOGIN_SIGN_IN,
  LOGIN_SIGN_IN_TEXT,
  LOGIN_SIGN_UP,
  LOGIN_SIGN_UP_NOW,
  ROUTE_BROWSE,
} from "../utils/constants";
import { auth } from "../utils/firebase";
import { addUser } from "../utils/userSlice";
import { validateData } from "../utils/validate";
import Header from "./Header";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fullName = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const toggleSignInForm = () => {
    setErrorMsg("");
    setIsSignInForm((currentValue) => !currentValue);
  };

  const handleSubmit = () => {
    const msg = validateData(email.current.value, password.current.value);
    setErrorMsg(msg);
    if (msg) return;

    if (!isSignInForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value,
      )
        .then(() => {
          updateProfile(auth.currentUser, {
            displayName: fullName.current.value,
            photoURL: DEFAULT_PROFILE_IMAGE_URL,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(addUser({ uid, email, displayName, photoURL }));
              navigate(ROUTE_BROWSE);
            })
            .catch((error) => {
              setErrorMsg(`${error.code} - ${error.message}`);
            });
        })
        .catch((error) => {
          setErrorMsg(`${error.code} - ${error.message}`);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value,
      )
        .then(() => {
          navigate(ROUTE_BROWSE);
        })
        .catch((error) => {
          setErrorMsg(`${error.code} - ${error.message}`);
        });
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      <Header />

      <img
        className="absolute inset-0 h-full w-full object-cover"
        src={LOGIN_BACKGROUND_IMAGE_URL}
        alt="Netflix background"
      />
      <div className="absolute inset-0 bg-black/65 sm:bg-black/55" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black to-transparent" />

      <main className="relative z-10 flex min-h-screen items-center justify-center px-4 pb-8 pt-24 sm:px-6">
        <form
          className="w-full max-w-[450px] rounded bg-black/85 px-5 py-8 shadow-2xl shadow-black/70 ring-1 ring-white/10 backdrop-blur-sm sm:px-10 sm:py-12 md:px-14"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <h1 className="mb-7 text-3xl font-bold text-white">
            {isSignInForm ? LOGIN_SIGN_IN : LOGIN_SIGN_UP}
          </h1>

          {!isSignInForm && (
            <input
              className="mb-4 w-full rounded border border-transparent bg-zinc-700/90 p-4 text-white outline-none transition placeholder:text-zinc-400 focus:border-white/50 focus:bg-zinc-700"
              placeholder={LOGIN_PLACEHOLDER_FULL_NAME}
              ref={fullName}
              type="text"
            />
          )}

          <input
            className="mb-4 w-full rounded border border-transparent bg-zinc-700/90 p-4 text-white outline-none transition placeholder:text-zinc-400 focus:border-white/50 focus:bg-zinc-700"
            placeholder={LOGIN_PLACEHOLDER_EMAIL}
            ref={email}
            type="email"
          />

          <input
            className="mb-5 w-full rounded border border-transparent bg-zinc-700/90 p-4 text-white outline-none transition placeholder:text-zinc-400 focus:border-white/50 focus:bg-zinc-700"
            placeholder={LOGIN_PLACEHOLDER_PASSWORD}
            ref={password}
            type="password"
          />

          {errorMsg && (
            <p className="mb-4 rounded bg-red-950/60 px-3 py-2 text-sm font-semibold text-red-200">
              {errorMsg}
            </p>
          )}

          <button
            className="w-full rounded bg-[#e50914] p-4 font-semibold text-white transition hover:bg-[#f6121d] active:scale-[0.99]"
            type="submit"
          >
            {isSignInForm ? LOGIN_SIGN_IN_TEXT : LOGIN_SIGN_UP}
          </button>

          <p className="mt-7 text-zinc-400">
            {isSignInForm ? LOGIN_NEW_TO_NETFLIX : LOGIN_ALREADY_USER}
            <button
              className="ml-1 font-medium text-white hover:underline"
              onClick={toggleSignInForm}
              type="button"
            >
              {isSignInForm ? LOGIN_SIGN_UP_NOW : LOGIN_SIGN_IN_TEXT}
            </button>
          </p>
        </form>
      </main>
    </div>
  );
};

export default Login;

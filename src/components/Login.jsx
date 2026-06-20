import React, { useRef, useState } from "react";
import Header from "./Header";
import { validateData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { DEFAULT_PROFILE_IMAGE_URL, LOGIN_BACKGROUND_IMAGE_URL, ROUTE_BROWSE, LOGIN_SIGN_IN, LOGIN_SIGN_UP, LOGIN_NEW_TO_NETFLIX, LOGIN_ALREADY_USER, LOGIN_SIGN_UP_NOW, LOGIN_SIGN_IN_TEXT, LOGIN_PLACEHOLDER_FULL_NAME, LOGIN_PLACEHOLDER_EMAIL, LOGIN_PLACEHOLDER_PASSWORD } from "../utils/constants";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMsg, SetErrorMsg] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const fullName = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleSubmit = () => {
    const msg = validateData(email.current.value, password.current.value);
    SetErrorMsg(msg);
    if (msg) return;

    //sign in / sign up logic
    if (!isSignInForm) {
      //sign up code
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value,
      )
        .then((userCredential) => {
          // Signed up
          updateProfile(auth.currentUser, {
            displayName: fullName.current.value,
            photoURL: DEFAULT_PROFILE_IMAGE_URL,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }),
              );
              navigate(ROUTE_BROWSE);
              // ...
            })
            .catch((error) => {
              SetErrorMsg(error.code + "-" + error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error(error);
          SetErrorMsg(errorCode + "-" + errorMessage);
        });
    } else {
      //sign in code
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value,
      )
        .then((userCredential) => {
          // Signed in
          navigate(ROUTE_BROWSE);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          SetErrorMsg(errorCode + "-" + errorMessage);
        });
    }
  };

  return (
    <div className="relative">
      <Header />

      {/* Background Image */}
      <img
        className="w-screen h-screen object-cover"
        src={LOGIN_BACKGROUND_IMAGE_URL}
        alt="background"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Login Form */}
      <form
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/3 w-[450px] p-14 bg-black/80 rounded-lg z-10"
        onSubmit={(e) => e.preventDefault()}
      >
        <h1 className="font-bold text-3xl mb-8 text-white">
          {isSignInForm ? LOGIN_SIGN_IN : LOGIN_SIGN_UP}
        </h1>
        {!isSignInForm && (
          <input
            type="text"
            ref={fullName}
            placeholder={LOGIN_PLACEHOLDER_FULL_NAME}
            className="w-full p-4 mb-7 rounded bg-gray-600 text-white placeholder-gray-300"
          />
        )}
        <input
          ref={email}
          type="email"
          placeholder={LOGIN_PLACEHOLDER_EMAIL}
          className="w-full p-4 mb-7 rounded bg-gray-600 text-white placeholder-gray-300"
        />
        <input
          ref={password}
          type="password"
          placeholder={LOGIN_PLACEHOLDER_PASSWORD}
          className="w-full p-4 mb-7 rounded bg-gray-600 text-white placeholder-gray-300"
        />
        {errorMsg && (
          <p className="text-red-500 font-bold text-lg p-2 mb-2">{errorMsg}</p>
        )}
        <button
          className="transition duration-200 w-full p-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded"
          onClick={handleSubmit}
        >
          {isSignInForm ? LOGIN_SIGN_IN_TEXT : LOGIN_SIGN_UP}
        </button>
        <p className="text-gray-400 mt-7">
          {isSignInForm ? LOGIN_NEW_TO_NETFLIX : LOGIN_ALREADY_USER}
          <span
            className="text-white cursor-pointer hover:underline"
            onClick={toggleSignInForm}
          >
            {isSignInForm ? " " + LOGIN_SIGN_UP_NOW : " " + LOGIN_SIGN_IN_TEXT}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;

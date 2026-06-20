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
          const user = userCredential.user;
          updateProfile(auth.currentUser, {
            displayName: fullName.current.value,
            photoURL:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQETi_gIfzbGIGCYPFy8y6PLIEB6ZiccZ3wx55nFgVzlNiPBAKqfM1shJY&s=10",
          })
            .then(() => {
              const { uid, email, displayName } = auth.currentUser;
              dispatch(
                addUser({ uid: uid, email: email, displayName: displayName }),
              );
              navigate("/browse");
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
          const user = userCredential.user;
          console.log(user);
          navigate("/browse");
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
        src="https://xboxwire.thesourcemediaassets.com/sites/2/2023/05/Background-size1920x1080-4e1694a6-75aa-4c36-9d4d-7fb6a3102005-bc5318781aad7f5c8520.png"
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
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            type="text"
            ref={fullName}
            placeholder="Full Name"
            className="w-full p-4 mb-7 rounded bg-gray-600 text-white placeholder-gray-300"
          />
        )}
        <input
          ref={email}
          type="email"
          placeholder="Email Address"
          className="w-full p-4 mb-7 rounded bg-gray-600 text-white placeholder-gray-300"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="w-full p-4 mb-7 rounded bg-gray-600 text-white placeholder-gray-300"
        />
        {errorMsg && (
          <p className="text-red-500 font-bold text-lg p-2 mb-2">{errorMsg}</p>
        )}
        <button
          className="transition duration-200 w-full p-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded"
          onClick={handleSubmit}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="text-gray-400 mt-7">
          {isSignInForm ? "New to Netflix?" : "Already an user?"}
          <span
            className="text-white cursor-pointer hover:underline"
            onClick={toggleSignInForm}
          >
            {isSignInForm ? " Sign Up Now" : " Sign In"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;

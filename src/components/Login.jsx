import React, { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
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
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Login Form */}
      <form className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/3 w-[450px] p-14 bg-black/80 rounded-lg z-10">
        <h1 className="font-bold text-3xl mb-8 text-white">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignInForm && (
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-4 mb-7 rounded bg-gray-600 text-white placeholder-gray-300"
          />
        )}

        <input
          type="text"
          placeholder="Email Address"
          className="w-full p-4 mb-7 rounded bg-gray-600 text-white placeholder-gray-300"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-4 mb-7 rounded bg-gray-600 text-white placeholder-gray-300"
        />

        <button className="w-full p-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p
          className="text-white mt-7 cursor-pointer"
          onClick={toggleSignInForm}
        >
          {isSignInForm
            ? "New to Netflix? Sign Up Now"
            : "Already an user? Sign In now"}
        </p>
      </form>
    </div>
  );
};

export default Login;

import React from "react";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { NETFLIX_LOGO_URL, DEFAULT_PROFILE_IMAGE_URL, ROUTE_BROWSE, ROUTE_LOGIN, HEADER_NETFLIX_LOGO_ALT, HEADER_PROFILE_ALT, HEADER_SIGN_OUT } from "../utils/constants";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };



  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/auth.user
          const { uid, email, displayName, photoURL } = user;
          dispatch(
            addUser({
              uid: uid,
              email: email,
              displayName: displayName,
              photoURL: photoURL,
            }),
          );
          navigate(ROUTE_BROWSE);
        } else {
          // User is signed out
          // ...
          dispatch(removeUser());
          navigate(ROUTE_LOGIN);
        }
      },
      (error) => {
        console.error("Auth error:", error);
      },
    );

    //unsubscribe when component unmounts
    //onAuthStateChanged() creates a Firebase auth listener.
    // unsubscribe() removes that listener when the component unmounts,
    // preventing memory leaks and duplicate listeners.
    return () => unsubscribe();
  }, [dispatch, navigate]);

return (
  <header className="fixed top-0 left-0 right-0 z-[100] bg-black/95 shadow-lg shadow-black/30">
    <div className="flex items-center justify-between px-4 md:px-8 py-3">
      <img
        className="w-28 md:w-36 lg:w-44"
        src={NETFLIX_LOGO_URL}
        alt={HEADER_NETFLIX_LOGO_ALT}
      />

      {user && (
        <div className="flex items-center gap-3 md:gap-4">
          <img
            className="h-8 w-8 md:h-10 md:w-10 rounded-md object-cover"
            src={user?.photoURL || DEFAULT_PROFILE_IMAGE_URL}
            alt={HEADER_PROFILE_ALT}
          />

          <button
            className="rounded bg-red-600 px-3 md:px-4 py-1 md:py-2 text-xs md:text-sm font-semibold text-white hover:bg-red-700"
            onClick={handleSignOut}
          >
            {HEADER_SIGN_OUT}
          </button>
        </div>
      )}
    </div>
  </header>
);
};

export default Header;

import React, { useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  DEFAULT_PROFILE_IMAGE_URL,
  HEADER_NETFLIX_LOGO_ALT,
  HEADER_PROFILE_ALT,
  HEADER_SIGN_OUT,
  NETFLIX_LOGO_URL,
  ROUTE_BROWSE,
  ROUTE_LOGIN,
  SUPPORTED_LANGUAGES,
} from "../utils/constants";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../utils/userSlice";
import { toggleGPTSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navItems = ["Home", "TV Shows", "Movies", "New & Popular", "My List"];
  const gptSearch = useSelector((store) => store.gpt.showGPTSearch);

  const handleSignOut = () => {
    signOut(auth).catch((error) => {
      console.error(error);
    });
  };

  const handleGPTSearchClick = () => {
    console.log("clicked");
    dispatch(toggleGPTSearchView());
  };

  const handleLangChange = (e) => {
    console.log(e.target.value);
    dispatch(changeLanguage(e.target.value));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        if (currentUser) {
          const { uid, email, displayName, photoURL } = currentUser;
          dispatch(
            addUser({
              uid,
              email,
              displayName,
              photoURL,
            }),
          );
          navigate(ROUTE_BROWSE);
        } else {
          dispatch(removeUser());
          navigate(ROUTE_LOGIN);
        }
      },
      (error) => {
        console.error("Auth error:", error);
      },
    );

    return () => unsubscribe();
  }, [dispatch, navigate]);

  return (
    <header className="fixed left-0 right-0 top-0 z-[100] bg-gradient-to-b from-black via-black/90 to-black/55 backdrop-blur-sm">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 md:h-20 md:px-10 lg:px-14">
        <div className="flex min-w-0 items-center gap-6 lg:gap-9">
          <img
            className="w-24 shrink-0 object-contain sm:w-28 md:w-36 lg:w-40"
            src={NETFLIX_LOGO_URL}
            alt={HEADER_NETFLIX_LOGO_ALT}
          />

          {user && (
            <nav className="hidden items-center gap-5 text-sm font-medium text-zinc-200 md:flex">
              {navItems.map((item) => (
                <button
                  key={item}
                  className="text-left transition hover:text-zinc-400"
                  type="button"
                >
                  {item}
                </button>
              ))}
            </nav>
          )}
        </div>

        {user && (
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            {gptSearch && (
              <select
                name="lang"
                id=""
                className="text-black bg-white rounded-lg px-4 py-2"
                onChange={handleLangChange}
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option className="rounded-lg" value={lang.identifier} key={lang.identifier} >
                    {lang.name}
                  </option>
                ))}
              </select>
            )}

            <img
              className="h-8 w-8 rounded object-cover ring-1 ring-white/15 md:h-10 md:w-10"
              src={user?.photoURL || DEFAULT_PROFILE_IMAGE_URL}
              alt={HEADER_PROFILE_ALT}
            />
            <button
              className="py-2 px-4 bg-white text-black rounded-lg"
              onClick={handleGPTSearchClick}
            >
              {!gptSearch?'GPT Search':'Home Page'}
            </button>

            <button
              className="rounded bg-[#e50914] px-3 py-1.5 text-xs font-semibold text-white shadow-md shadow-black/30 transition hover:bg-[#f6121d] active:scale-95 sm:px-4 md:text-sm"
              onClick={handleSignOut}
              type="button"
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

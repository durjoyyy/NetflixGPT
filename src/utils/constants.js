// Image URLs
export const NETFLIX_LOGO_URL =
  "https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png";
export const DEFAULT_PROFILE_IMAGE_URL =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQETi_gIfzbGIGCYPFy8y6PLIEB6ZiccZ3wx55nFgVzlNiPBAKqfM1shJY&s=10";
export const LOGIN_BACKGROUND_IMAGE_URL =
  "https://xboxwire.thesourcemediaassets.com/sites/2/2023/05/Background-size1920x1080-4e1694a6-75aa-4c36-9d4d-7fb6a3102005-bc5318781aad7f5c8520.png";

// Route Paths
export const ROUTE_LOGIN = "/";
export const ROUTE_BROWSE = "/browse";

// Login Form Text
export const LOGIN_SIGN_IN = "Sign In";
export const LOGIN_SIGN_UP = "Sign Up";
export const LOGIN_NEW_TO_NETFLIX = "New to Netflix?";
export const LOGIN_ALREADY_USER = "Already an user?";
export const LOGIN_SIGN_UP_NOW = "Sign Up Now";
export const LOGIN_SIGN_IN_TEXT = "Sign In";
export const LOGIN_PLACEHOLDER_FULL_NAME = "Full Name";
export const LOGIN_PLACEHOLDER_EMAIL = "Email Address";
export const LOGIN_PLACEHOLDER_PASSWORD = "Password";

// Header Text
export const HEADER_NETFLIX_LOGO_ALT = "Netflix Logo";
export const HEADER_PROFILE_ALT = "Profile";
export const HEADER_SIGN_OUT = "Sign Out";

// Error Messages
export const AUTH_ERROR_PREFIX = "Auth error:";

export const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNWQyNzBiNzU0ODM0NTNlZGUzNjRiMzBjNmM4YTYyYiIsIm5iZiI6MTc4MTk4NTU2OC4yMTcsInN1YiI6IjZhMzZmMTIwY2I2MDVhMzMzODJjY2ZkMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vf0fDGZ8ov4D-Fe288WpfeJcVOmNcORh5aIxPrOIHbc",
  },
};


export const IMG_CDN_URL="https://image.tmdb.org/t/p/w500"


export const SUPPORTED_LANGUAGES = [
  { identifier: "en", name: "English" },
  { identifier: "hindi", name: "Hindi" },
  { identifier: "spanish", name: "Spanish" }
];





export const OPENAI_KEY = process.env.REACT_APP_OPENAI_KEY;
export const GEMINI_KEY = process.env.REACT_APP_GEMINI_KEY;
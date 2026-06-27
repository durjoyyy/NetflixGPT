# Netflix GPT

Netflix GPT is a React app built with Create React App and Tailwind CSS that uses Firebase auth, TMDB movie data, and Gemini-powered movie recommendations.

## What’s included

- Create React App base
- Tailwind CSS styling for CRA
- Firebase authentication with login, signup, sign out, and profile update
- Redux store for user and movie state
- TMDB movie fetching for now playing, top rated, popular, and upcoming lists
- YouTube trailer background on the browse page
- Responsive browse layout with movie cards and lists
- Multi-language support
- Gemini movie recommendation search feature
- Environment variable support for API keys

## Latest updates

- Added Gemini integration for movie recommendations
- Switched the GPT search flow to use `gemini-1.5-mini`
- Updated Gemini client config to use `REACT_APP_GEMINI_KEY`
- Kept the movie prompt focused on returning exactly 5 comma-separated titles
- Added safe query validation and error logging in `GPTSearchBar.jsx`

## Setup

1. Copy `.env.example` or create a `.env` file in the project root
2. Set the Gemini key:
   - `REACT_APP_GEMINI_KEY=your_gemini_api_key`
3. Install dependencies:
   - `npm install`


## Features

- Login and Signup Page
  - Sign in / Sign up forms
  - Redirect to browse page after auth
- Browse Page
  - Header
  - Background trailer video
  - Movie title and description
  - Movie suggestion lists
- Gemini Search
  - Movie recommendation input
  - Gemini-powered results

## Notes

- Gemini is used in this app for recommendation generation, but a valid Google API key is required.
- This project is a demo and does not include a dedicated backend proxy for secret key protection.

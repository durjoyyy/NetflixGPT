import React from "react";

const Header = () => {
  return (
    <div className= "z-10 absolute top-0 left-0 w-full px-8 py-2 bg-gradient-to-b from-black">
      <img
        className="w-44"
        src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
        alt="Netflix Logo"
      />
    </div>
  );
};

export default Header;

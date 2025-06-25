import React from "react";
import NavBar from "./ui/Navbar";

const PrivateLayout = ({ children }) => {
  return (
    <div>
      <NavBar />
      <main>{children}</main>
    </div>
  );
};

export default PrivateLayout;

import React from "react";
import Register from "../components/Register";
import Login from "../components/Login";
import {useSelector} from "react-redux";

const Auth = () => {
  return (
    <div>
      <Register />

      <Login />
    </div>
  );
};

export default Auth;

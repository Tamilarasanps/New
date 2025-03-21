import React from "react";
import "../../global.css"; // Ensure correct path or remove if unnecessary
import Layout from "../Layout";
import LogIn from "./common/LogIn/LogIn";
import SignUp from "./common/SignIn/SignUp";
import HomePage from "./Client/(frontPage)/HomePage";
import CategoryManager from "../(components)/Admin/CategoryManager";
import { LoadingProvider } from "../context/LoadingContext";

const index = () => {
  return (
    <LoadingProvider>
      <HomePage />
    </LoadingProvider>
  );
};

export default index;

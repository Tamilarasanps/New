import React from "react";
import "../../global.css"; // Ensure correct path or remove if unnecessary
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Stack } from "expo-router";
import SignUp from "./SignUp";

const Layout = () => {
  const queryClient = new QueryClient();

  return (
    <SignUp/>
  );
};

export default Layout;

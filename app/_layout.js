import React from "react";
import "../global.css"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Stack } from "expo-router";

const Layout = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen name="(components)" />
      </Stack>
    </QueryClientProvider>
  );
};

export default Layout;

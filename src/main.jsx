import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./router/Router";
import AuthProvider from "./context/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ThemeProvider from "./context/ThemeProvider";

// query client
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {" "}
        <ThemeProvider>
          {" "}
          <RouterProvider router={router}></RouterProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);

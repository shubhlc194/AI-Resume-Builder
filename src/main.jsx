import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import SsoCallback from "./auth/sign-in/SsoCallback.jsx";


import App from "./App.jsx";
import "./index.css";

import SignInPage from "./auth/sign-in/SignInPage.jsx";
import Home from "./home/index.jsx";
import DashBoard from "./dashboard/index.jsx";
import EditResume from "./dashboard/resume/[resumeid]/edit/index.jsx";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key");
}

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/dashboard",
        element: <DashBoard />,
      },
      {
        path: "/resume/:resumeid/edit",
        element: <EditResume />,
      },
    ],
  },
  {
    path: "/auth/sign-in",
    element: <SignInPage />,
  },
  {
    path: "/auth/sign-in/sso-callback",
    element: <SsoCallback />,
  },
]);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <RouterProvider router={router} />
    </ClerkProvider>
  </React.StrictMode>
);

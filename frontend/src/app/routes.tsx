import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "../features/auth/pages/LoginPage";
import { SignupPage } from "../features/auth/pages/SignupPage";
import { App } from "./app";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "signup",
        element: <SignupPage />,
      },
    ],
  },
]);
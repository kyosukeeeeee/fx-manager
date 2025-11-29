import { createBrowserRouter } from "react-router-dom"
import { LoginPage } from "../features/auth/pages/LoginPage"
import { SignupPage } from "../features/auth/pages/SignupPage"
import { DashBoardPage } from "../features/dashboard/pages/DashBoardPage"
import { App } from "./app"

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
      {
        path: "dashboard",
        element: <DashBoardPage />,
      },
    ],
  },
]);
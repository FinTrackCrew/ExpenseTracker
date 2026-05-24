import {
  useEffect,
} from "react";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import RootLayout from "./components/RootLayout";

import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";

import Overall from "./components/Overall";
import Expenses from "./components/Expenses";
import Savings from "./components/Savings";
import Profile from "./components/Profile";

import SessionExpiredModal from "./components/SessionExpiredModal";

import {
  useSessionStore,
} from "./store/sessionStore";

import {
  useAuth,
} from "./store/authStore";

function App() {

  const {
    sessionExpired,
  } = useSessionStore();

  const checkAuth =
    useAuth(
      (state) =>
        state.checkAuth
    );

  // =====================================================
  // CHECK AUTH ON APP LOAD
  // =====================================================

  useEffect(() => {

    checkAuth();

  }, []);

  // =====================================================
  // AUTO SESSION EXPIRY CHECK
  // =====================================================

 useEffect(() => {

  const protectedRoutes = [
    "/overall",
    "/expenses",
    "/savings",
    "/profile",
  ];

  const currentPath =
    window.location.pathname;

  // DON'T RUN
  // SESSION CHECK
  // ON PUBLIC PAGES

  if (
    !protectedRoutes.includes(
      currentPath
    )
  ) {

    return;
  }

  const interval =
    setInterval(() => {

      const expiry =
        localStorage.getItem(
          "sessionExpiry"
        );

      if (!expiry) {
        return;
      }

      const isExpired =
        Date.now() >=
        Number(expiry);

      if (isExpired) {

        localStorage.removeItem(
          "sessionExpiry"
        );

        useSessionStore
          .getState()
          .setSessionExpired(
            true
          );

        clearInterval(
          interval
        );
      }

    }, 1000);

  return () =>
    clearInterval(
      interval
    );

}, []);

  // =====================================================
  // ROUTES
  // =====================================================

  const routerObj =
    createBrowserRouter([
      {
        path: "/",

        element:
          <RootLayout />,

        children: [

          {
            path: "",

            element:
              <Home />,
          },

          {
            path:
              "register",

            element:
              <Register />,
          },

          {
            path:
              "login",

            element:
              <Login />,
          },

          {
            path:
              "overall",

            element:
              <Overall />,
          },

          {
            path:
              "expenses",

            element:
              <Expenses />,
          },

          {
            path:
              "savings",

            element:
              <Savings />,
          },

          {
            path:
              "profile",

            element:
              <Profile />,
          },
        ],
      },
    ]);

  return (
    <>
      <RouterProvider
        router={routerObj}
      />

      <SessionExpiredModal
        open={
          sessionExpired
        }
      />
    </>
  );
}

export default App;
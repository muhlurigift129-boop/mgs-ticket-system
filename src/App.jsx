import {
  HashRouter,
  Routes,
  Route,
  Navigate,
  useNavigate
} from "react-router-dom"

import { useState } from "react"

import WelcomeScreen from "./components/WelcomeScreen.jsx"
import Home from "./components/Home.jsx"
import Register from "./components/Register.jsx"
import Payment from "./components/Payment.jsx"
import Success from "./components/Success.jsx"
import Scanner from "./components/Scanner.jsx"
import Admin from "./components/Admin.jsx"
import AdminLogin from "./components/AdminLogin.jsx"

import Login from "./components/Login.jsx"
import MyAccount from "./components/MyAccount.jsx"

// PROTECTED ADMIN ROUTE
function ProtectedAdmin({ children }) {

  const isAdmin =
    localStorage.getItem("mgs_admin")

  if (isAdmin !== "true") {
    return <Navigate to="/admin-login" />
  }

  return children
}

// 404 PAGE
function NotFound() {

  const navigate = useNavigate()

  return (

    <div
      style={{
        background:
          "linear-gradient(to bottom,#000,#111)",
        color: "red",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center"
      }}
    >

      <h1
        style={{
          fontSize: "90px"
        }}
      >
        404
      </h1>

      <h2>
        PAGE NOT FOUND
      </h2>

      <button
        onClick={() => navigate("/")}
        style={{
          marginTop: "20px",
          padding: "15px 40px",
          background: "red",
          border: "none",
          borderRadius: "10px",
          color: "white",
          cursor: "pointer"
        }}
      >
        BACK HOME
      </button>

    </div>

  )
}

export default function App() {

  const [loading, setLoading] =
    useState(true)

  return (

    <HashRouter>

      <Routes>

        {loading ? (

          <Route
            path="*"
            element={
              <WelcomeScreen
                onFinish={() =>
                  setLoading(false)
                }
              />
            }
          />

        ) : (

          <>

            <Route
              path="/"
              element={<Home />}
            />

            <Route
              path="/register"
              element={<Register />}
            />

            <Route
              path="/payment"
              element={<Payment />}
            />

            <Route
              path="/success"
              element={<Success />}
            />

            <Route
              path="/scanner"
              element={<Scanner />}
            />

            {/* ADMIN LOGIN */}
            <Route
              path="/admin-login"
              element={<AdminLogin />}
            />

            {/* PROTECTED ADMIN */}
            <Route
              path="/admin"
              element={
                <ProtectedAdmin>
                  <Admin />
                </ProtectedAdmin>
              }
            />

            <Route
              path=""
              element={<Navigate to="/" />}
            />

            <Route
              path="*"
              element={<NotFound />}
            />

            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="/my-account"
              element={<MyAccount />}
            />

          </>

        )}

      </Routes>

    </HashRouter>

  )
}

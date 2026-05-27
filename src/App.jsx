import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate
}
from "react-router-dom"

import { useState } from "react"

import WelcomeScreen from "./components/WelcomeScreen.jsx"

import Home from "./components/Home.jsx"
import Register from "./components/Register.jsx"
import Payment from "./components/Payment.jsx"
import Success from "./components/Success.jsx"
import Scanner from "./components/Scanner.jsx"
import Admin from "./components/Admin.jsx"


// 404 COMPONENT
function NotFound() {

  const navigate = useNavigate()

  return (

    <div
      style={{
        background:
          "linear-gradient(to bottom, #000, #111)",

        color: "red",

        minHeight: "100vh",

        display: "flex",

        justifyContent: "center",

        alignItems: "center",

        flexDirection: "column",

        fontFamily: "Arial",

        textAlign: "center",

        padding: "20px"
      }}
    >

      <h1
        style={{
          fontSize: "90px",
          marginBottom: "10px",
          textShadow:
            "0 0 20px rgba(255,0,0,0.8)"
        }}
      >
        404
      </h1>

      <h2
        style={{
          letterSpacing: "3px"
        }}
      >
        PAGE NOT FOUND
      </h2>

      <p
        style={{
          color: "#ccc",
          marginTop: "10px",
          maxWidth: "400px"
        }}
      >
        The page you are trying to access
        does not exist inside the MGS
        production system.
      </p>

      <button
        onClick={() => navigate("/")}

        style={{
          marginTop: "30px",

          padding: "15px 40px",

          background: "red",

          border: "none",

          borderRadius: "12px",

          color: "white",

          cursor: "pointer",

          fontSize: "16px",

          fontWeight: "bold",

          boxShadow:
            "0 0 20px rgba(255,0,0,0.6)",

          transition: "0.3s"
        }}
      >

        BACK HOME

      </button>

    </div>

  )

}


export default function App() {

  const [loading, setLoading] = useState(true)

  return (

    <BrowserRouter>

      {

        loading ? (

          <WelcomeScreen
            onFinish={() => setLoading(false)}
          />

        ) : (

          <Routes>

            {/* HOME */}
            <Route
              path="/"
              element={<Home />}
            />

            {/* REGISTER */}
            <Route
              path="/register"
              element={<Register />}
            />

            {/* PAYMENT */}
            <Route
              path="/payment"
              element={<Payment />}
            />

            {/* SUCCESS */}
            <Route
              path="/success"
              element={<Success />}
            />

            {/* SCANNER */}
            <Route
              path="/scanner"
              element={<Scanner />}
            />

            {/* ADMIN */}
            <Route
              path="/admin"
              element={<Admin />}
            />

            {/* REDIRECT EMPTY */}
            <Route
              path=""
              element={<Navigate to="/" />}
            />

            {/* 404 */}
            <Route
              path="*"
              element={<NotFound />}
            />

          </Routes>

        )

      }

    </BrowserRouter>

  )

}
import {
  HashRouter,
  Routes,
  Route,
  Navigate,
  useNavigate
} from "react-router-dom"

import {
  useState,
  useEffect
} from "react"

import {
  auth
} from "./firebase/config"

import {
  onAuthStateChanged
} from "firebase/auth"

import Navbar from "./components/Navbar.jsx"

import WelcomeScreen from "./components/WelcomeScreen.jsx"

import Home from "./components/Home.jsx"
import Register from "./components/Register.jsx"
import Login from "./components/Login.jsx"

import MyAccount from "./components/MyAccount.jsx"
import Orders from "./components/Orders.jsx"
import Contact from "./components/Contact.jsx"

import Payment from "./components/Payment.jsx"
import Success from "./components/Success.jsx"

import Scanner from "./components/Scanner.jsx"

import Admin from "./components/Admin.jsx"
import AdminLogin from "./components/AdminLogin.jsx"

// ========================================
// ADMIN PROTECTION
// ========================================

function ProtectedAdmin({ children }) {

  const isAdmin =
    localStorage.getItem(
      "mgs_admin"
    )

  if (isAdmin !== "true") {

    return (
      <Navigate
        to="/admin-login"
        replace
      />
    )

  }

  return children
}

// ========================================
// USER PROTECTION
// ========================================

function ProtectedAccount({
  children
}) {

  const user =
    auth.currentUser

  if (!user) {

    return (
      <Navigate
        to="/login"
        replace
      />
    )

  }

  return children
}

// ========================================
// NOT FOUND
// ========================================

function NotFound() {

  const navigate =
    useNavigate()

  return (

    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(to bottom,#000,#111)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        color: "white"
      }}
    >

      <h1
        style={{
          color: "red",
          fontSize: "100px",
          margin: 0
        }}
      >
        404
      </h1>

      <h2>
        PAGE NOT FOUND
      </h2>

      <button
        onClick={() =>
          navigate("/")
        }
        style={{
          marginTop: "20px",
          background: "red",
          color: "white",
          border: "none",
          padding: "15px 35px",
          borderRadius: "12px",
          cursor: "pointer"
        }}
      >
        BACK HOME
      </button>

    </div>

  )

}

// ========================================
// APP
// ========================================

export default function App() {

  const [loading,
    setLoading] =
    useState(true)

  const [authLoading,
    setAuthLoading] =
    useState(true)

  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(

        auth,

        () => {

          setAuthLoading(false)

        }

      )

    return () =>
      unsubscribe()

  }, [])

  if (authLoading) {

    return (

      <div
        style={{
          minHeight: "100vh",
          background: "#000",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        Loading...
      </div>

    )

  }

  return (

    <HashRouter>

      <Navbar />

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

            {/* HOME */}

            <Route
              path="/"
              element={<Home />}
            />

            {/* AUTH */}

            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="/register"
              element={<Register />}
            />

            {/* ACCOUNT */}

            <Route
              path="/my-account"
              element={
                <ProtectedAccount>
                  <MyAccount />
                </ProtectedAccount>
              }
            />

            {/* ORDERS */}

            <Route
              path="/orders"
              element={
                <ProtectedAccount>
                  <Orders />
                </ProtectedAccount>
              }
            />

            {/* CONTACT */}

            <Route
              path="/contact"
              element={<Contact />}
            />

            {/* PAYMENT */}

            <Route
              path="/payment"
              element={<Payment />}
            />

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
              path="/admin-login"
              element={<AdminLogin />}
            />

            <Route
              path="/admin"
              element={

                <ProtectedAdmin>

                  <Admin />

                </ProtectedAdmin>

              }
            />

            {/* 404 */}

            <Route
              path="*"
              element={<NotFound />}
            />

          </>

        )}

      </Routes>

    </HashRouter>

  )

}

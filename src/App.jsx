import {
  HashRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom"

import {
  useState,
  useEffect
} from "react"

import { auth } from "./firebase/config"
import MgsAI from "./ai/MgsAI"
import { onAuthStateChanged } from "firebase/auth"

import MgsSidebar from "./components/MgsSidebar.jsx"

import WelcomeScreen from "./components/WelcomeScreen.jsx"
import Home from "./components/Home.jsx"
import Login from "./components/Login.jsx"
import RegisterAccount from "./components/RegisterAccount.jsx"

import MyAccount from "./components/MyAccount.jsx"
import Orders from "./components/Orders.jsx"
import Contact from "./components/Contact.jsx"

import Payment from "./components/Payment.jsx"
import Success from "./components/Success.jsx"

import Scanner from "./components/Scanner.jsx"

import Admin from "./components/Admin.jsx"
import AdminLogin from "./components/AdminLogin.jsx"

// ======================================
// USER PROTECTION
// ======================================

function ProtectedRoute({ children }) {

  if (!auth.currentUser) {

    return <Navigate to="/login" replace />

  }

  return children

}

// ======================================
// ADMIN PROTECTION
// ======================================

function ProtectedAdmin({ children }) {

  const admin =
    localStorage.getItem("mgs_admin")

  if (admin !== "true") {

    return (
      <Navigate
        to="/admin-login"
        replace
      />
    )

  }

  return children

}

// ======================================
// 404 PAGE
// ======================================

function NotFound() {

  return (

    <div
      style={{
        minHeight: "100vh",
        background: "#000",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
      }}
    >

      <h1
        style={{
          color: "red",
          fontSize: "90px"
        }}
      >
        404
      </h1>

      <p>Page Not Found</p>

    </div>

  )

}

// ======================================
// APP
// ======================================

export default function App() {

  const [showWelcome, setShowWelcome] =
    useState(true)

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(auth, () => {

        setLoading(false)

      })

    return unsubscribe

  }, [])

  if (loading) {

    return (

      <div
        style={{
          background: "#000",
          color: "white",
          height: "100vh",
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

      <MgsSidebar />
      
      <MgsAI />
      
      <Routes>

        {showWelcome ? (

          <Route

            path="*"

            element={

              <WelcomeScreen

                onFinish={() =>

                  setShowWelcome(false)

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

            {/* LOGIN */}

            <Route

              path="/login"

              element={<Login />}

            />

            {/* REGISTER */}

            <Route

              path="/register-account"

              element={<RegisterAccount />}

            />

            {/* ACCOUNT */}

            <Route

              path="/my-account"

              element={

                <ProtectedRoute>

                  <MyAccount />

                </ProtectedRoute>

              }

            />

            {/* ORDERS */}

            <Route

              path="/orders"

              element={

                <ProtectedRoute>

                  <Orders />

                </ProtectedRoute>

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

            {/* SUCCESS */}

            <Route

              path="/success"

              element={<Success />}

            />

            {/* QR SCANNER */}

            <Route

              path="/scanner"

              element={<Scanner />}

            />

            {/* ADMIN LOGIN */}

            <Route

              path="/admin-login"

              element={<AdminLogin />}

            />

            {/* ADMIN */}

            <Route

              path="/admin"

              element={

                <ProtectedAdmin>

                  <Admin />

                </ProtectedAdmin>

              }

            />

            {/* DEFAULT */}

            <Route

              path=""

              element={<Navigate to="/" />}

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

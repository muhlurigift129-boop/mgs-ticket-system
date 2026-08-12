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

import {
  auth
} from "./firebase/config"

import {
  onAuthStateChanged
} from "firebase/auth"

import RegisterAccount from "./components/RegisterAccount.jsx"
import MgsSidebar from "./components/MgsSidebar.jsx"

import WelcomeScreen from "./components/WelcomeScreen.jsx"

import Home from "./components/Home.jsx"
import Login from "./components/Login.jsx"

import MyAccount from "./components/MyAccount.jsx"
import Orders from "./components/Orders.jsx"
import Contact from "./components/Contact.jsx"

import Payment from "./components/Payment.jsx"
import Success from "./components/Success.jsx"

import Scanner from "./components/Scanner.jsx"

import Admin from "./components/Admin.jsx"
import AdminLogin from "./components/AdminLogin.jsx"


// ==========================================
// ADMIN PROTECTION
// ==========================================

function ProtectedAdmin({ children }) {

  const isAdmin =
    localStorage.getItem("mgs_admin")

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


// ==========================================
// USER PROTECTION
// ==========================================

function ProtectedAccount({ children }) {

  const user = auth.currentUser

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


// ==========================================
// 404 PAGE
// ==========================================

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
        flexDirection: "column",
        padding: "20px",
        textAlign: "center"
      }}
    >

      <h1
        style={{
          color: "red",
          fontSize: "90px",
          margin: 0
        }}
      >
        404
      </h1>

      <h2>
        PAGE NOT FOUND
      </h2>

      <button
        onClick={() => {
          window.location.hash = "#/"
        }}
        style={{
          marginTop: "20px",
          background: "red",
          color: "white",
          border: "none",
          padding: "14px 25px",
          borderRadius: "10px",
          cursor: "pointer",
          fontWeight: "bold"
        }}
      >
        GO HOME
      </button>

    </div>

  )
}


// ==========================================
// APP
// ==========================================

export default function App() {

  const [showWelcome, setShowWelcome] =
    useState(true)

  const [authLoading, setAuthLoading] =
    useState(true)


  // ========================================
  // FIREBASE AUTH LISTENER
  // ========================================

  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(
        auth,
        () => {

          setAuthLoading(false)

        }
      )

    return () => unsubscribe()

  }, [])


  // ========================================
  // AUTH LOADING
  // ========================================

  if (authLoading) {

    return (

      <div
        style={{
          minHeight: "100vh",
          background: "#000",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "20px"
        }}
      >
        Loading...
      </div>

    )

  }


  // ========================================
  // WELCOME SCREEN
  // ========================================

  if (showWelcome) {

    return (

      <WelcomeScreen
        onFinish={() => {
          setShowWelcome(false)
        }}
      />

    )

  }


  // ========================================
  // MAIN APPLICATION
  // ========================================

  return (

    <HashRouter>

      {/* SIDEBAR */}

      <MgsSidebar />


      {/* ROUTES */}

      <Routes>


        {/* ================================
            HOME
        ================================= */}

        <Route
          path="/"
          element={<Home />}
        />


        {/* ================================
            LOGIN
        ================================= */}

        <Route
          path="/login"
          element={<Login />}
        />


        {/* ================================
            REGISTER ACCOUNT
        ================================= */}

        <Route
          path="/register-account"
          element={<RegisterAccount />}
        />


        {/* ================================
            MY ACCOUNT
        ================================= */}

        <Route
          path="/my-account"
          element={
            <ProtectedAccount>
              <MyAccount />
            </ProtectedAccount>
          }
        />


        {/* ================================
            ORDERS
        ================================= */}

        <Route
          path="/orders"
          element={
            <ProtectedAccount>
              <Orders />
            </ProtectedAccount>
          }
        />


        {/* ================================
            CONTACT
        ================================= */}

        <Route
          path="/contact"
          element={<Contact />}
        />


        {/* ================================
            PAYMENT
        ================================= */}

        <Route
          path="/payment"
          element={<Payment />}
        />


        {/* ================================
            SUCCESS
        ================================= */}

        <Route
          path="/success"
          element={<Success />}
        />


        {/* ================================
            SCANNER
        ================================= */}

        <Route
          path="/scanner"
          element={<Scanner />}
        />


        {/* ================================
            ADMIN LOGIN
        ================================= */}

        <Route
          path="/admin-login"
          element={<AdminLogin />}
        />


        {/* ================================
            ADMIN
        ================================= */}

        <Route
          path="/admin"
          element={
            <ProtectedAdmin>
              <Admin />
            </ProtectedAdmin>
          }
        />


        {/* ================================
            404
        ================================= */}

        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>

    </HashRouter>

  )

}
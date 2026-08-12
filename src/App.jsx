import { useEffect, useState } from "react"

import {
  HashRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom"

import {
  onAuthStateChanged
} from "firebase/auth"

import { auth } from "./firebase/config"

// ===============================
// COMPONENTS
// ===============================

import MgsSidebar from "./components/MgsSidebar.jsx"
import WelcomeScreen from "./components/WelcomeScreen.jsx"

import Home from "./components/Home.jsx"
import Login from "./components/Login.jsx"
import RegisterAccount from "./components/RegisterAccount.jsx"
import Register from "./components/Register.jsx"

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

  const [checking, setChecking] =
    useState(true)

  const [user, setUser] =
    useState(null)


  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(
        auth,
        currentUser => {

          setUser(currentUser)
          setChecking(false)

        }
      )

    return () => unsubscribe()

  }, [])


  if (checking) {

    return (
      <div style={loadingPage}>
        CHECKING ACCOUNT...
      </div>
    )

  }


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
// REGISTER TICKET PROTECTION
// ==========================================

function ProtectedRegister({ children }) {

  const [checking, setChecking] =
    useState(true)

  const [user, setUser] =
    useState(null)


  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(
        auth,
        currentUser => {

          setUser(currentUser)
          setChecking(false)

        }
      )

    return () => unsubscribe()

  }, [])


  if (checking) {

    return (
      <div style={loadingPage}>
        CHECKING LOGIN...
      </div>
    )

  }


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

    <div style={notFoundPage}>

      <h1 style={notFoundTitle}>
        404
      </h1>

      <h2>
        PAGE NOT FOUND
      </h2>

      <button
        onClick={() => {
          window.location.hash = "/"
        }}
        style={homeButton}
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
  // FIREBASE AUTH INITIALIZATION
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
  // FIREBASE LOADING
  // ========================================

  if (authLoading) {

    return (

      <div style={loadingPage}>

        <h2>
          MGS EVENTS
        </h2>

        <p>
          LOADING...
        </p>

      </div>

    )

  }


  // ========================================
  // WELCOME SCREEN
  // ========================================

  if (showWelcome) {

    return (

      <WelcomeScreen
        onFinish={() =>
          setShowWelcome(false)
        }
      />

    )

  }


  // ========================================
  // ROUTER
  // ========================================

  return (

    <HashRouter>

      <MgsSidebar />

      <Routes>

        {/* =================================
            HOME
        ================================= */}

        <Route
          path="/"
          element={<Home />}
        />


        {/* =================================
            LOGIN
        ================================= */}

        <Route
          path="/login"
          element={<Login />}
        />


        {/* =================================
            CREATE ACCOUNT
        ================================= */}

        <Route
          path="/register-account"
          element={<RegisterAccount />}
        />


        {/* =================================
            REGISTER TICKET
            THIS IS THE IMPORTANT ROUTE
        ================================= */}

        <Route
          path="/register"
          element={
            <ProtectedRegister>
              <Register />
            </ProtectedRegister>
          }
        />


        {/* =================================
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


        {/* =================================
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


        {/* =================================
            CONTACT
        ================================= */}

        <Route
          path="/contact"
          element={<Contact />}
        />


        {/* =================================
            PAYMENT
        ================================= */}

        <Route
          path="/payment"
          element={<Payment />}
        />


        {/* =================================
            SUCCESS
        ================================= */}

        <Route
          path="/success"
          element={<Success />}
        />


        {/* =================================
            SCANNER
        ================================= */}

        <Route
          path="/scanner"
          element={<Scanner />}
        />


        {/* =================================
            ADMIN LOGIN
        ================================= */}

        <Route
          path="/admin-login"
          element={<AdminLogin />}
        />


        {/* =================================
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


        {/* =================================
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


// ==========================================
// LOADING PAGE
// ==========================================

const loadingPage = {

  minHeight: "100vh",

  background: "#000",

  color: "white",

  display: "flex",

  flexDirection: "column",

  justifyContent: "center",

  alignItems: "center",

  textAlign: "center"

}


// ==========================================
// 404 PAGE
// ==========================================

const notFoundPage = {

  minHeight: "100vh",

  background: "#000",

  color: "white",

  display: "flex",

  flexDirection: "column",

  justifyContent: "center",

  alignItems: "center",

  textAlign: "center",

  padding: "20px",

  boxSizing: "border-box"

}


const notFoundTitle = {

  color: "red",

  fontSize: "90px",

  margin: "0",

  lineHeight: "1"

}


const homeButton = {

  marginTop: "25px",

  padding: "14px 30px",

  background: "red",

  color: "white",

  border: "none",

  borderRadius: "10px",

  fontWeight: "bold",

  cursor: "pointer"

}
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
import Navbar from "./components/Navbar.jsx"
import MgsSidebar from "./components/MgsSidebar.jsx"

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

// =========================
// ADMIN PROTECTION
// =========================
function ProtectedAdmin({ children }) {

  const isAdmin =
    localStorage.getItem("mgs_admin")

  if (isAdmin !== "true") {
    return <Navigate to="/admin-login" />
  }

  return children
}

// =========================
// USER PROTECTION (Firebase)
// =========================
function ProtectedAccount({ children }) {

  const user = auth.currentUser

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}

// =========================
// PROTECTED REGISTER (FORCE LOGIN BEFORE BUY)
// =========================
function ProtectedRoute({ children }) {

  const user = auth.currentUser

  if (!user) {
    return <Navigate to="/login" />
  }

  return children
}

  if (!user) {
    return <Navigate to="/login" />
  }

  return children
}

// =========================
// 404 PAGE
// =========================
function NotFound() {

  return (
    <div style={{
      minHeight: "100vh",
      background: "#000",
      color: "white",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column"
    }}>
      <h1 style={{ color: "red", fontSize: "90px" }}>
        404
      </h1>
      <p>Page not found</p>
    </div>
  )
}

// =========================
// APP
// =========================
export default function App() {

  const [loading, setLoading] = useState(true)
  const [authLoading, setAuthLoading] = useState(true)

  useEffect(() => {

    const unsub = onAuthStateChanged(auth, () => {
      setAuthLoading(false)
    })

    return () => unsub()

  }, [])

  if (authLoading) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "#000",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
        Loading...
      </div>
    )
  }

  return (
    <HashRouter>

      <MgsSidebar />
      <Navbar />

      <Routes>

        {/* WELCOME SCREEN CONTROL */}
        {loading ? (
          <Route
            path="*"
            element={
              <WelcomeScreen
                onFinish={() => setLoading(false)}
              />
            }
          />
        ) : (
          <>
            {/* HOME */}
            <Route path="/" element={<Home />} />
 
            {/* AUTH */}
            <Route path="/login" element={<Login />} />

            {/* REGISTER (PROTECTED BUY FLOW) */}
            <Route
              path="/register"
              element={<RegisterAccount />}
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
            <Route path="/contact" element={<Contact />} />

            {/* PAYMENT */}
            <Route path="/payment" element={<Payment />} />

            {/* SUCCESS */}
            <Route path="/success" element={<Success />} />

            {/* SCANNER */}
            <Route path="/scanner" element={<Scanner />} />

            {/* ADMIN LOGIN */}
            <Route path="/admin-login" element={<AdminLogin />} />

            {/* ADMIN */}
            <Route
              path="/admin"
              element={
                <ProtectedAdmin>
                  <Admin />
                </ProtectedAdmin>
              }
            />

            {/* DEFAULT REDIRECT */}
            <Route path="" element={<Navigate to="/" />} />
  
            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </>
        )}

      </Routes>

    </HashRouter>
  )
}

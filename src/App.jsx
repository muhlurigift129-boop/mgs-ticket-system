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

// 404 PAGE
function NotFound() {
  const navigate = useNavigate()

  return (
    <div style={{
      background: "linear-gradient(to bottom, #000, #111)",
      color: "red",
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      fontFamily: "Arial",
      textAlign: "center",
      padding: "20px"
    }}>

      <h1 style={{ fontSize: "90px", marginBottom: "10px" }}>
        404
      </h1>

      <h2>PAGE NOT FOUND</h2>

      <p style={{ color: "#ccc", marginTop: "10px", maxWidth: "400px" }}>
        This route does not exist.
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
          fontWeight: "bold"
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
    <HashRouter>
      <Routes>

        {/* LOADING SCREEN ROUTE */}
        {loading && (
          <Route
            path="*"
            element={
              <WelcomeScreen onFinish={() => setLoading(false)} />
            }
          />
        )}

        {/* MAIN ROUTES */}
        {!loading && (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/success" element={<Success />} />
            <Route path="/scanner" element={<Scanner />} />
            <Route path="/admin" element={<Admin />} />

            {/* FIX ROOT REDIRECT */}
            <Route path="" element={<Navigate to="/" />} />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </>
        )}

      </Routes>
    </HashRouter>
  )
}
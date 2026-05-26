import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState } from "react"

import WelcomeScreen from "./components/WelcomeScreen"

import Home from "./components/Home"
import Register from "./components/Register"
import Success from "./components/Success"
import Scanner from "./components/Scanner"
import Payment from "./components/Payment"

// OPTIONAL
// Create this later if you want admin dashboard
// import Admin from "./components/Admin"

export default function App() {

  const [loading, setLoading] = useState(true)

  return (

    <>

      {

        loading ? (

          <WelcomeScreen
            onFinish={() => setLoading(false)}
          />

        ) : (

          <BrowserRouter>

            <Routes>

              {/* HOME PAGE */}
              <Route
                path="/"
                element={<Home />}
              />

              {/* REGISTER PAGE */}
              <Route
                path="/register"
                element={<Register />}
              />

              {/* PAYMENT PAGE */}
              <Route
                path="/payment"
                element={<Payment />}
              />

              {/* SUCCESS PAGE */}
              <Route
                path="/success"
                element={<Success />}
              />

              {/* QR SCANNER */}
              <Route
                path="/scanner"
                element={<Scanner />}
              />

              {/* OPTIONAL ADMIN PAGE */}
              {/*
              <Route
                path="/admin"
                element={<Admin />}
              />
              */}

              {/* 404 PAGE */}
              <Route
                path="*"
                element={

                  <div style={{
                    background: "black",
                    color: "red",
                    height: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    fontFamily: "Arial"
                  }}>

                    <h1 style={{
                      fontSize: "70px",
                      marginBottom: "10px"
                    }}>
                      404
                    </h1>

                    <h2>
                      PAGE NOT FOUND
                    </h2>

                    <p style={{
                      color: "white"
                    }}>
                      MGS SYSTEM ERROR
                    </p>

                    <button
                      onClick={() => window.location.href = "/"}

                      style={{
                        marginTop: "20px",
                        padding: "15px 30px",
                        background: "red",
                        border: "none",
                        borderRadius: "10px",
                        color: "white",
                        cursor: "pointer",
                        fontSize: "16px"
                      }}
                    >

                      BACK HOME

                    </button>

                  </div>

                }
              />

            </Routes>

          </BrowserRouter>

        )

      }

    </>

  )

}
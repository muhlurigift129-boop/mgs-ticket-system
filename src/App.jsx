import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState } from "react"

import WelcomeScreen from "./components/WelcomeScreen.jsx"

import Home from "./components/Home.jsx"
import Register from "./components/Register.jsx"
import Success from "./components/Success.jsx"
import Scanner from "./components/Scanner.jsx"
import Payment from "./components/Payment.jsx"

// OPTIONAL
// import Admin from "./components/Admin.jsx"

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

              {/* QR SCANNER */}
              <Route
                path="/scanner"
                element={<Scanner />}
              />

              {/* OPTIONAL ADMIN */}
              {/*
              <Route
                path="/admin"
                element={<Admin />}
              />
              */}

              {/* 404 */}
              <Route
                path="*"
                element={

                  <div
                    style={{
                      background: "black",
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
                        fontSize: "80px",
                        marginBottom: "10px"
                      }}
                    >
                      404
                    </h1>

                    <h2>
                      PAGE NOT FOUND
                    </h2>

                    <p
                      style={{
                        color: "white",
                        marginTop: "10px"
                      }}
                    >
                      MGS SYSTEM ERROR
                    </p>

                    <button
                      onClick={() => window.location.href = "/"}

                      style={{
                        marginTop: "25px",
                        padding: "15px 35px",
                        background: "red",
                        border: "none",
                        borderRadius: "12px",
                        color: "white",
                        cursor: "pointer",
                        fontSize: "16px",
                        fontWeight: "bold",
                        boxShadow: "0 0 15px rgba(255,0,0,0.6)"
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
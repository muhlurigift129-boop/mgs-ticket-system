import { useEffect, useState } from "react"
import logo from "../assets/logo.png"

export default function WelcomeScreen({ onFinish }) {

  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {

    const fadeTimer = setTimeout(() => {
      setFadeOut(true)
    }, 5000)

    const finishTimer = setTimeout(() => {
      onFinish()
    }, 6000)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(finishTimer)
    }

  }, [onFinish])

  return (

    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100vh",
      background: "black",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      zIndex: 9999,
      opacity: fadeOut ? 0 : 1,
      transition: "opacity 1s ease"
    }}>

      <img
        src={logo}
        alt="MGS Logo"
        style={{
          width: "260px",
          animation: "pulse 2s infinite"
        }}
      />

      <h1 style={{
        color: "red",
        marginTop: "30px",
        fontSize: "38px",
        letterSpacing: "4px",
        fontWeight: "bold"
      }}>
        MGS EVENTS
      </h1>

      <p style={{
        color: "white",
        marginTop: "10px",
        fontSize: "18px",
        letterSpacing: "2px"
      }}>
        BUILT FROM THE GROUND UP
      </p>

      <div style={{
        marginTop: "40px",
        width: "220px",
        height: "6px",
        background: "#222",
        borderRadius: "20px",
        overflow: "hidden"
      }}>

        <div style={{
          width: "100%",
          height: "100%",
          background: "red",
          animation: "loading 6s linear"
        }}></div>

      </div>

      <style>
        {`
          @keyframes pulse {
            0% {
              transform: scale(1);
            }

            50% {
              transform: scale(1.05);
            }

            100% {
              transform: scale(1);
            }
          }

          @keyframes loading {
            from {
              width: 0%;
            }

            to {
              width: 100%;
            }
          }
        `}
      </style>

    </div>

  )
}
import { useNavigate } from "react-router-dom"

export default function Home() {

  const navigate = useNavigate()

  return (

    <div style={{
      background: "linear-gradient(to bottom, #000000, #111111)",
      minHeight: "100vh",
      color: "white",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      padding: "30px",
      fontFamily: "Arial"
    }}>

      {/* LOGO */}
      <h1 style={{
        color: "red",
        fontSize: "90px",
        marginBottom: "10px",
        letterSpacing: "8px",
        textShadow: "0 0 20px red"
      }}>
        MGS
      </h1>

      {/* EVENT TITLE */}
      <h2 style={{
        fontSize: "32px",
        marginBottom: "10px"
      }}>
        JULY 31 — AUGUST 01
      </h2>

      {/* SUBTEXT */}
      <p style={{
        maxWidth: "650px",
        color: "#cccccc",
        marginTop: "10px",
        lineHeight: "1.8",
        fontSize: "18px"
      }}>
        Experience music, games, food, drinks and unforgettable vibes
        at the biggest MGS lifestyle event.
      </p>

      {/* EVENT INFO CARD */}
      <div style={{
        background: "#111",
        marginTop: "40px",
        padding: "25px",
        borderRadius: "20px",
        border: "1px solid red",
        boxShadow: "0 0 20px rgba(255,0,0,0.4)",
        width: "100%",
        maxWidth: "500px"
      }}>

        <h3 style={{
          color: "red",
          marginBottom: "20px"
        }}>
          TICKET OPTIONS
        </h3>

        <div style={{
          marginBottom: "15px"
        }}>
          <h2 style={{
            margin: 0
          }}>
            R300
          </h2>

          <p style={{
            color: "#bbb"
          }}>
            FULL EVENT ACCESS
          </p>
        </div>

        <div>
          <h2 style={{
            margin: 0
          }}>
            R100
          </h2>

          <p style={{
            color: "#bbb"
          }}>
            VIBE ACCESS
          </p>
        </div>

      </div>

      {/* BUTTONS */}
      <div style={{
        marginTop: "45px",
        display: "flex",
        gap: "20px",
        flexWrap: "wrap",
        justifyContent: "center"
      }}>

        <button
          onClick={() => navigate("/register")}

          style={{
            padding: "18px 50px",
            background: "red",
            color: "white",
            border: "none",
            borderRadius: "12px",
            fontSize: "20px",
            cursor: "pointer",
            fontWeight: "bold",
            boxShadow: "0 0 15px rgba(255,0,0,0.6)"
          }}
        >
          GET TICKETS
        </button>

        <button
          onClick={() => navigate("/scanner")}

          style={{
            padding: "18px 40px",
            background: "#1a1a1a",
            color: "white",
            border: "1px solid red",
            borderRadius: "12px",
            fontSize: "18px",
            cursor: "pointer"
          }}
        >
          QR SCANNER
        </button>

      </div>

      {/* FOOTER */}
      <p style={{
        marginTop: "50px",
        color: "#666",
        fontSize: "14px"
      }}>
        Powered By MGS SYSTEMS
      </p>

    </div>

  )

}
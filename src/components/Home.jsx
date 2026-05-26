import { useState } from "react"

export default function Home() {

  const [ticketType, setTicketType] = useState("full")
  const [quantity, setQuantity] = useState(1)

  const ticketPrice =
    ticketType === "full"
      ? 300
      : 100

  const total = ticketPrice * quantity

  function handleProceed() {

    localStorage.setItem(
      "ticketData",
      JSON.stringify({
        ticketType,
        quantity,
        total
      })
    )

    window.location.href = "/register"

  }

  return (

    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(to bottom, #000000, #111111)",
      color: "white",
      padding: "40px"
    }}>

      <div style={{
        textAlign: "center",
        marginTop: "30px"
      }}>

        <h1 style={{
          color: "red",
          fontSize: "65px",
          marginBottom: "10px",
          letterSpacing: "4px",
          fontWeight: "900"
        }}>
          MGS EVENTS
        </h1>

        <p style={{
          color: "#ccc",
          fontSize: "22px",
          letterSpacing: "2px"
        }}>
          JULY 31 — AUGUST 01
        </p>

        <p style={{
          color: "#888",
          marginTop: "10px"
        }}>
          BUILT FROM THE GROUND UP
        </p>

      </div>

      <div style={{
        maxWidth: "550px",
        margin: "50px auto",
        background: "#111",
        padding: "40px",
        borderRadius: "20px",
        boxShadow: "0 0 30px rgba(255,0,0,0.5)"
      }}>

        <h2 style={{
          color: "red",
          marginBottom: "30px",
          textAlign: "center",
          fontSize: "32px"
        }}>
          SELECT YOUR TICKET
        </h2>

        <div style={{
          marginBottom: "25px"
        }}>

          <button
            onClick={() => setTicketType("full")}

            style={{
              width: "100%",
              padding: "20px",
              marginBottom: "18px",
              borderRadius: "15px",
              border: ticketType === "full"
                ? "2px solid red"
                : "2px solid #333",
              background: ticketType === "full"
                ? "rgba(255,0,0,0.15)"
                : "#1a1a1a",
              color: "white",
              fontSize: "20px",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "0.3s"
            }}
          >

            🔥 FULL EVENT — R300

            <div style={{
              fontSize: "14px",
              color: "#aaa",
              marginTop: "8px",
              fontWeight: "normal"
            }}>
              Access To Entire Event Experience
            </div>

          </button>

          <button
            onClick={() => setTicketType("vibe")}

            style={{
              width: "100%",
              padding: "20px",
              borderRadius: "15px",
              border: ticketType === "vibe"
                ? "2px solid red"
                : "2px solid #333",
              background: ticketType === "vibe"
                ? "rgba(255,0,0,0.15)"
                : "#1a1a1a",
              color: "white",
              fontSize: "20px",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "0.3s"
            }}
          >

            🎉 VIBE ONLY — R100

            <div style={{
              fontSize: "14px",
              color: "#aaa",
              marginTop: "8px",
              fontWeight: "normal"
            }}>
              Access To Vibe Session Only
            </div>

          </button>

        </div>

        <div style={{
          marginBottom: "30px"
        }}>

          <label style={{
            display: "block",
            marginBottom: "12px",
            color: "#aaa",
            fontSize: "16px"
          }}>
            Number Of Tickets
          </label>

          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) =>
              setQuantity(Number(e.target.value))
            }

            style={{
              width: "100%",
              padding: "18px",
              borderRadius: "12px",
              border: "1px solid #333",
              background: "#1a1a1a",
              color: "white",
              fontSize: "18px",
              outline: "none"
            }}
          />

        </div>

        <div style={{
          background: "#1a1a1a",
          padding: "25px",
          borderRadius: "15px",
          marginBottom: "30px",
          textAlign: "center"
        }}>

          <p style={{
            color: "#888",
            marginBottom: "10px"
          }}>
            ORDER TOTAL
          </p>

          <h2 style={{
            color: "white",
            fontSize: "40px"
          }}>
            <span style={{ color: "red" }}>
              R{total}
            </span>
          </h2>

        </div>

        <button
          onClick={handleProceed}

          style={{
            width: "100%",
            padding: "20px",
            background: "red",
            color: "white",
            border: "none",
            borderRadius: "15px",
            fontSize: "22px",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "0.3s",
            boxShadow: "0 0 20px rgba(255,0,0,0.4)"
          }}
        >

          PROCEED TO REGISTER

        </button>

      </div>

    </div>

  )
}
import { useEffect, useState } from "react"

export default function Success() {

  const [ticket, setTicket] = useState(null)

  useEffect(() => {

    const data =
      localStorage.getItem("mgs_ticket")

    if (data) {

      setTicket(JSON.parse(data))

    }

  }, [])

  // WHATSAPP DELIVERY
  function sendWhatsApp() {

    if (!ticket) return

    const message = `🔥 MGS EVENT TICKET 🔥

Name: ${ticket.name}

Ticket: ${ticket.ticketType}

Quantity: ${ticket.quantity}

Status: PAID ✅

Ticket ID:
${ticket.id}

Present your QR code at the entrance.`

    window.open(
      `https://wa.me/${ticket.phone}?text=${encodeURIComponent(message)}`,
      "_blank"
    )

  }

  // DOWNLOAD TICKET
  function downloadTicket() {

    window.print()

  }

  // BACK HOME
  function goHome() {

    window.location.href = "/"

  }

  if (!ticket) {

    return (

      <div style={{
        background: "black",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        fontFamily: "Arial"
      }}>

        <div style={{
          textAlign: "center"
        }}>

          <h1 style={{
            color: "red",
            marginBottom: "20px"
          }}>
            MGS
          </h1>

          <h2>
            Loading Ticket...
          </h2>

        </div>

      </div>

    )

  }

  return (

    <div style={{
      background: "linear-gradient(to bottom, #000, #111)",
      minHeight: "100vh",
      color: "white",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px",
      fontFamily: "Arial"
    }}>

      <div style={{
        background: "#111",
        padding: "35px",
        borderRadius: "25px",
        width: "400px",
        textAlign: "center",
        boxShadow: "0 0 35px rgba(255,0,0,0.6)",
        border: "1px solid rgba(255,0,0,0.3)"
      }}>

        {/* HEADER */}

        <div style={{
          marginBottom: "25px"
        }}>

          <h1 style={{
            color: "red",
            marginBottom: "10px",
            letterSpacing: "3px",
            fontSize: "32px"
          }}>
            PAYMENT SUCCESS
          </h1>

          <p style={{
            color: "#999",
            fontSize: "15px"
          }}>
            MGS EVENT OFFICIAL TICKET
          </p>

        </div>

        {/* CUSTOMER INFO */}

        <div style={{
          background: "#1a1a1a",
          padding: "25px",
          borderRadius: "18px",
          marginBottom: "25px",
          textAlign: "left",
          border: "1px solid #222"
        }}>

          <h2 style={{
            color: "white",
            marginBottom: "20px",
            textAlign: "center"
          }}>
            {ticket.name}
          </h2>

          <p style={infoStyle}>
            <strong>Email:</strong>
            {" "}
            {ticket.email}
          </p>

          <p style={infoStyle}>
            <strong>Phone:</strong>
            {" "}
            {ticket.phone}
          </p>

          <p style={infoStyle}>
            <strong>Ticket:</strong>
            {" "}
            {

              ticket.ticketType === "full"

                ? "FULL EVENT"

                : "VIBE ONLY"

            }
          </p>

          <p style={infoStyle}>
            <strong>Quantity:</strong>
            {" "}
            {ticket.quantity}
          </p>

          <p style={infoStyle}>
            <strong>Total:</strong>
            {" "}
            R{ticket.total}
          </p>

          <div style={{
            marginTop: "20px",
            background: "rgba(0,255,0,0.12)",
            padding: "12px",
            borderRadius: "10px",
            textAlign: "center"
          }}>

            <span style={{
              color: "lime",
              fontWeight: "bold",
              letterSpacing: "1px"
            }}>
              STATUS: PAID ✅
            </span>

          </div>

        </div>

        {/* QR */}

        {

          ticket.qr && (

            <div style={{
              marginBottom: "25px"
            }}>

              <div style={{
                background: "white",
                padding: "18px",
                borderRadius: "18px",
                display: "inline-block"
              }}>

                <img
                  src={ticket.qr}
                  alt="QR Code"
                  width="230"
                />

              </div>

            </div>

          )

        }

        {/* TICKET ID */}

        <div style={{
          background: "#1a1a1a",
          padding: "15px",
          borderRadius: "12px",
          marginBottom: "25px"
        }}>

          <h3 style={{
            color: "red",
            marginBottom: "10px"
          }}>
            TICKET ID
          </h3>

          <p style={{
            fontSize: "12px",
            color: "#bbb",
            wordBreak: "break-all"
          }}>
            {ticket.id}
          </p>

        </div>

        {/* INFO */}

        <div style={{
          background: "rgba(255,0,0,0.08)",
          padding: "15px",
          borderRadius: "12px",
          marginBottom: "25px",
          border: "1px solid rgba(255,0,0,0.2)"
        }}>

          <p style={{
            color: "#ffb3b3",
            fontSize: "14px",
            lineHeight: "22px"
          }}>
            Present this QR code at the entrance.
            Duplicate or fake tickets will be rejected automatically.
          </p>

        </div>

        {/* BUTTONS */}

        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px"
        }}>

          <button

            onClick={sendWhatsApp}

            style={{
              padding: "15px",
              background: "#25D366",
              border: "none",
              borderRadius: "12px",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
              fontSize: "16px",
              transition: "0.3s"
            }}

          >

            SEND TO WHATSAPP

          </button>

          <button

            onClick={downloadTicket}

            style={{
              padding: "15px",
              background: "red",
              border: "none",
              borderRadius: "12px",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
              fontSize: "16px"
            }}

          >

            DOWNLOAD / PRINT TICKET

          </button>

          <button

            onClick={goHome}

            style={{
              padding: "15px",
              background: "#222",
              border: "1px solid #333",
              borderRadius: "12px",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
              fontSize: "16px"
            }}

          >

            BACK HOME

          </button>

        </div>

      </div>

    </div>

  )

}

const infoStyle = {

  marginBottom: "12px",
  color: "#ddd",
  fontSize: "15px"

}
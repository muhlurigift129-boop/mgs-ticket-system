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

      `https://wa.me/${ticket.phone}?text=${encodeURIComponent(message)}`

    )

  }

  if (!ticket) {

    return (

      <div style={{
        background: "black",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white"
      }}>

        <h1>
          Loading Ticket...
        </h1>

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
      padding: "20px"
    }}>

      <div style={{
        background: "#111",
        padding: "35px",
        borderRadius: "20px",
        width: "380px",
        textAlign: "center",
        boxShadow: "0 0 30px rgba(255,0,0,0.6)"
      }}>

        <h1 style={{
          color: "red",
          marginBottom: "10px",
          letterSpacing: "2px"
        }}>
          PAYMENT SUCCESS
        </h1>

        <p style={{
          color: "#aaa",
          marginBottom: "25px"
        }}>
          MGS EVENT TICKET
        </p>

        <div style={{
          background: "#1a1a1a",
          padding: "20px",
          borderRadius: "15px",
          marginBottom: "25px"
        }}>

          <h2 style={{
            color: "white",
            marginBottom: "15px"
          }}>
            {ticket.name}
          </h2>

          <p>
            <strong>Email:</strong>
            {" "}
            {ticket.email}
          </p>

          <p>
            <strong>Phone:</strong>
            {" "}
            {ticket.phone}
          </p>

          <p>
            <strong>Ticket:</strong>
            {" "}
            {ticket.ticketType}
          </p>

          <p>
            <strong>Quantity:</strong>
            {" "}
            {ticket.quantity}
          </p>

          <p>
            <strong>Total:</strong>
            {" "}
            R{ticket.total}
          </p>

          <p style={{
            color: "lime",
            marginTop: "15px",
            fontWeight: "bold"
          }}>
            STATUS: PAID ✅
          </p>

        </div>

        {/* QR CODE */}
        {

          ticket.qr && (

            <div style={{
              background: "white",
              padding: "15px",
              borderRadius: "15px",
              display: "inline-block"
            }}>

              <img
                src={ticket.qr}
                alt="QR Code"
                width="220"
              />

            </div>

          )

        }

        {/* TICKET ID */}
        <div style={{
          marginTop: "20px"
        }}>

          <h3 style={{
            color: "red"
          }}>
            Ticket ID
          </h3>

          <p style={{
            fontSize: "13px",
            wordBreak: "break-all",
            color: "#ccc"
          }}>
            {ticket.id}
          </p>

        </div>

        {/* BUTTONS */}
        <div style={{
          marginTop: "30px",
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
              borderRadius: "10px",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
              fontSize: "16px"
            }}

          >

            SEND TO WHATSAPP

          </button>

          <button

            onClick={() => window.print()}

            style={{
              padding: "15px",
              background: "red",
              border: "none",
              borderRadius: "10px",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
              fontSize: "16px"
            }}

          >

            DOWNLOAD / PRINT TICKET

          </button>

        </div>

      </div>

    </div>

  )

}
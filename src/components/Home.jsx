import { useNavigate } from "react-router-dom"

export default function Home() {

  const navigate = useNavigate()

  // ======================================
  // MGS EVENT TICKET
  // ======================================

  const ticket = {
    name: "MGS EVENT TICKET",
    price: 420,
    description:
      "Full access to the MGS Event on 12 September 2026.",
    type: "mgs-event",
    popular: true,
    features: [
      "Full Event Access",
      "Main Stage",
      "Live Entertainment",
      "Networking",
      "All Activities"
    ]
  }

  // ======================================
  // BUY TICKET
  // ======================================

  function selectTicket() {

    localStorage.setItem(
      "selectedTicket",
      JSON.stringify(ticket)
    )

    // Customer must login before continuing
    navigate("/login")

  }

  // ======================================
  // PAGE
  // ======================================

  return (

    <div style={page}>

      {/* ==================================
          HEADER
      ================================== */}

      <div style={header}>

        <p style={smallTitle}>
          MGS EVENTS PRESENTS
        </p>

        <h1 style={title}>
          MGS EVENT
        </h1>

        <h2 style={date}>
          12 SEPTEMBER 2026
        </h2>

        <p style={desc}>
          Get ready for an unforgettable MGS experience.
          Secure your ticket today and join us for the event.
        </p>

      </div>


      {/* ==================================
          TICKET
      ================================== */}

      <div style={ticketContainer}>

        <div style={card}>

          {/* POPULAR BADGE */}

          <div style={badge}>
            MGS EVENT TICKET
          </div>


          {/* TICKET NAME */}

          <h2 style={ticketName}>
            {ticket.name}
          </h2>


          {/* PRICE */}

          <div style={price}>
            R{ticket.price}
          </div>


          <p style={description}>
            {ticket.description}
          </p>


          {/* EVENT DETAILS */}

          <div style={details}>

            <div style={detailRow}>
              <span>📅 Date</span>
              <strong>12 September 2026</strong>
            </div>

            <div style={detailRow}>
              <span>🎟 Ticket</span>
              <strong>Full Event Access</strong>
            </div>

            <div style={detailRow}>
              <span>💰 Price</span>
              <strong>R420</strong>
            </div>

          </div>


          {/* FEATURES */}

          <div style={features}>

            <h3 style={featuresTitle}>
              YOUR TICKET INCLUDES
            </h3>

            {ticket.features.map((feature) => (

              <p
                key={feature}
                style={featureItem}
              >
                ✓ {feature}
              </p>

            ))}

          </div>


          {/* BUY BUTTON */}

          <button
            onClick={selectTicket}
            style={buyBtn}
          >
            BUY TICKET — R420
          </button>


          {/* LOGIN MESSAGE */}

          <p style={loginMessage}>
            You will be asked to login or create an account
            before completing your purchase.
          </p>

        </div>

      </div>


      {/* ==================================
          FOOTER
      ================================== */}

      <div style={footer}>

        <p>
          © 2026 MGS EVENTS
        </p>

        <p>
          12 September 2026
        </p>

      </div>

    </div>

  )
}


// ======================================
// PAGE STYLE
// ======================================

const page = {

  minHeight: "100vh",

  background:
    "linear-gradient(180deg, #000000 0%, #090909 50%, #111111 100%)",

  color: "white",

  paddingTop: "65px",

  boxSizing: "border-box"

}


// ======================================
// HEADER
// ======================================

const header = {

  textAlign: "center",

  padding:
    "55px 20px 35px"

}

const smallTitle = {

  color: "#aaa",

  fontSize: "14px",

  letterSpacing: "4px",

  fontWeight: "bold",

  marginBottom: "15px"

}

const title = {

  color: "red",

  fontSize:
    "clamp(45px, 8vw, 80px)",

  margin:
    "0 0 10px",

  fontWeight: "900",

  letterSpacing: "3px"

}

const date = {

  color: "white",

  fontSize:
    "clamp(22px, 4vw, 35px)",

  margin:
    "10px 0 20px",

  letterSpacing: "2px"

}

const desc = {

  color: "#aaa",

  maxWidth: "650px",

  margin: "0 auto",

  lineHeight: "1.7",

  fontSize: "16px"

}


// ======================================
// TICKET CONTAINER
// ======================================

const ticketContainer = {

  display: "flex",

  justifyContent: "center",

  padding:
    "20px 20px 60px"

}


// ======================================
// TICKET CARD
// ======================================

const card = {

  width: "100%",

  maxWidth: "500px",

  background:
    "linear-gradient(145deg, #151515, #0b0b0b)",

  border:
    "2px solid red",

  borderRadius: "25px",

  padding: "35px",

  boxSizing: "border-box",

  textAlign: "center",

  boxShadow:
    "0 0 35px rgba(255, 0, 0, 0.25)"

}


// ======================================
// BADGE
// ======================================

const badge = {

  display: "inline-block",

  background: "red",

  color: "white",

  padding:
    "8px 18px",

  borderRadius: "30px",

  fontSize: "12px",

  fontWeight: "bold",

  letterSpacing: "1px",

  marginBottom: "20px"

}


// ======================================
// TICKET NAME
// ======================================

const ticketName = {

  color: "white",

  fontSize: "32px",

  margin:
    "5px 0 10px",

  fontWeight: "900"

}


// ======================================
// PRICE
// ======================================

const price = {

  color: "red",

  fontSize: "65px",

  fontWeight: "900",

  margin:
    "10px 0"

}


// ======================================
// DESCRIPTION
// ======================================

const description = {

  color: "#aaa",

  lineHeight: "1.6",

  marginBottom: "25px"

}


// ======================================
// EVENT DETAILS
// ======================================

const details = {

  background: "#0a0a0a",

  border:
    "1px solid #292929",

  borderRadius: "15px",

  padding: "15px",

  marginBottom: "25px"

}

const detailRow = {

  display: "flex",

  justifyContent:
    "space-between",

  alignItems: "center",

  gap: "15px",

  padding:
    "12px 5px",

  borderBottom:
    "1px solid #222",

  textAlign: "left"

}


// ======================================
// FEATURES
// ======================================

const features = {

  textAlign: "left",

  marginBottom: "25px"

}

const featuresTitle = {

  color: "red",

  fontSize: "15px",

  letterSpacing: "1px",

  marginBottom: "15px"

}

const featureItem = {

  color: "#ddd",

  margin:
    "10px 0",

  fontSize: "15px"

}


// ======================================
// BUY BUTTON
// ======================================

const buyBtn = {

  width: "100%",

  padding: "17px",

  background: "red",

  color: "white",

  border: "none",

  borderRadius: "12px",

  cursor: "pointer",

  fontWeight: "900",

  fontSize: "17px",

  letterSpacing: "1px"

}


// ======================================
// LOGIN MESSAGE
// ======================================

const loginMessage = {

  color: "#777",

  fontSize: "12px",

  lineHeight: "1.5",

  marginTop: "15px"

}


// ======================================
// FOOTER
// ======================================

const footer = {

  textAlign: "center",

  padding:
    "30px 20px",

  borderTop:
    "1px solid #222",

  color: "#666",

  fontSize: "13px"

}
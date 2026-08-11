import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth"

import { auth } from "../firebase/config"

export default function Home() {

  const navigate = useNavigate()

  const [user, setUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {

        setUser(currentUser)
        setAuthLoading(false)

      }
    )

    return unsubscribe

  }, [])

  const ticket = {

    name: "UNLIMITED TICKET",

    price: 420,

    description:
      "Unlimited event ticket with full access to the MGS experience.",

    type: "unlimited",

    quantity: "UNLIMITED",

    date: "12 September 2026",

    features: [

      "Full Event Entrance",

      "Meat Included",

      "Drinks Included",

      "Live Entertainment",

      "Good Music & Vibes",

      "Connect & Build Friendships",

      "Grow Together"

    ]

  }

  function buyTicket() {

    // Save selected ticket
    localStorage.setItem(
      "selectedTicket",
      JSON.stringify(ticket)
    )

    /*
      LOGGED OUT

      User must create an account first.
    */

    if (!user) {

      navigate("/register-account")

      return

    }

    /*
      LOGGED IN

      User can go directly to ticket
      purchase/registration.
    */

    navigate("/ticket-purchase")

  }

  if (authLoading) {

    return (

      <div style={loadingPage}>

        <div style={loadingRobot}>
          🤖
        </div>

        <h2>
          Checking your account...
        </h2>

      </div>

    )

  }

  return (

    <div style={page}>

      {/* ============================= */}
      {/* HERO */}
      {/* ============================= */}

      <section style={hero}>

        <div style={heroOverlay}>

          <p style={eventLabel}>
            MGS EVENTS PRESENTS
          </p>

          <h1 style={title}>
            MGS EVENT
          </h1>

          <h2 style={date}>
            12 SEPTEMBER 2026
          </h2>

          <p style={heroText}>
            Come connect, share, grow and
            enjoy an unforgettable experience.
          </p>

          <div style={statusBox}>

            <span style={statusDot}></span>

            {user
              ? "YOU ARE LOGGED IN"
              : "LOGIN REQUIRED TO PURCHASE"
            }

          </div>

        </div>

      </section>


      {/* ============================= */}
      {/* EVENT INFORMATION */}
      {/* ============================= */}

      <section style={infoSection}>

        <div style={infoCard}>

          <div style={icon}>
            📍
          </div>

          <h3>
            LOCATION
          </h3>

          <p>
            Nthabiseko Resort
          </p>

        </div>


        <div style={infoCard}>

          <div style={icon}>
            📅
          </div>

          <h3>
            DATE
          </h3>

          <p>
            12 September 2026
          </p>

        </div>


        <div style={infoCard}>

          <div style={icon}>
            🕛
          </div>

          <h3>
            TIME
          </h3>

          <p>
            12H00
          </p>

        </div>


        <div style={infoCard}>

          <div style={icon}>
            🎫
          </div>

          <h3>
            TICKETS
          </h3>

          <p>
            Unlimited
          </p>

        </div>

      </section>


      {/* ============================= */}
      {/* TICKET */}
      {/* ============================= */}

      <section style={ticketSection}>

        <p style={sectionLabel}>
          AVAILABLE TICKET
        </p>

        <h2 style={sectionTitle}>
          GET YOUR TICKET
        </h2>

        <div style={ticketCard}>

          <div style={popularBadge}>
            UNLIMITED AVAILABLE
          </div>

          <h2 style={ticketTitle}>
            {ticket.name}
          </h2>

          <div style={price}>
            R{ticket.price}
          </div>

          <p style={perPerson}>
            PER PERSON
          </p>

          <p style={description}>
            {ticket.description}
          </p>


          {/* FEATURES */}

          <div style={featureContainer}>

            {ticket.features.map(
              (feature, index) => (

                <div
                  key={index}
                  style={feature}
                >

                  <span style={check}>
                    ✓
                  </span>

                  <span>
                    {feature}
                  </span>

                </div>

              )
            )}

          </div>


          {/* BUY BUTTON */}

          <button
            onClick={buyTicket}
            style={buyButton}
          >

            🎫 BUY TICKET NOW

          </button>


          {/* LOGIN MESSAGE */}

          <p style={smallText}>

            {user

              ? "✓ You are logged in. You can continue directly."

              : "You will need to create an account before purchasing."

            }

          </p>

        </div>

      </section>


      {/* ============================= */}
      {/* EVENT MESSAGE */}
      {/* ============================= */}

      <section style={messageSection}>

        <h2>
          DON'T MISS OUT!
        </h2>

        <p>
          Bring your friends and let's make memories.
        </p>

      </section>

    </div>

  )

}


/* ========================================= */
/* STYLES */
/* ========================================= */

const page = {

  minHeight: "100vh",

  background:
    "linear-gradient(180deg,#000 0%,#080808 45%,#111 100%)",

  color: "white",

  paddingTop: "70px",

  fontFamily:
    "Arial, Helvetica, sans-serif"

}


const loadingPage = {

  minHeight: "100vh",

  background: "#000",

  color: "white",

  display: "flex",

  flexDirection: "column",

  justifyContent: "center",

  alignItems: "center"

}


const loadingRobot = {

  fontSize: "60px",

  marginBottom: "15px"

}


const hero = {

  minHeight: "500px",

  display: "flex",

  justifyContent: "center",

  alignItems: "center",

  textAlign: "center",

  padding: "40px 20px",

  background:
    "radial-gradient(circle at center,#300 0%,#080808 55%,#000 100%)"

}


const heroOverlay = {

  maxWidth: "850px"

}


const eventLabel = {

  color: "#ff3333",

  fontWeight: "bold",

  letterSpacing: "4px",

  fontSize: "14px"

}


const title = {

  color: "#ff1a1a",

  fontSize: "clamp(50px,10vw,100px)",

  margin: "15px 0",

  fontWeight: "900"

}


const date = {

  fontSize: "clamp(25px,5vw,45px)",

  margin: "10px 0"

}


const heroText = {

  color: "#aaa",

  fontSize: "18px",

  maxWidth: "650px",

  margin:
    "20px auto",

  lineHeight: "1.6"

}


const statusBox = {

  display: "inline-flex",

  alignItems: "center",

  gap: "10px",

  marginTop: "20px",

  padding: "12px 20px",

  background: "#151515",

  border: "1px solid #333",

  borderRadius: "30px",

  fontSize: "13px",

  fontWeight: "bold"

}


const statusDot = {

  width: "10px",

  height: "10px",

  background: "#00ff66",

  borderRadius: "50%",

  display: "inline-block"

}


const infoSection = {

  display: "grid",

  gridTemplateColumns:
    "repeat(auto-fit,minmax(220px,1fr))",

  gap: "20px",

  padding: "40px 6%",

  background: "#050505"

}


const infoCard = {

  background: "#111",

  border: "1px solid #292929",

  borderRadius: "16px",

  padding: "25px",

  textAlign: "center"

}


const icon = {

  fontSize: "35px",

  marginBottom: "10px"

}


const infoCardH3 = {

  color: "#ff2222",

  marginBottom: "8px"

}


const ticketSection = {

  padding: "70px 20px",

  textAlign: "center"

}


const sectionLabel = {

  color: "#ff2222",

  fontWeight: "bold",

  letterSpacing: "3px"

}


const sectionTitle = {

  fontSize: "42px",

  marginBottom: "40px"

}


const ticketCard = {

  position: "relative",

  maxWidth: "550px",

  margin: "auto",

  padding: "40px 30px",

  background:
    "linear-gradient(145deg,#151515,#080808)",

  border: "2px solid red",

  borderRadius: "25px",

  boxShadow:
    "0 0 40px rgba(255,0,0,.25)"

}


const popularBadge = {

  display: "inline-block",

  background: "red",

  color: "white",

  padding: "8px 16px",

  borderRadius: "30px",

  fontSize: "12px",

  fontWeight: "bold",

  marginBottom: "20px"

}


const ticketTitle = {

  color: "white",

  fontSize: "28px"

}


const price = {

  color: "#ff2222",

  fontSize: "70px",

  fontWeight: "900",

  marginTop: "15px"

}


const perPerson = {

  color: "#aaa",

  marginTop: "-10px",

  fontWeight: "bold"

}


const description = {

  color: "#bbb",

  lineHeight: "1.6",

  margin: "20px auto",

  maxWidth: "450px"

}


const featureContainer = {

  textAlign: "left",

  marginTop: "25px",

  padding: "20px",

  background: "#0d0d0d",

  borderRadius: "15px"

}


const feature = {

  display: "flex",

  gap: "12px",

  alignItems: "center",

  padding: "9px 0",

  color: "#ddd"

}


const check = {

  color: "#00ff66",

  fontWeight: "bold",

  fontSize: "20px"

}


const buyButton = {

  width: "100%",

  marginTop: "30px",

  padding: "18px",

  background: "red",

  color: "white",

  border: "none",

  borderRadius: "12px",

  fontSize: "18px",

  fontWeight: "bold",

  cursor: "pointer",

  boxShadow:
    "0 0 20px rgba(255,0,0,.3)"

}


const smallText = {

  color: "#777",

  fontSize: "12px",

  marginTop: "15px"

}


const messageSection = {

  textAlign: "center",

  padding: "70px 20px",

  borderTop: "1px solid #222"

}


const messageSectionH2 = {

  color: "white",

  fontSize: "40px"

}


const messageSectionP = {

  color: "#aaa",

  fontSize: "18px"

}

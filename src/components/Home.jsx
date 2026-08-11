import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth"

import { auth } from "../firebase/config"

export default function Home() {

  const navigate = useNavigate()

  const [user, setUser] = useState(null)

  const [quantity, setQuantity] = useState(1)

  const [loading, setLoading] = useState(true)

  // ==========================================
  // CHECK LOGIN STATUS
  // ==========================================

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {

        setUser(currentUser)

        setLoading(false)

      }
    )

    return unsubscribe

  }, [])

  // ==========================================
  // TICKET
  // ==========================================

  const ticket = {

    name: "MGS EVENT TICKET",

    price: 420,

    description:
      "Unlimited access ticket for the MGS Braai & Get To Know Each Other event.",

    type: "unlimited",

    date: "12 September 2026",

    time: "12H00",

    location: "Nthabiseko Resort",

    features: [

      "Unlimited Event Ticket Availability",

      "Event Entrance",

      "Meat Included",

      "Drinks Included",

      "Good Music & Entertainment",

      "Connect & Build Friendships",

      "Enjoy Great Food & Drinks",

      "Grow Together"

    ]

  }

  // ==========================================
  // BUY TICKET
  // ==========================================

  function buyTicket() {

    const selectedTicket = {

      ...ticket,

      quantity: quantity,

      total: ticket.price * quantity

    }

    localStorage.setItem(

      "selectedTicket",

      JSON.stringify(selectedTicket)

    )

    // ----------------------------------------
    // LOGGED IN
    // ----------------------------------------

    if (user) {

      navigate("/register")

      return

    }

    // ----------------------------------------
    // LOGGED OUT
    // ----------------------------------------

    navigate("/register-account")

  }

  // ==========================================
  // CHANGE QUANTITY
  // ==========================================

  function increaseQuantity() {

    setQuantity(
      previous => previous + 1
    )

  }

  function decreaseQuantity() {

    setQuantity(
      previous =>
        previous > 1
          ? previous - 1
          : 1
    )

  }

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (

      <div style={loadingPage}>

        <div style={loadingRobot}>
          🤖
        </div>

        <h2>
          Loading MGS Events...
        </h2>

        <div style={loader}></div>

      </div>

    )

  }

  // ==========================================
  // PAGE
  // ==========================================

  return (

    <div style={page}>

      {/* =====================================
          HERO
      ===================================== */}

      <section style={hero}>

        <div style={heroOverlay}>

          <div style={heroContent}>

            <div style={logo}>
              MGS
            </div>

            <h1 style={mainTitle}>
              BRAAI & GET TO KNOW EACH OTHER
            </h1>

            <p style={heroText}>
              COME • CONNECT • SHARE • GROW
            </p>

            <div style={heroLine}></div>

            <p style={heroDescription}>

              Join us for an unforgettable
              day filled with great food,
              drinks, music and good people.

            </p>

          </div>

        </div>

      </section>


      {/* =====================================
          EVENT INFORMATION
      ===================================== */}

      <section style={eventInfo}>

        <div style={infoCard}>

          <div style={infoIcon}>
            📍
          </div>

          <div>

            <span style={infoLabel}>
              PLACE
            </span>

            <strong style={infoValue}>
              NTHABISEKO RESORT
            </strong>

          </div>

        </div>


        <div style={infoCard}>

          <div style={infoIcon}>
            📅
          </div>

          <div>

            <span style={infoLabel}>
              DATE
            </span>

            <strong style={infoValue}>
              12 SEPTEMBER 2026
            </strong>

          </div>

        </div>


        <div style={infoCard}>

          <div style={infoIcon}>
            🕛
          </div>

          <div>

            <span style={infoLabel}>
              TIME
            </span>

            <strong style={infoValue}>
              12H00
            </strong>

          </div>

        </div>


        <div style={infoCard}>

          <div style={infoIcon}>
            🎟️
          </div>

          <div>

            <span style={infoLabel}>
              TICKET
            </span>

            <strong style={infoValue}>
              R420 PER PERSON
            </strong>

          </div>

        </div>

      </section>


      {/* =====================================
          TICKET SECTION
      ===================================== */}

      <section style={ticketSection}>

        <div style={sectionHeader}>

          <span style={sectionSmallTitle}>
            OFFICIAL MGS EVENT
          </span>

          <h2 style={sectionTitle}>
            UNLIMITED TICKET
          </h2>

          <p style={sectionDescription}>

            One ticket package is available.
            There is no ticket limit.

          </p>

        </div>


        <div style={ticketCard}>

          <div style={popularBadge}>
            UNLIMITED AVAILABILITY
          </div>


          <div style={ticketIcon}>
            🎟️
          </div>


          <h2 style={ticketTitle}>
            {ticket.name}
          </h2>


          <div style={price}>
            R{ticket.price}
          </div>


          <div style={perPerson}>
            PER PERSON
          </div>


          <p style={ticketDescription}>
            {ticket.description}
          </p>


          {/* =================================
              EVENT DETAILS
          ================================= */}

          <div style={detailsBox}>

            <div style={detailRow}>

              <span>
                📅 Date
              </span>

              <strong>
                {ticket.date}
              </strong>

            </div>


            <div style={detailRow}>

              <span>
                🕛 Time
              </span>

              <strong>
                {ticket.time}
              </strong>

            </div>


            <div style={detailRow}>

              <span>
                📍 Location
              </span>

              <strong>
                {ticket.location}
              </strong>

            </div>


            <div style={detailRow}>

              <span>
                🎟️ Availability
              </span>

              <strong style={unlimitedText}>
                UNLIMITED
              </strong>

            </div>

          </div>


          {/* =================================
              FEATURES
          ================================= */}

          <div style={featuresBox}>

            <h3 style={featuresTitle}>
              EVERYTHING INCLUDED
            </h3>

            {ticket.features.map(
              (feature, index) => (

                <div
                  key={index}
                  style={featureRow}
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


          {/* =================================
              QUANTITY
          ================================= */}

          <div style={quantitySection}>

            <h3 style={quantityTitle}>
              NUMBER OF TICKETS
            </h3>


            <div style={quantityControls}>

              <button
                onClick={decreaseQuantity}
                style={quantityButton}
              >
                −
              </button>


              <div style={quantityNumber}>
                {quantity}
              </div>


              <button
                onClick={increaseQuantity}
                style={quantityButton}
              >
                +
              </button>

            </div>


            <div style={totalBox}>

              <span>
                TOTAL
              </span>

              <strong>
                R{ticket.price * quantity}
              </strong>

            </div>

          </div>


          {/* =================================
              BUY BUTTON
          ================================= */}

          <button
            onClick={buyTicket}
            style={buyButton}
          >

            🎟️ BUY TICKET NOW

          </button>


          {/* =================================
              LOGIN MESSAGE
          ================================= */}

          {user ? (

            <p style={loggedInMessage}>

              ✓ You are logged in.
              You can continue directly
              to ticket registration.

            </p>

          ) : (

            <p style={loggedOutMessage}>

              You are not logged in.
              You will need to create an
              account before purchasing.

            </p>

          )}

        </div>

      </section>


      {/* =====================================
          EVENT BOTTOM MESSAGE
      ===================================== */}

      <section style={bottomSection}>

        <h2 style={bottomTitle}>
          DON'T MISS OUT!
        </h2>

        <p style={bottomText}>

          BRING YOUR FRIENDS &
          LET'S MAKE MEMORIES!

        </p>

        <p style={verse}>

          "Let us consider how we may spur
          one another on toward love and
          good deeds."

        </p>

        <strong style={verseReference}>
          — Hebrews 10:24
        </strong>

      </section>

    </div>

  )

}


// =====================================================
// STYLES
// =====================================================

const page = {

  minHeight: "100vh",

  background:
    "linear-gradient(180deg,#000 0%,#080808 45%,#111 100%)",

  color: "white",

  paddingTop: "80px",

  overflowX: "hidden"

}


// =====================================================
// LOADING
// =====================================================

const loadingPage = {

  minHeight: "100vh",

  background: "#000",

  color: "white",

  display: "flex",

  justifyContent: "center",

  alignItems: "center",

  flexDirection: "column",

  gap: "15px"

}

const loadingRobot = {

  fontSize: "60px",

  animation:
    "pulse 1.2s infinite"

}

const loader = {

  width: "45px",

  height: "45px",

  borderRadius: "50%",

  border:
    "4px solid #333",

  borderTop:
    "4px solid red",

  animation:
    "spin 1s linear infinite"

}


// =====================================================
// HERO
// =====================================================

const hero = {

  minHeight: "520px",

  background:

    "linear-gradient(rgba(0,0,0,.65),rgba(0,0,0,.9)), url('/event-bg.jpg')",

  backgroundSize: "cover",

  backgroundPosition: "center",

  display: "flex",

  alignItems: "center",

  justifyContent: "center",

  textAlign: "center"

}

const heroOverlay = {

  width: "100%",

  minHeight: "520px",

  display: "flex",

  alignItems: "center",

  justifyContent: "center",

  background:
    "radial-gradient(circle,rgba(255,0,0,.12),transparent 60%)"

}

const heroContent = {

  maxWidth: "1000px",

  padding: "50px 25px"

}

const logo = {

  fontSize: "70px",

  fontWeight: "900",

  color: "red",

  letterSpacing: "8px",

  textShadow:
    "0 0 30px rgba(255,0,0,.7)"

}

const mainTitle = {

  fontSize: "clamp(35px,6vw,75px)",

  lineHeight: "1",

  margin: "20px 0",

  fontWeight: "900",

  textTransform: "uppercase"

}

const heroText = {

  color: "#ffae00",

  fontSize: "20px",

  fontWeight: "bold",

  letterSpacing: "4px"

}

const heroLine = {

  width: "180px",

  height: "4px",

  background: "red",

  margin: "25px auto"

}

const heroDescription = {

  color: "#ddd",

  maxWidth: "700px",

  margin: "auto",

  fontSize: "18px",

  lineHeight: "1.7"

}


// =====================================================
// EVENT INFO
// =====================================================

const eventInfo = {

  maxWidth: "1200px",

  margin: "auto",

  padding: "35px 20px",

  display: "grid",

  gridTemplateColumns:
    "repeat(auto-fit,minmax(220px,1fr))",

  gap: "15px"

}

const infoCard = {

  background: "#111",

  border: "1px solid #333",

  borderRadius: "15px",

  padding: "20px",

  display: "flex",

  alignItems: "center",

  gap: "15px"

}

const infoIcon = {

  fontSize: "35px"

}

const infoLabel = {

  display: "block",

  color: "red",

  fontSize: "12px",

  fontWeight: "bold",

  marginBottom: "5px"

}

const infoValue = {

  display: "block",

  fontSize: "16px"

}


// =====================================================
// TICKET SECTION
// =====================================================

const ticketSection = {

  maxWidth: "1000px",

  margin: "auto",

  padding: "50px 20px 100px"

}

const sectionHeader = {

  textAlign: "center",

  marginBottom: "35px"

}

const sectionSmallTitle = {

  color: "red",

  fontWeight: "bold",

  letterSpacing: "3px"

}

const sectionTitle = {

  fontSize: "45px",

  margin: "10px 0"

}

const sectionDescription = {

  color: "#aaa",

  fontSize: "17px"

}


// =====================================================
// TICKET CARD
// =====================================================

const ticketCard = {

  maxWidth: "650px",

  margin: "auto",

  background:
    "linear-gradient(145deg,#151515,#080808)",

  border:
    "2px solid red",

  borderRadius: "25px",

  padding: "35px",

  textAlign: "center",

  boxShadow:
    "0 0 50px rgba(255,0,0,.25)"

}

const popularBadge = {

  display: "inline-block",

  background: "red",

  color: "white",

  padding: "8px 18px",

  borderRadius: "30px",

  fontSize: "12px",

  fontWeight: "bold",

  letterSpacing: "1px",

  marginBottom: "20px"

}

const ticketIcon = {

  fontSize: "55px"

}

const ticketTitle = {

  fontSize: "28px",

  margin: "15px 0",

  color: "white"

}

const price = {

  fontSize: "65px",

  color: "red",

  fontWeight: "900",

  lineHeight: "1"

}

const perPerson = {

  color: "#aaa",

  fontSize: "13px",

  fontWeight: "bold",

  letterSpacing: "2px",

  marginTop: "8px"

}

const ticketDescription = {

  color: "#bbb",

  lineHeight: "1.6",

  margin:
    "20px auto 30px",

  maxWidth: "500px"

}


// =====================================================
// DETAILS
// =====================================================

const detailsBox = {

  background: "#0d0d0d",

  border:
    "1px solid #333",

  borderRadius: "15px",

  padding: "15px",

  marginBottom: "25px"

}

const detailRow = {

  display: "flex",

  justifyContent: "space-between",

  alignItems: "center",

  gap: "15px",

  padding: "13px 5px",

  borderBottom:
    "1px solid #222",

  textAlign: "left"

}

const unlimitedText = {

  color: "#00ff66"

}


// =====================================================
// FEATURES
// =====================================================

const featuresBox = {

  textAlign: "left",

  marginTop: "25px"

}

const featuresTitle = {

  color: "#ffae00",

  textAlign: "center",

  marginBottom: "20px"

}

const featureRow = {

  display: "flex",

  gap: "12px",

  padding: "9px 0",

  color: "#ddd"

}

const check = {

  color: "#00ff66",

  fontWeight: "bold",

  fontSize: "18px"

}


// =====================================================
// QUANTITY
// =====================================================

const quantitySection = {

  marginTop: "30px",

  paddingTop: "25px",

  borderTop:
    "1px solid #333"

}

const quantityTitle = {

  fontSize: "14px",

  color: "#aaa",

  letterSpacing: "1px"

}

const quantityControls = {

  display: "flex",

  justifyContent: "center",

  alignItems: "center",

  gap: "20px",

  margin: "15px 0"

}

const quantityButton = {

  width: "45px",

  height: "45px",

  borderRadius: "50%",

  border: "1px solid red",

  background: "#111",

  color: "white",

  fontSize: "25px",

  cursor: "pointer"

}

const quantityNumber = {

  fontSize: "25px",

  fontWeight: "bold",

  minWidth: "40px"

}

const totalBox = {

  display: "flex",

  justifyContent: "space-between",

  alignItems: "center",

  background: "#111",

  padding: "15px 20px",

  borderRadius: "10px",

  marginTop: "10px"

}

const buyButton = {

  width: "100%",

  padding: "18px",

  marginTop: "25px",

  background:
    "linear-gradient(90deg,#d00000,#ff1a1a)",

  color: "white",

  border: "none",

  borderRadius: "12px",

  cursor: "pointer",

  fontWeight: "900",

  fontSize: "17px",

  boxShadow:
    "0 0 25px rgba(255,0,0,.3)"

}


// =====================================================
// LOGIN STATUS
// =====================================================

const loggedInMessage = {

  color: "#00ff66",

  fontSize: "13px",

  marginTop: "15px"

}

const loggedOutMessage = {

  color: "#aaa",

  fontSize: "13px",

  marginTop: "15px",

  lineHeight: "1.5"

}


// =====================================================
// BOTTOM
// =====================================================

const bottomSection = {

  textAlign: "center",

  padding: "70px 20px",

  background: "#050505",

  borderTop:
    "1px solid #222"

}

const bottomTitle = {

  fontSize: "45px",

  fontWeight: "900",

  fontStyle: "italic",

  marginBottom: "10px"

}

const bottomText = {

  color: "#ffae00",

  fontSize: "20px",

  fontWeight: "bold"

}

const verse = {

  color: "#aaa",

  maxWidth: "600px",

  margin: "30px auto 5px",

  fontStyle: "italic",

  lineHeight: "1.6"

}

const verseReference = {

  color: "#ffae00"

}

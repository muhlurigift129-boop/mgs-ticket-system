import { useNavigate } from "react-router-dom"
import { auth } from "../firebase/config"

export default function Home() {

  const navigate = useNavigate()

  // ==========================================
  // MGS EVENT TICKET
  // ONLY ONE TICKET TYPE IS AVAILABLE
  // ==========================================

  const ticket = {
    name: "MGS BRAAI & GET TO KNOW EACH OTHER",
    price: 420,
    description:
      "Join us for a day of great food, drinks, music, friendship and good vibes.",
    type: "mgs-braai-2026",
    available: 1,
    date: "12 September 2026",
    time: "12H00",
    location: "Nthabiseko Resort",
    features: [
      "Event Entrance",
      "Meat Included",
      "Drinks Included",
      "Good Music & Entertainment",
      "Connect & Build Friendships",
      "Good Vibes & Good Times"
    ]
  }

  // ==========================================
  // BUY TICKET
  // ==========================================

  function buyTicket() {

    // Save selected ticket
    localStorage.setItem(
      "selectedTicket",
      JSON.stringify(ticket)
    )

    // ------------------------------------------
    // LOGGED IN
    // Go directly to ticket registration
    // ------------------------------------------

    if (auth.currentUser) {

      navigate("/register")

      return
    }

    // ------------------------------------------
    // LOGGED OUT
    // User must create an account first
    // ------------------------------------------

    navigate("/register-account")
  }

  return (

    <div style={page}>

      {/* ======================================
          HERO
      ====================================== */}

      <section style={hero}>

        <div style={heroOverlay}>

          <div style={robot}>

            🤖

          </div>

          <h1 style={mainTitle}>

            MGS BRAAI &

            <br />

            GET TO KNOW EACH OTHER

          </h1>

          <p style={heroText}>

            COME • CONNECT • SHARE • GROW

          </p>

          <p style={heroDescription}>

            Let's braai, laugh and get to know each other.

          </p>

        </div>

      </section>


      {/* ======================================
          EVENT INFORMATION
      ====================================== */}

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
              Nthabiseko Resort
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
              12 September 2026
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
            🎫
          </div>

          <div>

            <span style={infoLabel}>
              PRICE
            </span>

            <strong style={priceValue}>
              R420
            </strong>

            <small style={perPerson}>
              per person
            </small>

          </div>

        </div>

      </section>


      {/* ======================================
          TICKET SECTION
      ====================================== */}

      <section style={ticketSection}>

        <div style={availableBadge}>

          🔥 ONLY 1 TICKET AVAILABLE

        </div>


        <div style={ticketCard}>

          <div style={ticketTop}>

            <span style={ticketTag}>
              LIMITED AVAILABILITY
            </span>

          </div>


          <h2 style={ticketName}>

            {ticket.name}

          </h2>


          <div style={ticketPrice}>

            R{ticket.price}

          </div>


          <p style={ticketDescription}>

            {ticket.description}

          </p>


          {/* ==================================
              EVENT DETAILS
          ================================== */}

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
                🎫 Available
              </span>

              <strong style={availableText}>
                1 TICKET
              </strong>

            </div>

          </div>


          {/* ==================================
              FEATURES
          ================================== */}

          <div style={features}>

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


          {/* ==================================
              BUY BUTTON
          ================================== */}

          <button
            onClick={buyTicket}
            style={buyButton}
          >

            🎫 BUY THE LAST TICKET

          </button>


          <p style={loginNotice}>

            Already have an account?

            <br />

            You will go directly to ticket
            registration.

          </p>

        </div>

      </section>


      {/* ======================================
          BOTTOM MESSAGE
      ====================================== */}

      <section style={bottomSection}>

        <h2>
          DON'T MISS OUT!
        </h2>

        <p>

          Bring your friends and let's
          make memories together.

        </p>

      </section>

    </div>

  )
}


/* ==================================================
   STYLES
================================================== */

const page = {

  minHeight: "100vh",

  background:
    "linear-gradient(180deg,#000 0%,#080808 50%,#111 100%)",

  color: "white",

  paddingTop: "80px",

  boxSizing: "border-box"

}


const hero = {

  minHeight: "420px",

  display: "flex",

  justifyContent: "center",

  alignItems: "center",

  textAlign: "center",

  padding: "60px 20px",

  background:
    "radial-gradient(circle at center,rgba(255,0,0,.15),transparent 60%)"

}


const heroOverlay = {

  maxWidth: "900px",

  margin: "auto"

}


const robot = {

  fontSize: "65px",

  marginBottom: "15px"

}


const mainTitle = {

  fontSize: "clamp(38px,7vw,75px)",

  fontWeight: "900",

  color: "#fff",

  margin: "0",

  lineHeight: "1.05",

  textTransform: "uppercase"

}


const heroText = {

  color: "#ffb000",

  fontSize: "22px",

  fontWeight: "bold",

  marginTop: "25px",

  letterSpacing: "3px"

}


const heroDescription = {

  color: "#ccc",

  fontSize: "18px",

  marginTop: "15px"

}


/* ================================================
   EVENT INFORMATION
================================================ */

const eventInfo = {

  display: "grid",

  gridTemplateColumns:
    "repeat(auto-fit,minmax(220px,1fr))",

  gap: "15px",

  maxWidth: "1200px",

  margin: "0 auto",

  padding: "20px"

}


const infoCard = {

  display: "flex",

  alignItems: "center",

  gap: "15px",

  background: "#111",

  border: "1px solid #333",

  borderRadius: "15px",

  padding: "20px"

}


const infoIcon = {

  fontSize: "32px"

}


const infoLabel = {

  display: "block",

  color: "#ffb000",

  fontSize: "12px",

  fontWeight: "bold",

  marginBottom: "5px"

}


const infoValue = {

  display: "block",

  color: "white",

  fontSize: "17px",

  textTransform: "uppercase"

}


const priceValue = {

  display: "block",

  color: "#ff2b2b",

  fontSize: "30px",

  fontWeight: "900"

}


const perPerson = {

  color: "#aaa",

  fontSize: "12px"

}


/* ================================================
   TICKET SECTION
================================================ */

const ticketSection = {

  maxWidth: "650px",

  margin: "50px auto",

  padding: "20px"

}


const availableBadge = {

  textAlign: "center",

  background: "#450000",

  border: "2px solid red",

  color: "#fff",

  padding: "15px",

  borderRadius: "12px",

  fontWeight: "900",

  fontSize: "18px",

  marginBottom: "20px",

  boxShadow:
    "0 0 20px rgba(255,0,0,.3)"

}


const ticketCard = {

  background:
    "linear-gradient(180deg,#161616,#0b0b0b)",

  border: "2px solid red",

  borderRadius: "25px",

  padding: "35px",

  boxShadow:
    "0 0 40px rgba(255,0,0,.2)",

  textAlign: "center"

}


const ticketTop = {

  marginBottom: "15px"

}


const ticketTag = {

  display: "inline-block",

  background: "#ffb000",

  color: "#000",

  padding: "7px 14px",

  borderRadius: "20px",

  fontWeight: "900",

  fontSize: "11px"

}


const ticketName = {

  color: "#fff",

  fontSize: "28px",

  lineHeight: "1.2",

  margin: "15px 0"

}


const ticketPrice = {

  color: "#ff2020",

  fontSize: "65px",

  fontWeight: "900",

  margin: "10px 0"

}


const ticketDescription = {

  color: "#aaa",

  lineHeight: "1.6",

  fontSize: "16px"

}


/* ================================================
   DETAILS
================================================ */

const detailsBox = {

  background: "#080808",

  borderRadius: "15px",

  padding: "15px",

  marginTop: "25px",

  border: "1px solid #333"

}


const detailRow = {

  display: "flex",

  justifyContent: "space-between",

  gap: "20px",

  padding: "12px 5px",

  borderBottom: "1px solid #222",

  textAlign: "left"

}


const availableText = {

  color: "#ff2b2b"

}


/* ================================================
   FEATURES
================================================ */

const features = {

  marginTop: "25px",

  textAlign: "left"

}


const featureRow = {

  display: "flex",

  gap: "12px",

  alignItems: "center",

  padding: "8px 0",

  color: "#ddd"

}


const check = {

  color: "#ffb000",

  fontWeight: "900",

  fontSize: "20px"

}


/* ================================================
   BUY BUTTON
================================================ */

const buyButton = {

  width: "100%",

  padding: "18px",

  marginTop: "25px",

  background:
    "linear-gradient(90deg,#ff0000,#b00000)",

  color: "white",

  border: "none",

  borderRadius: "12px",

  fontSize: "18px",

  fontWeight: "900",

  cursor: "pointer",

  boxShadow:
    "0 0 20px rgba(255,0,0,.3)"

}


const loginNotice = {

  color: "#777",

  fontSize: "12px",

  lineHeight: "1.5",

  marginTop: "15px"

}


/* ================================================
   BOTTOM
================================================ */

const bottomSection = {

  textAlign: "center",

  padding: "60px 20px 100px"

}


const bottomTitle = {

  color: "white"

}

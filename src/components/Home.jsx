import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import {
  onAuthStateChanged
} from "firebase/auth"

import {
  auth
} from "../firebase/config"


export default function Home() {

  const navigate = useNavigate()

  // ======================================
  // AUTH STATE
  // ======================================

  const [user, setUser] = useState(null)

  const [authLoading, setAuthLoading] =
    useState(true)

  const [buyingId, setBuyingId] =
    useState(null)


  // ======================================
  // FIREBASE AUTH LISTENER
  // ======================================

  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(
        auth,
        (currentUser) => {

          setUser(currentUser)

          setAuthLoading(false)

        }
      )

    return () => unsubscribe()

  }, [])


  // ======================================
  // ALL MGS TICKETS
  // ======================================

  const tickets = [

    // ====================================
    // 12 SEPTEMBER 2026
    // EXISTING TICKET — DO NOT CHANGE
    // ====================================

    {
      id: "MGS-EVENT-2026",

      name: "MGS EVENT TICKET",

      price: 420,

      // Full payment required
      deposit: 420,

      balance: 0,

      description:
        "Full access to the MGS Event on 12 September 2026.",

      type: "mgs-event",

      eventName: "MGS EVENT",

      eventDate: "12 September 2026",

      popular: true,

      ticketCategory: "Standard",

      features: [
        "Full Event Access",
        "Main Stage",
        "Live Entertainment",
        "Networking",
        "All Activities"
      ]

    },


    // ====================================
    // 07 NOVEMBER 2026
    // R900 PER PERSON
    // ====================================

    {
      id: "MGS-NOV-2026-PER-PERSON",

      name: "07 NOVEMBER TICKET",

      price: 900,

      deposit: 400,

      balance: 500,

      description:
        "Full access to the MGS Event on 07 November 2026.",

      type: "november-person",

      eventName: "MGS EVENT",

      eventDate: "07 November 2026",

      popular: true,

      ticketCategory: "Per Person",

      features: [
        "Full Event Access",
        "Main Stage",
        "Live Entertainment",
        "Networking",
        "All Activities"
      ]

    },


    // ====================================
    // 07 NOVEMBER 2026
    // R1300 COUPLE
    // ====================================

    {
      id: "MGS-NOV-2026-COUPLE",

      name: "07 NOVEMBER COUPLE TICKET",

      price: 1300,

      deposit: 400,

      balance: 900,

      description:
        "Couple ticket for the MGS Event on 07 November 2026.",

      type: "november-couple",

      eventName: "MGS EVENT",

      eventDate: "07 November 2026",

      popular: true,

      ticketCategory: "Couple",

      features: [
        "Entry for 2 People",
        "Full Event Access",
        "Main Stage",
        "Live Entertainment",
        "Networking",
        "All Activities"
      ]

    }

  ]


  // ======================================
  // BUY TICKET
  // ======================================

  function selectTicket(ticket) {

    if (buyingId !== null) {
      return
    }

    setBuyingId(ticket.id)


    // ====================================
    // PREPARE PAYMENT INFORMATION
    // ====================================

    const selectedTicket = {

      ...ticket,

      // Make sure numbers are stored
      // as numbers and not strings.

      price: Number(ticket.price),

      deposit: Number(ticket.deposit),

      balance: Number(ticket.balance),

      // Amount to pay now
      paymentAmount: Number(ticket.deposit),

      // Amount still outstanding
      remainingBalance: Number(ticket.balance)

    }


    // ====================================
    // SAVE SELECTED TICKET
    // ====================================

    try {

      localStorage.setItem(
        "selectedTicket",
        JSON.stringify(selectedTicket)
      )

      console.log(
        "MGS SELECTED TICKET:",
        selectedTicket
      )

    } catch (error) {

      console.error(
        "Could not save selected ticket:",
        error
      )

      setBuyingId(null)

      alert(
        "Unable to save your ticket selection. Please try again."
      )

      return

    }


    // ====================================
    // LOGGED IN
    // ====================================

    if (user) {

      console.log(
        "MGS: User logged in."
      )

      navigate(
        "/register"
      )

      return

    }


    // ====================================
    // NOT LOGGED IN
    // ====================================

    console.log(
      "MGS: User not logged in."
    )

    navigate(
      "/login"
    )

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
          MGS EVENTS
        </h1>


        <p style={desc}>
          Get ready for unforgettable MGS
          experiences. Choose your ticket below
          and secure your place.
        </p>

      </div>


      {/* ==================================
          TICKETS
      ================================== */}

      <div style={ticketContainer}>

        {tickets.map((ticket) => (

          <div
            key={ticket.id}
            style={card}
          >

            {/* ==============================
                BADGE
            ============================== */}

            <div style={badge}>
              {ticket.ticketCategory ||
                "MGS EVENT TICKET"}
            </div>


            {/* ==============================
                TICKET NAME
            ============================== */}

            <h2 style={ticketName}>
              {ticket.name}
            </h2>


            {/* ==============================
                DATE
            ============================== */}

            <div style={eventDate}>
              📅 {ticket.eventDate}
            </div>


            {/* ==============================
                PRICE
            ============================== */}

            <div style={price}>
              R{ticket.price}
            </div>


            <p style={priceLabel}>

              {ticket.ticketCategory === "Couple"

                ? "FOR 2 PEOPLE"

                : ticket.ticketCategory === "Per Person"

                  ? "PER PERSON"

                  : "TICKET PRICE"

              }

            </p>


            {/* ==============================
                DEPOSIT
            ============================== */}

            <div style={paymentBox}>

              <div style={paymentRow}>

                <span>
                  Deposit
                </span>

                <strong style={depositAmount}>
                  R{ticket.deposit}
                </strong>

              </div>


              {ticket.balance > 0 && (

                <div style={paymentRow}>

                  <span>
                    Balance after deposit
                  </span>

                  <strong>
                    R{ticket.balance}
                  </strong>

                </div>

              )}


              {ticket.balance === 0 && (

                <p style={paidText}>
                  Full payment required
                </p>

              )}

            </div>


            {/* ==============================
                DESCRIPTION
            ============================== */}

            <p style={description}>
              {ticket.description}
            </p>


            {/* ==============================
                EVENT DETAILS
            ============================== */}

            <div style={details}>

              <div style={detailRow}>

                <span>
                  📅 Date
                </span>

                <strong>
                  {ticket.eventDate}
                </strong>

              </div>


              <div style={detailRow}>

                <span>
                  🎟 Ticket
                </span>

                <strong>
                  {ticket.ticketCategory ||
                    "Full Event Access"}
                </strong>

              </div>


              <div style={detailRow}>

                <span>
                  💰 Full Price
                </span>

                <strong>
                  R{ticket.price}
                </strong>

              </div>


              <div style={detailRow}>

                <span>
                  💳 Pay Now
                </span>

                <strong style={{ color: "red" }}>
                  R{ticket.deposit}
                </strong>

              </div>


              <div
                style={{
                  ...detailRow,
                  borderBottom: "none"
                }}
              >

                <span>
                  📌 Remaining
                </span>

                <strong>
                  R{ticket.balance}
                </strong>

              </div>

            </div>


            {/* ==============================
                FEATURES
            ============================== */}

            <div style={features}>

              <h3 style={featuresTitle}>
                YOUR TICKET INCLUDES
              </h3>


              {ticket.features.map(
                (feature) => (

                  <p
                    key={feature}
                    style={featureItem}
                  >
                    ✓ {feature}
                  </p>

                )
              )}

            </div>


            {/* ==============================
                BUY BUTTON
            ============================== */}

            <button
              onClick={() =>
                selectTicket(ticket)
              }

              style={{
                ...buyBtn,

                opacity:
                  authLoading ||
                  buyingId !== null
                    ? 0.6
                    : 1,

                cursor:
                  authLoading ||
                  buyingId !== null
                    ? "not-allowed"
                    : "pointer"
              }}

              disabled={
                authLoading ||
                buyingId !== null
              }
            >

              {authLoading

                ? "CHECKING ACCOUNT..."

                : buyingId === ticket.id

                  ? "CONTINUING..."

                  : `BUY NOW — PAY R${ticket.deposit}`

              }

            </button>


            {/* ==============================
                PAYMENT MESSAGE
            ============================== */}

            <p style={loginMessage}>

              {ticket.balance > 0

                ? `Pay R${ticket.deposit} deposit now. Your remaining balance is R${ticket.balance}.`

                : "Full payment is required for this ticket."

              }

            </p>


            {/* ==============================
                LOGIN MESSAGE
            ============================== */}

            <p style={loginMessage}>

              {authLoading

                ? "Checking your account..."

                : user

                  ? "You are logged in. Continue directly to ticket registration."

                  : "Login or create an account before completing your purchase."

              }

            </p>

          </div>

        ))}

      </div>


      {/* ==================================
          FOOTER
      ================================== */}

      <div style={footer}>

        <p>
          © 2026 MGS EVENTS
        </p>

        <p>
          MGS EVENT TICKETS
        </p>

      </div>

    </div>

  )

}


// ==================================================
// PAGE STYLE
// ==================================================

const page = {

  minHeight: "100vh",

  background:
    "linear-gradient(180deg,#000000 0%,#090909 50%,#111111 100%)",

  color: "white",

  paddingTop: "65px",

  boxSizing: "border-box"

}


// ==================================================
// HEADER
// ==================================================

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
    "clamp(45px,8vw,80px)",

  margin:
    "0 0 20px",

  fontWeight: "900",

  letterSpacing: "3px"

}


const desc = {

  color: "#aaa",

  maxWidth: "650px",

  margin: "0 auto",

  lineHeight: "1.7",

  fontSize: "16px"

}


// ==================================================
// TICKET CONTAINER
// ==================================================

const ticketContainer = {

  display: "grid",

  gridTemplateColumns:
    "repeat(auto-fit,minmax(300px,500px))",

  justifyContent: "center",

  gap: "30px",

  padding:
    "20px 20px 60px"

}


// ==================================================
// CARD
// ==================================================

const card = {

  width: "100%",

  background:
    "linear-gradient(145deg,#151515,#0b0b0b)",

  border:
    "2px solid red",

  borderRadius: "25px",

  padding: "35px",

  boxSizing: "border-box",

  textAlign: "center",

  boxShadow:
    "0 0 35px rgba(255,0,0,.25)"

}


// ==================================================
// BADGE
// ==================================================

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


// ==================================================
// TICKET NAME
// ==================================================

const ticketName = {

  color: "white",

  fontSize: "28px",

  margin:
    "5px 0 10px",

  fontWeight: "900"

}


// ==================================================
// EVENT DATE
// ==================================================

const eventDate = {

  color: "#ddd",

  fontSize: "16px",

  fontWeight: "bold",

  marginBottom: "10px"

}


// ==================================================
// PRICE
// ==================================================

const price = {

  color: "red",

  fontSize: "60px",

  fontWeight: "900",

  margin:
    "5px 0"

}


// ==================================================
// PRICE LABEL
// ==================================================

const priceLabel = {

  color: "#aaa",

  fontSize: "12px",

  fontWeight: "bold",

  letterSpacing: "2px",

  marginBottom: "20px"

}


// ==================================================
// PAYMENT BOX
// ==================================================

const paymentBox = {

  background:
    "linear-gradient(145deg,#1b0000,#100000)",

  border:
    "1px solid red",

  borderRadius: "14px",

  padding: "15px",

  marginBottom: "20px"

}


const paymentRow = {

  display: "flex",

  justifyContent: "space-between",

  alignItems: "center",

  gap: "10px",

  padding: "8px 0",

  color: "#ccc"

}


const depositAmount = {

  color: "red",

  fontSize: "20px"

}


const paidText = {

  color: "#aaa",

  margin: "8px 0 0",

  fontSize: "13px"

}


// ==================================================
// DESCRIPTION
// ==================================================

const description = {

  color: "#aaa",

  lineHeight: "1.6",

  marginBottom: "25px"

}


// ==================================================
// DETAILS
// ==================================================

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


// ==================================================
// FEATURES
// ==================================================

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


// ==================================================
// BUY BUTTON
// ==================================================

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


// ==================================================
// LOGIN MESSAGE
// ==================================================

const loginMessage = {

  color: "#777",

  fontSize: "12px",

  lineHeight: "1.5",

  marginTop: "15px"

}


// ==================================================
// FOOTER
// ==================================================

const footer = {

  textAlign: "center",

  padding:
    "30px 20px",

  borderTop:
    "1px solid #222",

  color: "#666",

  fontSize: "13px"

}

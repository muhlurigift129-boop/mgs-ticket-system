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
  // PAYMENT CHOICE
  // ticket.id -> "full" OR "deposit"
  // ======================================

  const [paymentChoices, setPaymentChoices] =
    useState({})


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
    // THABISEKO TRIP
    // 12 SEPTEMBER 2026
    // R420
    // ====================================

    {
      id: "MGS-THABISEKO-2026",

      name: "THABISEKO TRIP",

      price: 420,

      deposit: 420,

      balance: 0,

      description:
        "Thabiseko Trip on 12 September 2026. Full payment is required to secure your ticket.",

      type: "thabiseko-trip",

      eventName: "THABISEKO TRIP",

      eventDate: "12 September 2026",

      popular: true,

      ticketCategory: "Standard",

      allowDeposit: false,

      features: [
        "Full Event Access",
        "Main Stage",
        "Live Entertainment",
        "Networking",
        "All Activities"
      ]

    },


    // ====================================
    // BELA BELA TRIP
    // 07 NOVEMBER 2026
    // SINGLE — R900
    // DEPOSIT — R400
    // BALANCE — R500
    // ====================================

    {
      id: "MGS-BELA-BELA-2026-SINGLE",

      name: "BELA BELA TRIP — SINGLE",

      price: 900,

      deposit: 400,

      balance: 500,

      description:
        "Bela Bela Trip on 07 November 2026. Choose to pay the full R900 or secure your spot with a R400 deposit.",

      type: "bela-bela-single",

      eventName: "BELA BELA TRIP",

      eventDate: "07 November 2026",

      popular: true,

      ticketCategory: "Single",

      allowDeposit: true,

      features: [
        "Entry for 1 Person",
        "Full Event Access",
        "Main Stage",
        "Live Entertainment",
        "Networking",
        "All Activities"
      ]

    },


    // ====================================
    // BELA BELA TRIP
    // 07 NOVEMBER 2026
    // COUPLE — R1300
    // DEPOSIT — R400
    // BALANCE — R900
    // ====================================

    {
      id: "MGS-BELA-BELA-2026-COUPLE",

      name: "BELA BELA TRIP — COUPLE",

      price: 1300,

      deposit: 400,

      balance: 900,

      description:
        "Bela Bela Trip on 07 November 2026. Choose to pay the full R1,300 or secure your spot with a R400 deposit.",

      type: "bela-bela-couple",

      eventName: "BELA BELA TRIP",

      eventDate: "07 November 2026",

      popular: true,

      ticketCategory: "Couple",

      allowDeposit: true,

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
  // SET PAYMENT CHOICE
  // ======================================

  function choosePayment(ticket, choice) {

    setPaymentChoices((previous) => ({

      ...previous,

      [ticket.id]: choice

    }))

  }


  // ======================================
  // BUY TICKET
  // ======================================

  function selectTicket(ticket) {

    if (buyingId !== null) {
      return
    }


    // ====================================
    // DETERMINE PAYMENT TYPE
    // ====================================

    const selectedPayment =
      paymentChoices[ticket.id] ||
      (ticket.allowDeposit ? "deposit" : "full")


    const isFullPayment =
      selectedPayment === "full"


    // ====================================
    // CALCULATE PAYMENT
    // ====================================

    const paymentAmount =
      isFullPayment
        ? Number(ticket.price)
        : Number(ticket.deposit)


    const remainingBalance =
      isFullPayment
        ? 0
        : Number(ticket.balance)


    setBuyingId(ticket.id)


    // ====================================
    // PREPARE PAYMENT INFORMATION
    // ====================================

    const selectedTicket = {

      ...ticket,

      price: Number(ticket.price),

      deposit: Number(ticket.deposit),

      balance: Number(ticket.balance),

      // ==================================
      // PAYMENT SELECTION
      // ==================================

      paymentType:
        isFullPayment
          ? "full"
          : "deposit",

      paymentLabel:
        isFullPayment
          ? "Full Payment"
          : "Deposit",

      // ==================================
      // AMOUNT TO PAY NOW
      // ==================================

      paymentAmount,

      // ==================================
      // AMOUNT STILL OWING
      // ==================================

      remainingBalance

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
          Choose your trip and ticket.
          For the Bela Bela Trip, you can
          pay in full or secure your spot
          with a deposit.
        </p>

      </div>


      {/* ==================================
          TICKETS
      ================================== */}

      <div style={ticketContainer}>

        {tickets.map((ticket) => {

          const selectedPayment =
            paymentChoices[ticket.id] ||
            (ticket.allowDeposit
              ? "deposit"
              : "full")


          const isFullPayment =
            selectedPayment === "full"


          const amountToPay =
            isFullPayment
              ? ticket.price
              : ticket.deposit


          const remaining =
            isFullPayment
              ? 0
              : ticket.balance


          return (

            <div
              key={ticket.id}
              style={card}
            >

              {/* ==============================
                  BADGE
              ============================== */}

              <div style={badge}>
                {ticket.ticketCategory}
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
                  : ticket.ticketCategory === "Single"
                    ? "FOR 1 PERSON"
                    : "TICKET PRICE"}

              </p>


              {/* ==============================
                  PAYMENT CHOICE
              ============================== */}

              <div style={paymentBox}>

                <h3 style={paymentTitle}>
                  CHOOSE PAYMENT OPTION
                </h3>


                {/* ============================
                    FULL PAYMENT
                ============================ */}

                <button
                  type="button"
                  onClick={() =>
                    choosePayment(
                      ticket,
                      "full"
                    )
                  }

                  style={{
                    ...paymentChoiceButton,

                    ...(isFullPayment
                      ? selectedPaymentStyle
                      : {})
                  }}
                >

                  <div>
                    <strong>
                      💳 PAY IN FULL
                    </strong>

                    <small>
                      Pay R{ticket.price} now
                    </small>
                  </div>


                  <span>
                    {isFullPayment
                      ? "✓"
                      : ""}
                  </span>

                </button>


                {/* ============================
                    DEPOSIT
                ============================ */}

                {ticket.allowDeposit && (

                  <button
                    type="button"
                    onClick={() =>
                      choosePayment(
                        ticket,
                        "deposit"
                      )
                    }

                    style={{
                      ...paymentChoiceButton,

                      ...(selectedPayment === "deposit"
                        ? selectedPaymentStyle
                        : {})
                    }}
                  >

                    <div>
                      <strong>
                        🔐 PAY DEPOSIT
                      </strong>

                      <small>
                        Pay R{ticket.deposit} now
                        {" "}• Remaining R{ticket.balance}
                      </small>
                    </div>


                    <span>
                      {selectedPayment === "deposit"
                        ? "✓"
                        : ""}
                    </span>

                  </button>

                )}


                {/* ============================
                    PAYMENT SUMMARY
                ============================ */}

                <div style={paymentSummary}>

                  <div style={paymentRow}>

                    <span>
                      Full Price
                    </span>

                    <strong>
                      R{ticket.price}
                    </strong>

                  </div>


                  <div style={paymentRow}>

                    <span>
                      Paying Now
                    </span>

                    <strong style={depositAmount}>
                      R{amountToPay}
                    </strong>

                  </div>


                  <div
                    style={{
                      ...paymentRow,
                      borderBottom: "none"
                    }}
                  >

                    <span>
                      Remaining
                    </span>

                    <strong>
                      R{remaining}
                    </strong>

                  </div>

                </div>

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
                    📍 Trip
                  </span>

                  <strong>
                    {ticket.eventName}
                  </strong>

                </div>


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
                    {ticket.ticketCategory}
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
                    💳 Paying Now
                  </span>

                  <strong style={{ color: "red" }}>
                    R{amountToPay}
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
                    R{remaining}
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

                    : `CONTINUE — PAY R${amountToPay}`

                }

              </button>


              {/* ==============================
                  PAYMENT MESSAGE
              ============================== */}

              <p style={loginMessage}>

                {isFullPayment

                  ? `You selected full payment of R${ticket.price}. Your remaining balance will be R0.`

                  : `You selected the R${ticket.deposit} deposit. Your remaining balance will be R${ticket.balance}.`

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

          )

        })}

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


const paymentTitle = {

  color: "white",

  fontSize: "15px",

  letterSpacing: "1px",

  margin:
    "0 0 12px"

}


const paymentChoiceButton = {

  width: "100%",

  display: "flex",

  justifyContent: "space-between",

  alignItems: "center",

  textAlign: "left",

  background: "#111",

  color: "white",

  border: "1px solid #333",

  borderRadius: "10px",

  padding: "14px",

  marginBottom: "10px",

  cursor: "pointer",

  fontSize: "15px"

}


const selectedPaymentStyle = {

  background:
    "linear-gradient(145deg,#3a0000,#1b0000)",

  border:
    "2px solid red"

}


const paymentSummary = {

  background: "#080808",

  border:
    "1px solid #292929",

  borderRadius: "10px",

  padding: "10px",

  marginTop: "12px"

}


const paymentRow = {

  display: "flex",

  justifyContent: "space-between",

  alignItems: "center",

  gap: "10px",

  padding: "8px 0",

  color: "#ccc",

  borderBottom:
    "1px solid #222"

}


const depositAmount = {

  color: "red",

  fontSize: "20px"

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

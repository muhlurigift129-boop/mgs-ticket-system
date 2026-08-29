import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { onAuthStateChanged } from "firebase/auth"

import { auth, db } from "../firebase/config"

import {
  addDoc,
  collection
} from "firebase/firestore"


export default function Register() {

  const navigate = useNavigate()


  // ======================================
  // AUTH
  // ======================================

  const [user, setUser] = useState(null)

  const [authLoading, setAuthLoading] =
    useState(true)

  const [loading, setLoading] =
    useState(false)


  // ======================================
  // SELECTED TICKET
  // ======================================

  const [ticket, setTicket] =
    useState(null)


  // ======================================
  // FORM
  // ======================================

  const [formData, setFormData] = useState({

    fullName: "",

    email: "",

    phone: "",

    delivery: "email",

    quantity: 1

  })


  // ======================================
  // FIREBASE AUTH
  // ======================================

  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(
        auth,
        (currentUser) => {

          setUser(currentUser)

          setAuthLoading(false)

          if (currentUser) {

            setFormData(prev => ({

              ...prev,

              email:
                currentUser.email || ""

            }))

          }

        }
      )

    return () => unsubscribe()

  }, [])


  // ======================================
  // LOAD SELECTED TICKET
  // ======================================

  useEffect(() => {

    try {

      const savedTicket =
        localStorage.getItem(
          "selectedTicket"
        )


      if (savedTicket) {

        const parsedTicket =
          JSON.parse(savedTicket)


        /*
         * Make sure the important
         * payment fields exist.
         */

        const normalizedTicket = {

          ...parsedTicket,

          price:
            Number(parsedTicket.price) || 420,

          deposit:
            Number(parsedTicket.deposit) || 0

        }


        setTicket(
          normalizedTicket
        )

        return

      }


      // ==================================
      // DEFAULT EXISTING TICKET
      // ==================================

      const defaultTicket = {

        id:
          "MGS-EVENT-2026",

        name:
          "MGS EVENT TICKET",

        price:
          420,

        deposit:
          420,

        type:
          "mgs-event",

        eventName:
          "MGS EVENT",

        eventDate:
          "12 September 2026",

        paymentType:
          "full"

      }


      setTicket(
        defaultTicket
      )


      localStorage.setItem(

        "selectedTicket",

        JSON.stringify(
          defaultTicket
        )

      )

    } catch (error) {

      console.error(
        "Ticket loading error:",
        error
      )


      const fallbackTicket = {

        id:
          "MGS-EVENT-2026",

        name:
          "MGS EVENT TICKET",

        price:
          420,

        deposit:
          420,

        type:
          "mgs-event",

        eventName:
          "MGS EVENT",

        eventDate:
          "12 September 2026",

        paymentType:
          "full"

      }


      setTicket(
        fallbackTicket
      )

    }

  }, [])


  // ======================================
  // PROTECT PAGE
  // ======================================

  useEffect(() => {

    if (
      !authLoading &&
      !user
    ) {

      navigate(
        "/login",
        {
          replace: true
        }
      )

    }

  }, [
    authLoading,
    user,
    navigate
  ])


  // ======================================
  // LOADING
  // ======================================

  if (
    authLoading ||
    !ticket
  ) {

    return (

      <div style={loadingPage}>

        <div>

          <h1
            style={{
              color: "red"
            }}
          >
            MGS EVENTS
          </h1>

          <p>
            Loading ticket registration...
          </p>

        </div>

      </div>

    )

  }


  // ======================================
  // PRICE
  // ======================================

  const price =
    Number(ticket.price) || 420


  // ======================================
  // QUANTITY
  // ======================================

  const quantity =
    Math.min(
      20,
      Math.max(
        1,
        Number(formData.quantity) || 1
      )
    )


  // ======================================
  // FULL ORDER TOTAL
  // ======================================

  const total =
    price * quantity


  // ======================================
  // DEPOSIT PER TICKET
  // ======================================

  /*
   * New 07 November tickets:
   *
   * Single  = R900
   * Couple  = R1300
   * Deposit = R400
   *
   * Existing 12 September ticket:
   *
   * R420 and paid in full.
   */

  let depositPerTicket =
    Number(ticket.deposit)


  if (
    !depositPerTicket ||
    depositPerTicket <= 0
  ) {

    if (
      ticket.eventDate ===
      "07 November 2026"
    ) {

      depositPerTicket = 400

    } else {

      depositPerTicket = price

    }

  }


  // ======================================
  // DEPOSIT TOTAL
  // ======================================

  const depositTotal =
    depositPerTicket * quantity


  // ======================================
  // REMAINING BALANCE
  // ======================================

  const remainingBalance =
    Math.max(
      0,
      total - depositTotal
    )


  // ======================================
  // PAYMENT TYPE
  // ======================================

  const isDepositTicket =
    ticket.eventDate ===
      "07 November 2026"


  const paymentAmount =
    isDepositTicket
      ? depositTotal
      : total


  // ======================================
  // FORM CHANGE
  // ======================================

  function handleChange(e) {

    const {
      name,
      value
    } = e.target


    setFormData(prev => ({

      ...prev,

      [name]:
        name === "quantity"
          ? Math.min(
              20,
              Math.max(
                1,
                Number(value) || 1
              )
            )
          : value

    }))

  }


  // ======================================
  // CREATE ORDER
  // ======================================

  async function handleSubmit(e) {

    e.preventDefault()


    // --------------------------------------
    // CHECK LOGIN
    // --------------------------------------

    const currentUser =
      auth.currentUser


    if (!currentUser) {

      alert(
        "Your login session has expired. Please login again."
      )


      navigate(
        "/login",
        {
          replace: true
        }
      )


      return

    }


    // --------------------------------------
    // VALIDATION
    // --------------------------------------

    if (
      !formData.fullName.trim()
    ) {

      alert(
        "Please enter your full name."
      )

      return

    }


    if (
      !formData.phone.trim()
    ) {

      alert(
        "Please enter your phone number."
      )

      return

    }


    if (
      !formData.email.trim()
    ) {

      alert(
        "Please enter your email address."
      )

      return

    }


    if (
      quantity < 1
    ) {

      alert(
        "Ticket quantity must be at least 1."
      )

      return

    }


    setLoading(true)


    try {

      // ====================================
      // UNIQUE ORDER ID
      // ====================================

      const localOrderId =
        `MGS-${Date.now()}-${Math.random()
          .toString(36)
          .substring(2, 8)
          .toUpperCase()}`


      // ====================================
      // ORDER OBJECT
      // ====================================

      const order = {

        // -------------------------------
        // IDENTIFICATION
        // -------------------------------

        orderId:
          localOrderId,

        userId:
          currentUser.uid,


        // -------------------------------
        // CUSTOMER
        // -------------------------------

        fullName:
          formData.fullName.trim(),

        email:
          formData.email.trim(),

        phone:
          formData.phone.trim(),

        delivery:
          formData.delivery,


        // -------------------------------
        // TICKET
        // -------------------------------

        ticketId:
          ticket.id ||
          "MGS-EVENT-2026",

        ticketType:
          ticket.type ||
          "mgs-event",

        ticketName:
          ticket.name ||
          "MGS EVENT TICKET",

        packageName:
          ticket.name ||
          "MGS EVENT TICKET",

        eventName:
          ticket.eventName ||
          "MGS EVENT",

        eventDate:
          ticket.eventDate ||
          "12 September 2026",


        // -------------------------------
        // QUANTITY
        // -------------------------------

        quantity:
          quantity,


        // -------------------------------
        // PRICING
        // -------------------------------

        price:
          price,

        total:
          total,

        depositPerTicket:
          depositPerTicket,

        depositTotal:
          depositTotal,

        remainingBalance:
          remainingBalance,


        // -------------------------------
        // PAYMENT
        // -------------------------------

        paymentAmount:
          paymentAmount,

        paymentType:
          isDepositTicket
            ? "deposit"
            : "full",

        paymentStatus:
          "unpaid",

        paid:
          false,

        status:
          "Pending Payment",


        // -------------------------------
        // IMPORTANT
        // -------------------------------

        ticketCreated:
          false,

        ticketCreatedAt:
          null,

        payfastPaymentId:
          null,


        // -------------------------------
        // DATE
        // -------------------------------

        createdAt:
          new Date().toISOString()

      }


      console.log(
        "MGS ORDER TO CREATE:",
        order
      )


      // ====================================
      // SAVE FIRESTORE
      // ====================================

      const orderRef =
        await addDoc(

          collection(
            db,
            "tickets"
          ),

          {

            ...order,

            firestoreCreatedAt:
              new Date().toISOString()

          }

        )


      // ====================================
      // FINAL ORDER
      // ====================================

      const finalOrder = {

        ...order,

        firestoreId:
          orderRef.id

      }


      // ====================================
      // SAVE LOCAL ORDER
      // ====================================

      localStorage.setItem(

        "mgsCustomer",

        JSON.stringify(
          finalOrder
        )

      )


      localStorage.setItem(

        "mgsOrderId",

        orderRef.id

      )


      // ====================================
      // SAVE PAYMENT AMOUNT
      // ====================================

      localStorage.setItem(

        "mgsPaymentAmount",

        String(
          paymentAmount
        )

      )


      // ====================================
      // SAVE PAYMENT DETAILS
      // ====================================

      localStorage.setItem(

        "mgsPaymentInfo",

        JSON.stringify({

          orderId:
            orderRef.id,

          amount:
            paymentAmount,

          fullPrice:
            total,

          deposit:
            depositTotal,

          balance:
            remainingBalance,

          paymentType:
            isDepositTicket
              ? "deposit"
              : "full"

        })

      )


      console.log(
        "MGS ORDER CREATED:",
        finalOrder
      )


      console.log(
        "Firestore ID:",
        orderRef.id
      )


      // ====================================
      // GO TO PAYMENT
      // ====================================

      navigate(
        "/payment",
        {
          replace: false
        }
      )


    } catch (error) {

      console.error(
        "MGS ORDER CREATION ERROR:",
        error
      )


      alert(

        "Could not create your order.\n\n" +

        error.message

      )

    } finally {

      setLoading(false)

    }

  }


  // ======================================
  // PAGE
  // ======================================

  return (

    <div style={container}>

      <div style={card}>


        {/* HEADER */}

        <p style={eventLabel}>
          MGS EVENTS
        </p>


        <h1 style={title}>
          TICKET REGISTRATION
        </h1>


        <p style={subtitle}>
          Complete your details before payment.
        </p>


        {/* ==================================
            TICKET SUMMARY
        ================================== */}

        <div style={ticketSummary}>

          <div style={ticketBadge}>
            MGS EVENT TICKET
          </div>


          <h2 style={ticketTitle}>
            {ticket.name}
          </h2>


          <p style={eventDate}>
            📅 {ticket.eventDate}
          </p>


          <div style={priceBox}>

            <span>
              FULL PRICE
            </span>

            <strong>
              R{price}
            </strong>

          </div>


          {/* DEPOSIT */}

          {isDepositTicket && (

            <div
              style={{
                ...depositBox,
                marginTop: "12px"
              }}
            >

              <span>
                DEPOSIT
              </span>

              <strong>
                R{depositPerTicket}
              </strong>

            </div>

          )}

        </div>


        {/* ==================================
            FORM
        ================================== */}

        <form
          onSubmit={handleSubmit}
        >


          {/* FULL NAME */}

          <label style={label}>
            FULL NAME
          </label>

          <input
            type="text"
            name="fullName"
            placeholder="Enter your full name"
            required
            value={
              formData.fullName
            }
            onChange={
              handleChange
            }
            style={inputStyle}
            disabled={loading}
          />


          {/* EMAIL */}

          <label style={label}>
            EMAIL ADDRESS
          </label>

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
            value={
              formData.email
            }
            onChange={
              handleChange
            }
            style={inputStyle}
            disabled={loading}
          />


          {/* PHONE */}

          <label style={label}>
            PHONE / WHATSAPP
          </label>

          <input
            type="tel"
            name="phone"
            placeholder="e.g. 071 234 5678"
            required
            value={
              formData.phone
            }
            onChange={
              handleChange
            }
            style={inputStyle}
            disabled={loading}
          />


          {/* QUANTITY */}

          <label style={label}>
            NUMBER OF TICKETS
          </label>

          <input
            type="number"
            name="quantity"
            min="1"
            max="20"
            value={
              quantity
            }
            onChange={
              handleChange
            }
            style={inputStyle}
            disabled={loading}
          />


          {/* DELIVERY */}

          <label style={label}>
            TICKET DELIVERY
          </label>

          <select
            name="delivery"
            value={
              formData.delivery
            }
            onChange={
              handleChange
            }
            style={inputStyle}
            disabled={loading}
          >

            <option value="email">
              Email Ticket
            </option>

            <option value="whatsapp">
              WhatsApp Ticket
            </option>

          </select>


          {/* ==================================
              ORDER SUMMARY
          ================================== */}

          <div style={summary}>

            <h2 style={summaryTitle}>
              ORDER SUMMARY
            </h2>


            <div style={summaryRow}>

              <span>
                Ticket
              </span>

              <strong>
                {ticket.name}
              </strong>

            </div>


            <div style={summaryRow}>

              <span>
                Event Date
              </span>

              <strong>
                {ticket.eventDate}
              </strong>

            </div>


            <div style={summaryRow}>

              <span>
                Price Each
              </span>

              <strong>
                R{price}
              </strong>

            </div>


            <div style={summaryRow}>

              <span>
                Quantity
              </span>

              <strong>
                {quantity}
              </strong>

            </div>


            <div style={summaryRow}>

              <span>
                Full Order Value
              </span>

              <strong>
                R{total}
              </strong>

            </div>


            {/* DEPOSIT */}

            {isDepositTicket && (

              <>

                <div style={summaryRow}>

                  <span>
                    Deposit Required
                  </span>

                  <strong
                    style={{
                      color: "orange"
                    }}
                  >
                    R{depositTotal}
                  </strong>

                </div>


                <div style={summaryRow}>

                  <span>
                    Balance After Deposit
                  </span>

                  <strong
                    style={{
                      color: "#ff7777"
                    }}
                  >
                    R{remainingBalance}
                  </strong>

                </div>

              </>

            )}


            {/* PAYMENT TODAY */}

            <div
              style={{
                ...summaryRow,
                borderBottom: "none",
                paddingTop: "20px"
              }}
            >

              <span style={totalLabel}>
                PAY NOW
              </span>

              <strong
                style={totalPrice}
              >
                R{paymentAmount}
              </strong>

            </div>


          </div>


          {/* ==================================
              PAYMENT NOTICE
          ================================== */}

          <div style={paymentNotice}>

            <strong>
              {isDepositTicket
                ? "R400 deposit required"
                : "Full payment required"
              }
            </strong>


            <p>

              {isDepositTicket

                ? `You will pay R${paymentAmount} now. Your remaining balance will be R${remainingBalance}.`

                : `You will pay the full amount of R${paymentAmount}.`

              }

            </p>

          </div>


          {/* ==================================
              PAYMENT BUTTON
          ================================== */}

          <button
            type="submit"
            disabled={loading}
            style={{
              ...button,

              opacity:
                loading
                  ? 0.6
                  : 1,

              cursor:
                loading
                  ? "not-allowed"
                  : "pointer"

            }}
          >

            {loading

              ? "CREATING ORDER..."

              : `CONTINUE TO PAYMENT — R${paymentAmount}`

            }

          </button>


          <p style={secureText}>

            🔒 Your order will be saved as
            <strong>
              {" "}Pending Payment
            </strong>
            {" "}before you continue to PayFast.

          </p>


        </form>

      </div>

    </div>

  )

}


// ==================================================
// LOADING PAGE
// ==================================================

const loadingPage = {

  minHeight: "100vh",

  background: "#000",

  color: "white",

  display: "flex",

  justifyContent: "center",

  alignItems: "center",

  textAlign: "center"

}


// ==================================================
// CONTAINER
// ==================================================

const container = {

  minHeight: "100vh",

  background:
    "linear-gradient(180deg, #000000, #090909, #111111)",

  display: "flex",

  justifyContent: "center",

  alignItems: "center",

  padding:
    "100px 20px 50px",

  boxSizing: "border-box"

}


// ==================================================
// CARD
// ==================================================

const card = {

  width: "100%",

  maxWidth: "560px",

  background:
    "linear-gradient(145deg, #151515, #0b0b0b)",

  padding: "40px",

  borderRadius: "25px",

  color: "white",

  border:
    "2px solid red",

  boxShadow:
    "0 0 35px rgba(255,0,0,.35)",

  boxSizing: "border-box"

}


// ==================================================
// HEADER
// ==================================================

const eventLabel = {

  color: "red",

  textAlign: "center",

  fontWeight: "bold",

  letterSpacing: "4px",

  fontSize: "13px"

}


const title = {

  color: "white",

  textAlign: "center",

  fontSize:
    "clamp(28px, 6vw, 42px)",

  margin:
    "10px 0"

}


const subtitle = {

  color: "#aaa",

  textAlign: "center",

  marginBottom: "30px"

}


// ==================================================
// TICKET SUMMARY
// ==================================================

const ticketSummary = {

  background: "#0a0a0a",

  border:
    "1px solid #292929",

  borderRadius: "18px",

  padding: "25px",

  textAlign: "center",

  marginBottom: "30px"

}


const ticketBadge = {

  display: "inline-block",

  background: "red",

  color: "white",

  padding:
    "7px 15px",

  borderRadius: "20px",

  fontSize: "11px",

  fontWeight: "bold",

  letterSpacing: "1px"

}


const ticketTitle = {

  color: "white",

  margin:
    "15px 0 8px"

}


const eventDate = {

  color: "#aaa",

  marginBottom: "20px"

}


const priceBox = {

  display: "flex",

  justifyContent: "space-between",

  alignItems: "center",

  background: "#151515",

  padding: "15px",

  borderRadius: "10px"

}


const depositBox = {

  display: "flex",

  justifyContent: "space-between",

  alignItems: "center",

  background: "#211500",

  border:
    "1px solid #664400",

  padding: "15px",

  borderRadius: "10px",

  color: "#ffb000"

}


// ==================================================
// LABEL
// ==================================================

const label = {

  display: "block",

  color: "#aaa",

  fontSize: "12px",

  fontWeight: "bold",

  marginBottom: "7px",

  letterSpacing: "1px"

}


// ==================================================
// INPUT
// ==================================================

const inputStyle = {

  width: "100%",

  padding: "15px",

  marginBottom: "18px",

  borderRadius: "10px",

  border:
    "1px solid #333",

  background: "#1a1a1a",

  color: "white",

  fontSize: "16px",

  boxSizing: "border-box",

  outline: "none"

}


// ==================================================
// SUMMARY
// ==================================================

const summary = {

  background: "#1a1a1a",

  padding: "20px",

  borderRadius: "15px",

  margin:
    "5px 0 20px",

  border:
    "1px solid #292929"

}


const summaryTitle = {

  color: "red",

  marginTop: 0,

  marginBottom: "15px"

}


const summaryRow = {

  display: "flex",

  justifyContent: "space-between",

  alignItems: "center",

  gap: "15px",

  padding:
    "12px 0",

  borderBottom:
    "1px solid #292929",

  color: "#bbb"

}


const totalLabel = {

  color: "white",

  fontWeight: "bold",

  fontSize: "18px"

}


const totalPrice = {

  color: "red",

  fontSize: "28px"

}


// ==================================================
// PAYMENT NOTICE
// ==================================================

const paymentNotice = {

  background: "#120000",

  border:
    "1px solid #550000",

  borderRadius: "12px",

  padding: "15px",

  marginBottom: "20px",

  color: "#ddd",

  fontSize: "14px",

  lineHeight: "1.6"

}


// ==================================================
// BUTTON
// ==================================================

const button = {

  width: "100%",

  padding: "18px",

  background: "red",

  color: "white",

  border: "none",

  borderRadius: "12px",

  fontSize: "18px",

  fontWeight: "bold",

  cursor: "pointer"

}


// ==================================================
// SECURE TEXT
// ==================================================

const secureText = {

  color: "#666",

  textAlign: "center",

  fontSize: "12px",

  marginTop: "15px",

  lineHeight: "1.5"

}

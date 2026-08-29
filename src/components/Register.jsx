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
  // PAYMENT OPTION
  // ======================================

  const [paymentOption, setPaymentOption] =
    useState("full")


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


        // ----------------------------------
        // NORMALIZE TICKET
        // ----------------------------------

        const normalizedTicket = {

          ...parsedTicket,

          price:
            Number(parsedTicket.price) || 420,

          deposit:
            Number(parsedTicket.deposit) || 0,

          balance:
            Number(parsedTicket.balance) ||
            Math.max(
              0,
              Number(parsedTicket.price || 420) -
              Number(parsedTicket.deposit || 0)
            )

        }


        setTicket(
          normalizedTicket
        )


        // ----------------------------------
        // 12 SEPTEMBER = FULL ONLY
        // ----------------------------------

        if (
          normalizedTicket.eventDate ===
          "12 September 2026"
        ) {

          setPaymentOption("full")

        }


        // ----------------------------------
        // 07 NOVEMBER = CUSTOMER CHOOSES
        // ----------------------------------

        if (
          normalizedTicket.eventDate ===
          "07 November 2026"
        ) {

          setPaymentOption("full")

        }


        return

      }


      // ==================================
      // DEFAULT THABISEKO TICKET
      // ==================================

      const defaultTicket = {

        id:
          "MGS-THABISEKO-2026",

        name:
          "THABISEKO TRIP",

        price:
          420,

        deposit:
          420,

        balance:
          0,

        type:
          "thabiseko-trip",

        eventName:
          "THABISEKO TRIP",

        eventDate:
          "12 September 2026",

        paymentType:
          "full"

      }


      setTicket(
        defaultTicket
      )

      setPaymentOption("full")


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


      // ==================================
      // FALLBACK
      // ==================================

      const fallbackTicket = {

        id:
          "MGS-THABISEKO-2026",

        name:
          "THABISEKO TRIP",

        price:
          420,

        deposit:
          420,

        balance:
          0,

        type:
          "thabiseko-trip",

        eventName:
          "THABISEKO TRIP",

        eventDate:
          "12 September 2026",

        paymentType:
          "full"

      }


      setTicket(
        fallbackTicket
      )

      setPaymentOption("full")

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
  // LOADING PAGE
  // ======================================

  if (
    authLoading ||
    !ticket
  ) {

    return (

      <div style={loadingPage}>

        <div style={loadingCard}>

          <h1
            style={{
              color: "#e00000",
              marginBottom: "10px"
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
  // DETERMINE EVENT
  // ======================================

  const isThabisekoTrip =
    ticket.eventDate ===
    "12 September 2026"


  const isBelaBelaTrip =
    ticket.eventDate ===
    "07 November 2026"


  // ======================================
  // DEPOSIT PER TICKET
  // ======================================

  let depositPerTicket = 0


  if (isBelaBelaTrip) {

    // November tickets require R400 deposit

    depositPerTicket = 400

  } else {

    // September ticket must be paid in full

    depositPerTicket = price

  }


  // ======================================
  // DEPOSIT TOTAL
  // ======================================

  const depositTotal =
    depositPerTicket * quantity


  // ======================================
  // FULL BALANCE
  // ======================================

  const fullRemainingBalance =
    Math.max(
      0,
      total - depositTotal
    )


  // ======================================
  // PAYMENT TYPE
  // ======================================

  const isDepositPayment =
    isBelaBelaTrip &&
    paymentOption === "deposit"


  // ======================================
  // PAYMENT AMOUNT
  // ======================================

  const paymentAmount =
    isDepositPayment
      ? depositTotal
      : total


  // ======================================
  // BALANCE AFTER PAYMENT
  // ======================================

  const balanceAfterPayment =
    isDepositPayment
      ? fullRemainingBalance
      : 0


  // ======================================
  // PAYMENT OPTION CHANGE
  // ======================================

  function handlePaymentOptionChange(
    option
  ) {

    // ------------------------------------
    // SEPTEMBER CAN ONLY PAY FULL
    // ------------------------------------

    if (isThabisekoTrip) {

      setPaymentOption("full")

      return

    }


    // ------------------------------------
    // NOVEMBER
    // ------------------------------------

    if (isBelaBelaTrip) {

      if (
        option === "full" ||
        option === "deposit"
      ) {

        setPaymentOption(option)

      }

    }

  }


  // ======================================
  // FORM CHANGE
  // ======================================

  function handleChange(e) {

    const {
      name,
      value
    } = e.target


    if (name === "quantity") {

      const numericValue =
        Number(value)


      if (
        !Number.isFinite(numericValue)
      ) {

        setFormData(prev => ({

          ...prev,

          quantity: 1

        }))

        return

      }


      setFormData(prev => ({

        ...prev,

        quantity:
          Math.min(
            20,
            Math.max(
              1,
              Math.floor(
                numericValue
              )
            )
          )

      }))


      return

    }


    setFormData(prev => ({

      ...prev,

      [name]:
        value

    }))

  }


  // ======================================
  // CREATE ORDER
  // ======================================

  async function handleSubmit(e) {

    e.preventDefault()


    // ====================================
    // CHECK LOGIN
    // ====================================

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


    // ====================================
    // VALIDATION
    // ====================================

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
      quantity < 1 ||
      quantity > 20
    ) {

      alert(
        "Ticket quantity must be between 1 and 20."
      )

      return

    }


    // ====================================
    // SEPTEMBER SECURITY CHECK
    // ====================================

    if (
      isThabisekoTrip &&
      paymentOption !== "full"
    ) {

      alert(
        "The 12 September 2026 ticket must be paid in full."
      )

      setPaymentOption("full")

      return

    }


    // ====================================
    // NOVEMBER SECURITY CHECK
    // ====================================

    if (
      isBelaBelaTrip &&
      paymentOption !== "full" &&
      paymentOption !== "deposit"
    ) {

      alert(
        "Please choose full payment or the R400 deposit."
      )

      return

    }


    setLoading(true)


    try {

      // ====================================
      // UNIQUE LOCAL ORDER ID
      // ====================================

      const localOrderId =
        `MGS-${Date.now()}-${Math.random()
          .toString(36)
          .substring(2, 8)
          .toUpperCase()}`


      // ====================================
      // PAYMENT LABEL
      // ====================================

      const paymentLabel =
        isDepositPayment
          ? "R400 DEPOSIT"
          : "FULL PAYMENT"


      // ====================================
      // ORDER OBJECT
      // ====================================

      const order = {

        // --------------------------------
        // IDENTIFICATION
        // --------------------------------

        orderId:
          localOrderId,

        userId:
          currentUser.uid,


        // --------------------------------
        // CUSTOMER
        // --------------------------------

        fullName:
          formData.fullName.trim(),

        email:
          formData.email.trim(),

        phone:
          formData.phone.trim(),

        delivery:
          formData.delivery,


        // --------------------------------
        // TICKET
        // --------------------------------

        ticketId:
          ticket.id,

        ticketType:
          ticket.type,

        ticketName:
          ticket.name,

        packageName:
          ticket.name,

        eventName:
          ticket.eventName ||
          "MGS EVENT",

        eventDate:
          ticket.eventDate,


        // --------------------------------
        // QUANTITY
        // --------------------------------

        quantity:
          quantity,


        // --------------------------------
        // PRICING
        // --------------------------------

        price:
          price,

        total:
          total,


        // --------------------------------
        // DEPOSIT
        // --------------------------------

        depositPerTicket:
          depositPerTicket,

        depositTotal:
          depositTotal,


        // --------------------------------
        // ORIGINAL BALANCE
        // --------------------------------

        originalBalance:
          fullRemainingBalance,


        // --------------------------------
        // BALANCE STILL OWED
        // --------------------------------

        remainingBalance:
          balanceAfterPayment,


        // --------------------------------
        // PAYMENT
        // --------------------------------

        paymentType:
          isDepositPayment
            ? "deposit"
            : "full",

        paymentLabel:
          paymentLabel,

        paymentAmount:
          paymentAmount,


        // --------------------------------
        // PAYMENT STATUS
        // --------------------------------

        paymentStatus:
          "unpaid",

        paid:
          false,

        status:
          "Pending Payment",


        // --------------------------------
        // TICKET CREATION
        // --------------------------------

        ticketCreated:
          false,

        ticketCreatedAt:
          null,


        // --------------------------------
        // PAYFAST
        // --------------------------------

        payfastPaymentId:
          null,

        paymentVerified:
          false,


        // --------------------------------
        // REMINDER
        // --------------------------------

        reminderSent:
          false,

        balanceReminderSent:
          false,


        // --------------------------------
        // DATE
        // --------------------------------

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
      // LOCAL STORAGE
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
      // PAYMENT AMOUNT
      // ====================================

      localStorage.setItem(

        "mgsPaymentAmount",

        String(
          paymentAmount
        )

      )


      // ====================================
      // PAYMENT INFO
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
            isDepositPayment
              ? depositTotal
              : 0,

          balance:
            balanceAfterPayment,

          originalBalance:
            fullRemainingBalance,

          paymentType:
            isDepositPayment
              ? "deposit"
              : "full",

          eventDate:
            ticket.eventDate,

          ticketName:
            ticket.name,

          ticketType:
            ticket.type,

          quantity:
            quantity

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

        (
          error?.message ||
          "Unknown error occurred."
        )

      )

    } finally {

      setLoading(false)

    }

  }


  // ======================================
  // DISPLAY VALUES
  // ======================================

  const money = (amount) => {

    return `R${Number(amount).toLocaleString(
      "en-ZA",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }
    )}`

  }


  // ======================================
  // PAGE
  // ======================================

  return (

    <div style={page}>

      <div style={container}>

        {/* ==================================
            HEADER
        ================================== */}

        <div style={header}>

          <h1 style={title}>
            MGS EVENTS
          </h1>

          <p style={subtitle}>
            Ticket Registration
          </p>

        </div>


        {/* ==================================
            TICKET INFORMATION
        ================================== */}

        <div style={ticketCard}>

          <div>

            <p style={smallLabel}>
              SELECTED EVENT
            </p>

            <h2 style={ticketTitle}>
              {ticket.name}
            </h2>

            <p style={eventDate}>
              {ticket.eventDate}
            </p>

          </div>


          <div style={priceBox}>

            <span style={smallLabel}>
              PRICE
            </span>

            <strong style={mainPrice}>
              {money(price)}
            </strong>

            {isBelaBelaTrip && (

              <span style={depositText}>
                R400 deposit available
              </span>

            )}

          </div>

        </div>


        {/* ==================================
            REGISTRATION FORM
        ================================== */}

        <form
          onSubmit={handleSubmit}
          style={form}
        >

          {/* FULL NAME */}

          <label style={label}>
            Full Name
          </label>

          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            style={input}
            disabled={loading}
            autoComplete="name"
          />


          {/* EMAIL */}

          <label style={label}>
            Email Address
          </label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email address"
            style={input}
            disabled={loading}
            autoComplete="email"
          />


          {/* PHONE */}

          <label style={label}>
            Phone Number
          </label>

          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            style={input}
            disabled={loading}
            autoComplete="tel"
          />


          {/* QUANTITY */}

          <label style={label}>
            Number of Tickets
          </label>

          <input
            type="number"
            name="quantity"
            min="1"
            max="20"
            step="1"
            value={formData.quantity}
            onChange={handleChange}
            style={input}
            disabled={loading}
          />


          {/* DELIVERY */}

          <label style={label}>
            Ticket Delivery
          </label>

          <select
            name="delivery"
            value={formData.delivery}
            onChange={handleChange}
            style={input}
            disabled={loading}
          >

            <option value="email">
              Email
            </option>

            <option value="whatsapp">
              WhatsApp
            </option>

          </select>


          {/* ==================================
              PAYMENT OPTION
          ================================== */}

          <div style={paymentSection}>

            <h3 style={sectionTitle}>
              Payment Option
            </h3>


            {/* FULL PAYMENT */}

            <label style={paymentOptionCard}>

              <input
                type="radio"
                name="paymentOption"
                checked={
                  paymentOption === "full"
                }
                onChange={() =>
                  handlePaymentOptionChange(
                    "full"
                  )
                }
                disabled={loading}
              />

              <div>

                <strong>
                  Pay in Full
                </strong>

                <p style={optionDescription}>
                  Pay {money(total)} now
                </p>

              </div>

            </label>


            {/* DEPOSIT */}

            {isBelaBelaTrip && (

              <label style={paymentOptionCard}>

                <input
                  type="radio"
                  name="paymentOption"
                  checked={
                    paymentOption ===
                    "deposit"
                  }
                  onChange={() =>
                    handlePaymentOptionChange(
                      "deposit"
                    )
                  }
                  disabled={loading}
                />

                <div>

                  <strong>
                    Pay R400 Deposit
                  </strong>

                  <p style={optionDescription}>
                    Pay {money(depositTotal)} now
                    and owe {money(fullRemainingBalance)}
                  </p>

                </div>

              </label>

            )}


            {/* SEPTEMBER MESSAGE */}

            {isThabisekoTrip && (

              <div style={notice}>

                <strong>
                  Full payment required
                </strong>

                <p>
                  The 12 September 2026 ticket
                  must be paid in full.
                </p>

              </div>

            )}

          </div>


          {/* ==================================
              ORDER SUMMARY
          ================================== */}

          <div style={summary}>

            <h3 style={sectionTitle}>
              Order Summary
            </h3>


            <div style={summaryRow}>

              <span>
                Ticket price
              </span>

              <strong>
                {money(price)}
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
                Full order total
              </span>

              <strong>
                {money(total)}
              </strong>

            </div>


            {isDepositPayment && (

              <>

                <div style={summaryRow}>

                  <span>
                    Deposit today
                  </span>

                  <strong>
                    {money(depositTotal)}
                  </strong>

                </div>


                <div
                  style={{
                    ...summaryRow,
                    ...balanceRow
                  }}
                >

                  <span>
                    Balance remaining
                  </span>

                  <strong>
                    {money(
                      balanceAfterPayment
                    )}
                  </strong>

                </div>

              </>

            )}


            {!isDepositPayment && (

              <div
                style={{
                  ...summaryRow,
                  ...paymentTotalRow
                }}
              >

                <span>
                  Pay today
                </span>

                <strong>
                  {money(paymentAmount)}
                </strong>

              </div>

            )}

          </div>


          {/* ==================================
              SUBMIT
          ================================== */}

          <button
            type="submit"
            disabled={loading}
            style={{
              ...submitButton,

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
              ? "Creating Order..."
              : `Continue to Payment — ${money(paymentAmount)}`
            }

          </button>


          {/* ==================================
              PAYMENT NOTICE
          ================================== */}

          <p style={paymentNotice}>

            Your order will be created as
            <strong> Pending Payment </strong>
            first.

            You will then be taken to the
            PayFast payment page.

          </p>

        </form>

      </div>

    </div>

  )

}


// ==========================================
// STYLES
// ==========================================

const page = {

  minHeight: "100vh",

  background:
    "linear-gradient(135deg, #000000, #151515)",

  color: "#ffffff",

  padding:
    "30px 16px",

  boxSizing:
    "border-box"

}


const container = {

  width:
    "100%",

  maxWidth:
    "650px",

  margin:
    "0 auto"

}


const header = {

  textAlign:
    "center",

  marginBottom:
    "25px"

}


const title = {

  margin:
    "0",

  fontSize:
    "32px",

  fontWeight:
    "800",

  letterSpacing:
    "1px",

  color:
    "#e00000"

}


const subtitle = {

  marginTop:
    "8px",

  color:
    "#bbbbbb",

  fontSize:

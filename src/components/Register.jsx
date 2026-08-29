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
            Number(parsedTicket.deposit) || 0

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

    depositPerTicket = 400

  } else {

    // Thabiseko must be paid in full

    depositPerTicket = price

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
      ? remainingBalance
      : 0


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
  // PAYMENT OPTION CHANGE
  // ======================================

  function handlePaymentOptionChange(
    option
  ) {

    // ------------------------------------
    // THABISEKO CAN ONLY PAY FULL
    // ------------------------------------

    if (isThabisekoTrip) {

      setPaymentOption("full")

      return

    }


    // ------------------------------------
    // BELA BELA
    // ------------------------------------

    if (isBelaBelaTrip) {

      setPaymentOption(option)

    }

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
      quantity < 1
    ) {

      alert(
        "Ticket quantity must be at least 1."
      )

      return

    }


    // ====================================
    // SECURITY CHECK
    // ====================================

    if (
      isThabisekoTrip &&
      paymentOption !== "full"
    ) {

      alert(
        "The Thabiseko Trip ticket must be paid in full."
      )

      setPaymentOption("full")

      return

    }


    // ====================================
    // SECURITY CHECK
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
      // UNIQUE ORDER ID
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
        // BALANCE
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

          paymentType:
            isDepositPayment
              ? "deposit"
              : "full",

          eventDate:
            ticket.eventDate,

          ticketName:
            ticket.name,

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

        error.message

      )

    } finally {

      setLoading(false)

    }

  }


  // ======================================
  // PAGE
 

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
  // PAYMENT SELECTION
  // ======================================

  const [paymentChoice, setPaymentChoice] =
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

      depositAvailable: false,

      description:
        "Full access to the Thabiseko Trip on 12 September 2026.",

      type: "thabiseko-trip",

      eventName: "THABISEKO TRIP",

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
    // BELA BELA TRIP
    // 07 NOVEMBER 2026
    // R900 PER PERSON
    // ====================================

    {
      id: "MGS-BELA-BELA-2026-PER-PERSON",

      name: "BELA BELA TRIP — SINGLE",

      price: 900,

      deposit: 400,

      balance: 500,

      depositAvailable: true,

      description:
        "Full access to the Bela Bela Trip on 07 November 2026.",

      type: "bela-bela-person",

      eventName: "BELA BELA TRIP",

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
    // BELA BELA TRIP
    // 07 NOVEMBER 2026
    // R1300 COUPLE
    // ====================================

    {
      id: "MGS-BELA-BELA-2026-COUPLE",

      name: "BELA BELA TRIP — COUPLE",

      price: 1300,

      deposit: 400,

      balance: 900,

      depositAvailable: true,

      description:
        "Couple ticket for the Bela Bela Trip on 07 November 2026.",

      type: "bela-bela-couple",

      eventName: "BELA BELA TRIP",

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
  // DEFAULT PAYMENT CHOICE
  // ======================================

  useEffect(() => {

    const initialChoices = {}

    tickets.forEach((ticket) => {

      initialChoices[ticket.id] =
        ticket.depositAvailable
          ? "deposit"
          : "full"

    })

    setPaymentChoice(initialChoices)

  }, [])


  // ======================================
  // CHANGE PAYMENT OPTION
  // ======================================

  function changePaymentOption(
    ticketId,
    option
  ) {

    setPaymentChoice(prev => ({

      ...prev,

      [ticketId]: option

    }))

  }


  // ======================================
  // GET PAYMENT AMOUNT
  // ======================================

  function getPaymentAmount(ticket) {

    const choice =
      paymentChoice[ticket.id] ||
      (
        ticket.depositAvailable
          ? "deposit"
          : "full"
      )

    if (
      choice === "deposit" &&
      ticket.depositAvailable
    ) {

      return Number(ticket.deposit)

    }

    return Number(ticket.price)

  }


  // ======================================
  // GET REMAINING BALANCE
  // ======================================

  function getRemainingBalance(ticket) {

    const choice =
      paymentChoice[ticket.id] ||
      (
        ticket.depositAvailable
          ? "deposit"
          : "full"
      )

    if (
      choice === "deposit" &&
      ticket.depositAvailable
    ) {

      return Number(ticket.balance)

    }

    return 0

  }


  // ======================================
  // BUY TICKET
  // ======================================

  function selectTicket(ticket) {

    if (buyingId !== null) {
      return
    }

    setBuyingId(ticket.id)


    // ====================================
    // PAYMENT CHOICE
    // ====================================

    const selectedPayment =
      paymentChoice[ticket.id] ||
      (
        ticket.depositAvailable
          ? "deposit"
          : "full"
      )


    // ====================================
    // PAYMENT AMOUNT
    // ====================================

    const paymentAmount =
      getPaymentAmount(ticket)


    // ====================================
    // REMAINING BALANCE
    // ====================================

    const remainingBalance =
      getRemainingBalance(ticket)


    // ====================================
    // PREPARE SELECTED TICKET
    // ====================================

    const selectedTicket = {

      ...ticket,

      price:
        Number(ticket.price),

      deposit:
        Number(ticket.deposit),

      balance:
        Number(ticket.balance),

      // ----------------------------------
      // CUSTOMER PAYMENT CHOICE
      // ----------------------------------

      paymentChoice:
        selectedPayment,

      // ----------------------------------
      // AMOUNT CUSTOMER MUST PAY NOW
      // ----------------------------------

      paymentAmount:
        Number(paymentAmount),

      // ----------------------------------
      // AMOUNT STILL OWED
      // ----------------------------------

      remainingBalance:
        Number(remainingBalance),

      // ----------------------------------
      // PAYMENT STATUS
      // ----------------------------------

      paymentStatus:
        "unpaid",

      paid:
        false

    }


    // ====================================
    // SAVE SELECTED TICKET
    // ====================================

    try {

      localStorage.setItem(
        "selectedTicket",
        JSON.stringify(
          selectedTicket
        )
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
          Choose your trip and ticket below.
          Bela Bela customers can choose to pay
          the full amount or secure their place with
          a R400 deposit.
        </p>

      </div>


      {/* ==================================
          TICKETS
      ================================== */}

      <div style={ticketContainer}>

        {tickets.map((ticket) => {

          const selectedOption =
            paymentChoice[ticket.id] ||
            (
              ticket.depositAvailable
                ? "deposit"
                : "full"
            )


          const amountToPay =
            getPaymentAmount(ticket)


          const remaining =
            getRemainingBalance(ticket)


          return (

            <div
              key={ticket.id}
              style={card}
            >

              {/* ============================
                  BADGE
              ============================ */}

              <div style={badge}>
                {ticket.ticketCategory ||
                  "MGS EVENT TICKET"}
              </div>


              {/* ============================
                  TICKET NAME
              ============================ */}

              <h2 style={ticketName}>
                {ticket.name}
              </h2>


              {/* ============================
                  DATE
              ============================ */}

              <div style={eventDate}>
                📅 {ticket.eventDate}
              </div>


              {/* ============================
                  TRIP
              ============================ */}

              <div style={tripLabel}>
                {ticket.eventName}
              </div>


              {/* ============================
                  FULL PRICE
              ============================ */}

              <div style={price}>
                R{ticket.price}
              </div>


              <p style={priceLabel}>

                {ticket.ticketCategory === "Couple"

                  ? "FOR 2 PEOPLE"

                  : ticket.ticketCategory === "Per Person"

                    ? "PER PERSON"

                    : "FULL TICKET PRICE"

                }

              </p>


              {/* ============================
                  PAYMENT OPTIONS
              ============================ */}

              <div style={paymentBox}>

                <h3 style={paymentTitle}>
                  CHOOSE HOW YOU WANT TO PAY
                </h3>


                {/* FULL PAYMENT */}

                <label
                  style={{
                    ...paymentOption,

                    border:
                      selectedOption === "full"
                        ? "2px solid red"
                        : "1px solid #333"
                  }}
                >

                  <input
                    type="radio"
                    name={`payment-${ticket.id}`}
                    value="full"
                    checked={
                      selectedOption === "full"
                    }
                    onChange={() =>
                      changePaymentOption(
                        ticket.id,
                        "full"
                      )
                    }
                    disabled={
                      authLoading ||
                      buyingId !== null
                    }
                  />


                  <span>

                    <strong>
                      💳 Pay Full Amount
                    </strong>

                    <small>
                      Pay R{ticket.price} now
                    </small>

                  </span>

                </label>


                {/* DEPOSIT */}

                {ticket.depositAvailable && (

                  <label
                    style={{
                      ...paymentOption,

                      border:
                        selectedOption === "deposit"
                          ? "2px solid red"
                          : "1px solid #333"
                    }}
                  >

                    <input
                      type="radio"
                      name={`payment-${ticket.id}`}
                      value="deposit"
                      checked={
                        selectedOption === "deposit"
                      }
                      onChange={() =>
                        changePaymentOption(
                          ticket

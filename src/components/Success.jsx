import { useEffect, useState } from "react"
import QRCode from "qrcode"
import { v4 as uuidv4 } from "uuid"

import { db } from "../firebase/config"
import { doc, setDoc } from "firebase/firestore"

export default function Success() {

  const [ticket, setTicket] = useState(null)
  const [loading, setLoading] = useState(true)

  const ticketNames = {
    full: "FULL EVENT",
    vibe: "VIBE ONLY",
    vibeDrinks: "VIBE + DRINKS",
    vibeFood: "VIBE + FOOD"
  }

  useEffect(() => {

    async function createTicket() {

      try {

        const savedTicket =
          sessionStorage.getItem("mgsTicket")

        if (savedTicket) {

          setTicket(JSON.parse(savedTicket))
          setLoading(false)
          return

        }

        const customer = JSON.parse(
          localStorage.getItem("mgsCustomer")
        )

        if (!customer) {

          setLoading(false)
          return

        }

        const ticketId = uuidv4()

        const qrPayload = JSON.stringify({
          id: ticketId
        })

        const qrCode =
          await QRCode.toDataURL(qrPayload)

        const newTicket = {

          id: ticketId,

          fullName:
            customer.fullName || "",

          email:
            customer.email || "",

          phone:
            customer.phone || "",

          ticketType:
            customer.ticketType || "vibe",

          packageName:
            ticketNames[
              customer.ticketType
            ],

          quantity:
            Number(customer.quantity || 1),

          total:
            Number(customer.total || 0),

          qrCode,

          used: false,

          status: "VALID",

          createdAt:
            new Date().toISOString()

        }

        await setDoc(
          doc(db, "tickets", ticketId),
          newTicket
        )

        sessionStorage.setItem(
          "mgsTicket",
          JSON.stringify(newTicket)
        )

        setTicket(newTicket)

      }

      catch (error) {

        console.log(
          "Ticket Creation Error:",
          error
        )

      }

      setLoading(false)

    }

    createTicket()

  }, [])

  if (loading) {

    return (

      <div
        style={{
          minHeight: "100vh",
          background: "#000",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <h2>Generating Ticket...</h2>
      </div>

    )

  }

  if (!ticket) {

    return (

      <div
        style={{
          minHeight: "100vh",
          background: "#000",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        Ticket Not Found
      </div>

    )

  }

  return (

    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(to bottom,#000,#111)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px"
      }}
    >

      <div
        style={{
          width: "430px",
          background: "#111",
          padding: "30px",
          borderRadius: "25px",
          color: "white",
          textAlign: "center",
          boxShadow:
            "0 0 25px rgba(255,0,0,.5)"
        }}
      >

        <h1 style={{ color: "red" }}>
          MGS EVENT
        </h1>

        <p style={{ color: "#aaa" }}>
          OFFICIAL ENTRY TICKET
        </p>

        <div
          style={{
            background: "#1a1a1a",
            padding: "20px",
            borderRadius: "15px",
            textAlign: "left",
            marginTop: "20px"
          }}
        >

          <p>
            <b>Name:</b> {ticket.fullName}
          </p>

          <p>
            <b>Email:</b> {ticket.email}
          </p>

          <p>
            <b>Phone:</b> {ticket.phone}
          </p>

          <p>
            <b>Package:</b> {ticket.packageName}
          </p>

          <p>
            <b>Quantity:</b> {ticket.quantity}
          </p>

          <p>
            <b>Total:</b> R{ticket.total}
          </p>

          <p>
            <b>Status:</b>
            <span
              style={{
                color: "#00ff66",
                marginLeft: "5px"
              }}
            >
              VALID
            </span>
          </p>

        </div>

        <div
          style={{
            background: "white",
            padding: "15px",
            borderRadius: "15px",
            marginTop: "20px"
          }}
        >

          <img
            src={ticket.qrCode}
            alt="QR Code"
            width="250"
          />

        </div>

        <h3
          style={{
            color: "red",
            marginTop: "20px"
          }}
        >
          Ticket ID
        </h3>

        <p
          style={{
            color: "#ccc",
            fontSize: "12px",
            wordBreak: "break-all"
          }}
        >
          {ticket.id}
        </p>

        <button
          onClick={() => window.print()}
          style={{
            width: "100%",
            padding: "15px",
            background: "red",
            color: "white",
            border: "none",
            borderRadius: "12px",
            fontWeight: "bold",
            cursor: "pointer",
            marginTop: "20px"
          }}
        >
          DOWNLOAD / PRINT TICKET
        </button>

      </div>

    </div>

  )

}

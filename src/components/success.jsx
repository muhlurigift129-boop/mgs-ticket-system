import { useEffect, useState } from "react"
import QRCode from "qrcode"
import { v4 as uuidv4 } from "uuid"

import { db } from "../firebase/config"

import {
  doc,
  setDoc
} from "firebase/firestore"

export default function Success() {

  const [ticket, setTicket] = useState(null)
  const [qr, setQr] = useState("")

  useEffect(() => {

    async function generateTicket() {

      try {

        const customer =
          JSON.parse(
            localStorage.getItem("mgsCustomer")
          )

        if (!customer) return

        const ticketId = uuidv4()

        const newTicket = {

          id: ticketId,

          name:
            customer.fullName || "Guest",

          email:
            customer.email || "",

          phone:
            customer.phone || "",

          type:
            customer.ticketType || "vibe",

          quantity:
            Number(customer.quantity) || 1,

          total:
            Number(customer.total) || 0,

          used: false,

          status: "VALID",

          createdAt:
            new Date().toISOString()

        }

        // SAVE TO FIREBASE
        await setDoc(
          doc(db, "tickets", ticketId),
          newTicket
        )

        // GENERATE QR
        const qrCode =
          await QRCode.toDataURL(ticketId)

        setQr(qrCode)

        setTicket(newTicket)

      } catch (error) {

        console.log(error)

      }

    }

    generateTicket()

  }, [])

  // LOADING SCREEN
  if (!ticket) {

    return (

      <div style={{
        minHeight: "100vh",
        background: "#000",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        fontFamily: "Arial"
      }}>

        <h1>
          Generating Ticket...
        </h1>

      </div>

    )

  }

  return (

    <div style={{
      minHeight: "100vh",
      background:
        "linear-gradient(to bottom, #000, #111)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px",
      fontFamily: "Arial"
    }}>

      <div style={{
        width: "380px",
        background: "#111",
        borderRadius: "25px",
        padding: "30px",
        boxShadow: "0 0 25px rgba(255,0,0,0.5)",
        textAlign: "center",
        color: "white"
      }}>

        <h1 style={{
          color: "red",
          marginBottom: "5px"
        }}>
          MGS EVENT
        </h1>

        <h2 style={{
          marginTop: "0",
          color: "#ccc",
          fontSize: "18px"
        }}>
          EVENT TICKET
        </h2>

        <p style={{
          color: "#999",
          marginBottom: "25px"
        }}>
          JULY 31 — AUGUST 01
        </p>

        <div style={{
          background: "#1a1a1a",
          borderRadius: "15px",
          padding: "20px",
          marginBottom: "25px",
          textAlign: "left"
        }}>

          <p>
            <strong>Name:</strong>
            {" "}
            {ticket.name}
          </p>

          <p>
            <strong>Email:</strong>
            {" "}
            {ticket.email}
          </p>

          <p>
            <strong>Phone:</strong>
            {" "}
            {ticket.phone}
          </p>

          <p>
            <strong>Ticket:</strong>
            {" "}
            {
              ticket.type === "full"
                ? "Full Event"
                : "Vibe Only"
            }
          </p>

          <p>
            <strong>Quantity:</strong>
            {" "}
            {ticket.quantity}
          </p>

          <p>
            <strong>Total:</strong>
            {" "}
            R{ticket.total}
          </p>

        </div>

        <div style={{
          background: "white",
          padding: "15px",
          borderRadius: "15px",
          display: "inline-block"
        }}>

          <img
            src={qr}
            alt="QR CODE"
            width="220"
          />

        </div>

        <h3 style={{
          marginTop: "25px",
          color: "red"
        }}>
          Ticket ID
        </h3>

        <p style={{
          fontSize: "13px",
          color: "#ccc",
          wordBreak: "break-all"
        }}>
          {ticket.id}
        </p>

        <div style={{
          marginTop: "25px",
          background: "rgba(255,0,0,0.15)",
          padding: "12px",
          borderRadius: "10px",
          fontSize: "14px",
          color: "#ffb3b3"
        }}>

          Present this QR code at the gate for validation.

        </div>

      </div>

    </div>

  )

}
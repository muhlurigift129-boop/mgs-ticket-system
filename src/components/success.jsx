import { useEffect, useState } from "react"
import QRCode from "qrcode"
import { v4 as uuidv4 } from "uuid"

import { db } from "../firebase/config"

import {
  doc,
  setDoc
}
from "firebase/firestore"

export default function Success() {

  const [ticket, setTicket] = useState(null)
  const [qr, setQr] = useState("")

  useEffect(() => {

    async function generateTicket() {

      const customer =
        JSON.parse(localStorage.getItem("mgsCustomer"))

      if (!customer) return

      const ticketId = uuidv4()

      const newTicket = {

        id: ticketId,

        name: customer.fullName,

        email: customer.email,

        phone: customer.phone,

        type: customer.ticketType,

        quantity: customer.quantity,

        total: customer.total,

        used: false,

        status: "VALID",

        createdAt: new Date().toISOString()

      }

      // SAVE TO FIREBASE
      await setDoc(
        doc(db, "tickets", ticketId),
        newTicket
      )

      setTicket(newTicket)

      // GENERATE QR
      const qrImage =
        await QRCode.toDataURL(
          JSON.stringify(newTicket)
        )

      setQr(qrImage)

    }

    generateTicket()

  }, [])

  if (!ticket) {

    return (

      <div style={{
        minHeight: "100vh",
        background: "black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white"
      }}>

        <h2>
          Generating Ticket...
        </h2>

      </div>

    )

  }

  return (

    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(to bottom, #000, #111)",
      color: "white",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px"
    }}>

      <div style={{
        background: "#111",
        padding: "35px",
        borderRadius: "25px",
        textAlign: "center",
        width: "380px",
        boxShadow: "0 0 30px rgba(255,0,0,0.6)"
      }}>

        <h1 style={{
          color: "red",
          marginBottom: "10px",
          letterSpacing: "3px"
        }}>
          MGS EVENT TICKET
        </h1>

        <p style={{
          color: "#aaa",
          marginBottom: "25px"
        }}>
          JULY 31 - AUGUST 01
        </p>

        <div style={{
          background: "#1a1a1a",
          padding: "20px",
          borderRadius: "15px",
          marginBottom: "25px"
        }}>

          <p>
            <strong>Name:</strong>
            {" "}
            {ticket.name}
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
            alt="QR Code"
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
          fontSize: "14px",
          wordBreak: "break-all",
          color: "#ccc"
        }}>
          {ticket.id}
        </p>

        <div style={{
          marginTop: "25px",
          background: "rgba(255,0,0,0.15)",
          padding: "12px",
          borderRadius: "10px",
          color: "#ffb3b3",
          fontSize: "14px"
        }}>

          Present this QR code at the entrance for scanning.

        </div>

      </div>

    </div>

  )

}
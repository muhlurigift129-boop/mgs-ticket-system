import { useEffect, useState } from "react"
import QRCode from "qrcode"
import { v4 as uuidv4 } from "uuid"

import { db } from "../firebase/config"
import { doc, setDoc } from "firebase/firestore"

export default function Success() {

  const [ticket, setTicket] = useState(null)
  const [qr, setQr] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    async function generateTicket() {

      try {

        // PREVENT DOUBLE CREATION (IMPORTANT FOR PAYFAST)
        const existing =
          sessionStorage.getItem("mgs_ticket_created")

        if (existing) return

        const raw =
          localStorage.getItem("mgsCustomer")

        if (!raw) {
          setLoading(false)
          return
        }

        const customer = JSON.parse(raw)

        const ticketId = uuidv4()

        const newTicket = {

          id: ticketId,

          name: customer.fullName || "Guest",
          email: customer.email || "",
          phone: customer.phone || "",

          type: customer.ticketType || "vibe",
          quantity: Number(customer.quantity) || 1,
          total: Number(customer.total) || 0,

          used: false,
          status: "VALID",

          createdAt: new Date().toISOString()

        }

        // SAVE TO FIREBASE (ONLY ONCE)
        await setDoc(
          doc(db, "tickets", ticketId),
          newTicket
        )

        // GENERATE QR
        const qrCode =
          await QRCode.toDataURL(ticketId)

        setTicket(newTicket)
        setQr(qrCode)

        // MARK AS CREATED
        sessionStorage.setItem(
          "mgs_ticket_created",
          "true"
        )

      } catch (error) {
        console.log("Ticket Error:", error)
      }

      setLoading(false)

    }

    generateTicket()

  }, [])

  // LOADING SCREEN
  if (loading || !ticket) {

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

        <h2>Generating Secure Ticket...</h2>

      </div>

    )

  }

  return (

    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(to bottom, #000, #111)",
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

        <h1 style={{ color: "red" }}>
          MGS EVENT
        </h1>

        <p style={{ color: "#aaa" }}>
          OFFICIAL ENTRY TICKET
        </p>

        <div style={{
          background: "#1a1a1a",
          padding: "15px",
          borderRadius: "15px",
          textAlign: "left",
          marginBottom: "20px"
        }}>

          <p><b>Name:</b> {ticket.name}</p>
          <p><b>Email:</b> {ticket.email}</p>
          <p><b>Phone:</b> {ticket.phone}</p>

          <p>
            <b>Ticket:</b>{" "}
            {ticket.type === "full"
              ? "Full Event (R300)"
              : "Vibe Only (R100)"}
          </p>

          <p><b>Qty:</b> {ticket.quantity}</p>
          <p><b>Total:</b> R{ticket.total}</p>

        </div>

        <div style={{
          background: "white",
          padding: "12px",
          borderRadius: "12px"
        }}>

          {qr && (
            <img
              src={qr}
              width="220"
              alt="QR Code"
            />
          )}

        </div>

        <h3 style={{ color: "red", marginTop: "20px" }}>
          Ticket ID
        </h3>

        <p style={{
          fontSize: "12px",
          wordBreak: "break-all",
          color: "#ccc"
        }}>
          {ticket.id}
        </p>

        <div style={{
          marginTop: "20px",
          background: "rgba(255,0,0,0.15)",
          padding: "10px",
          borderRadius: "10px",
          fontSize: "13px",
          color: "#ffb3b3"
        }}>
          Scan this QR at the gate. Do not share your ticket.
        </div>

      </div>

    </div>

  )

}
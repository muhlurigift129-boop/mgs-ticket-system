import { useEffect, useState } from "react"
import QRCode from "qrcode"
import { v4 as uuidv4 } from "uuid"

import { db } from "../firebase/config"
import { doc, setDoc } from "firebase/firestore"

export default function Success() {

  const [ticket, setTicket] = useState(null)
  const [qr, setQr] = useState("")
  const [loading, setLoading] = useState(true)

  const ticketNames = {
    full: "FULL EVENT",
    vibe: "VIBE ONLY",
    vibeDrinks: "VIBE + DRINKS",
    vibeFood: "VIBE + FOOD"
  }

  const ticketPrices = {
    full: "R300",
    vibe: "R100",
    vibeDrinks: "R200",
    vibeFood: "R200"
  }

  useEffect(() => {

    async function generateTicket() {

      try {

        const existing =
          sessionStorage.getItem(
            "mgs_ticket_created"
          )

        if (existing) {
          setLoading(false)
          return
        }

        const raw =
          localStorage.getItem(
            "mgsCustomer"
          )

        if (!raw) {
          setLoading(false)
          return
        }

        const customer =
          JSON.parse(raw)

        const ticketId =
          uuidv4()

        const packageName =
          ticketNames[
            customer.ticketType
          ] || "VIBE ONLY"

        const newTicket = {

          id: ticketId,

          name:
            customer.fullName ||
            "Guest",

          email:
            customer.email || "",

          phone:
            customer.phone || "",

          type:
            customer.ticketType ||
            "vibe",

          packageName,

          quantity:
            Number(customer.quantity) || 1,

          total:
            Number(customer.total) || 0,

          used: false,

          status: "VALID",

          createdAt:
            new Date().toISOString()

        }

        await setDoc(
          doc(
            db,
            "tickets",
            ticketId
          ),
          newTicket
        )

        const qrCode =
          await QRCode.toDataURL(
            ticketId
          )

        setTicket(newTicket)

        setQr(qrCode)

        sessionStorage.setItem(
          "mgs_ticket_created",
          "true"
        )

      } catch (error) {

        console.log(
          "Ticket Error:",
          error
        )

      }

      setLoading(false)

    }

    generateTicket()

  }, [])

  if (loading || !ticket) {

    return (

      <div
        style={{
          minHeight: "100vh",
          background: "#000",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white"
        }}
      >

        <h2>
          Generating Secure Ticket...
        </h2>

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
          width: "400px",
          background: "#111",
          borderRadius: "25px",
          padding: "30px",
          color: "white",
          textAlign: "center",
          boxShadow:
            "0 0 30px rgba(255,0,0,.5)"
        }}
      >

        <h1
          style={{
            color: "red"
          }}
        >
          MGS EVENT
        </h1>

        <p
          style={{
            color: "#aaa"
          }}
        >
          OFFICIAL ENTRY TICKET
        </p>

        <div
          style={{
            background: "#1a1a1a",
            padding: "20px",
            borderRadius: "15px",
            textAlign: "left",
            marginTop: "20px",
            marginBottom: "20px"
          }}
        >

          <p>
            <b>Name:</b>
            {" "}
            {ticket.name}
          </p>

          <p>
            <b>Email:</b>
            {" "}
            {ticket.email}
          </p>

          <p>
            <b>Phone:</b>
            {" "}
            {ticket.phone}
          </p>

          <p>
            <b>Package:</b>
            {" "}
            {ticket.packageName}
          </p>

          <p>
            <b>Price:</b>
            {" "}
            {
              ticketPrices[
                ticket.type
              ]
            }
          </p>

          <p>
            <b>Quantity:</b>
            {" "}
            {ticket.quantity}
          </p>

          <p>
            <b>Total:</b>
            {" "}
            R{ticket.total}
          </p>

          <p>
            <b>Status:</b>
            {" "}
            <span
              style={{
                color: "#00ff66"
              }}
            >
              VALID
            </span>
          </p>

        </div>

        <div
          style={{
            background: "white",
            padding: "12px",
            borderRadius: "12px"
          }}
        >

          <img
            src={qr}
            alt="QR Code"
            width="220"
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
            fontSize: "12px",
            color: "#ccc",
            wordBreak: "break-all"
          }}
        >
          {ticket.id}
        </p>

        <div
          style={{
            marginTop: "20px",
            background:
              "rgba(255,0,0,.15)",
            padding: "12px",
            borderRadius: "10px",
            color: "#ffb3b3"
          }}
        >
          Scan this QR code at
          the entrance.
          Do not share your ticket.
        </div>

      </div>

    </div>

  )

}
import { useEffect, useState } from "react"
import { Html5QrcodeScanner } from "html5-qrcode"
import axios from "axios"

export default function Scanner() {

  const [status, setStatus] =
    useState("READY TO SCAN")

  const [ticketInfo, setTicketInfo] =
    useState(null)

  useEffect(() => {

    const scanner =
      new Html5QrcodeScanner(

        "reader",

        {
          fps: 10,
          qrbox: 250,
          aspectRatio: 1
        },

        false

      )

    scanner.render(success, error)

    async function success(decodedText) {

      try {

        setStatus("VALIDATING...")

        // SEND TO BACKEND
        const res = await axios.post(

          "https://YOUR-BACKEND.onrender.com/validate-ticket",

          {
            ticketId: decodedText
          }

        )

        // VALID TICKET
        if (res.data.valid) {

          setStatus("VALID TICKET")

          setTicketInfo(res.data.ticket)

        }

        // INVALID
        else {

          setStatus(res.data.message)

          setTicketInfo(null)

        }

        // STOP SCANNER
        scanner.clear()

      }

      catch (err) {

        console.log(err)

        setStatus("SCAN ERROR")

      }

    }

    function error(err) {

      console.log(err)

    }

    return () => {

      scanner.clear().catch(() => {})

    }

  }, [])

  return (

    <div style={{
      background: "linear-gradient(to bottom, #000, #111)",
      minHeight: "100vh",
      color: "white",
      textAlign: "center",
      padding: "20px",
      fontFamily: "Arial"
    }}>

      <h1 style={{
        color: "red",
        letterSpacing: "3px",
        marginBottom: "20px"
      }}>
        MGS QR SCANNER
      </h1>

      <div style={{
        maxWidth: "400px",
        margin: "0 auto",
        background: "#111",
        padding: "20px",
        borderRadius: "20px",
        boxShadow: "0 0 20px rgba(255,0,0,0.5)"
      }}>

        <div
          id="reader"
          style={{
            borderRadius: "15px",
            overflow: "hidden"
          }}
        ></div>

      </div>

      <div style={{
        marginTop: "30px",
        background:
          status === "VALID TICKET"
            ? "rgba(0,255,0,0.15)"
            : "rgba(255,0,0,0.15)",

        border:
          status === "VALID TICKET"
            ? "1px solid lime"
            : "1px solid red",

        padding: "15px",
        borderRadius: "15px",
        maxWidth: "500px",
        margin: "30px auto"
      }}>

        <h2 style={{
          color:
            status === "VALID TICKET"
              ? "lime"
              : "red"
        }}>
          {status}
        </h2>

      </div>

      {

        ticketInfo && (

          <div style={{
            background: "#111",
            maxWidth: "500px",
            margin: "0 auto",
            padding: "25px",
            borderRadius: "20px",
            boxShadow:
              "0 0 20px rgba(255,0,0,0.5)"
          }}>

            <h2 style={{
              color: "red",
              marginBottom: "20px"
            }}>
              CUSTOMER DETAILS
            </h2>

            <p>
              <strong>Name:</strong>
              {" "}
              {ticketInfo.fullName}
            </p>

            <p>
              <strong>Email:</strong>
              {" "}
              {ticketInfo.email}
            </p>

            <p>
              <strong>Ticket Type:</strong>
              {" "}
              {ticketInfo.ticketType}
            </p>

            <p>
              <strong>Quantity:</strong>
              {" "}
              {ticketInfo.quantity}
            </p>

            <p>
              <strong>Status:</strong>
              {" "}
              {ticketInfo.used
                ? "USED"
                : "VALID"}
            </p>

            <p>
              <strong>Ticket ID:</strong>
              {" "}
              {ticketInfo.id}
            </p>

            <button

              onClick={() =>
                window.location.reload()
              }

              style={{
                marginTop: "20px",
                padding: "15px 25px",
                background: "red",
                border: "none",
                borderRadius: "10px",
                color: "white",
                cursor: "pointer",
                fontSize: "16px"
              }}

            >

              SCAN NEXT TICKET

            </button>

          </div>

        )

      }

    </div>

  )

}
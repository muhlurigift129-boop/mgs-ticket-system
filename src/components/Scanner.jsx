import { Html5QrcodeScanner } from "html5-qrcode"
import { useEffect, useState } from "react"

import { db } from "../firebase/config"

import {
  doc,
  getDoc,
  updateDoc
} from "firebase/firestore"

export default function Scanner() {

  const [scanResult, setScanResult] = useState(null)
  const [ticketStatus, setTicketStatus] = useState("")
  const [loading, setLoading] = useState(false)

  const ticketNames = {
    full: "FULL EVENT",
    vibe: "VIBE ONLY",
    vibeDrinks: "VIBE + DRINKS",
    vibeFood: "VIBE + FOOD"
  }

  useEffect(() => {

    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        fps: 5,
        qrbox: 250
      },
      false
    )

    scanner.render(onScanSuccess, onScanError)

    async function onScanSuccess(result) {

      scanner.clear()

      setLoading(true)

       try {

         let ticketId

          try {

            const qrData =
              JSON.parse(result)

            ticketId = qrData.id

          } catch {

             ticketId = result.trim()

          }

          if (!ticketId) {

            setTicketStatus("INVALID")
            setLoading(false)
            return

          }

          const ticketRef =
            doc(db, "tickets", ticketId)

          const ticketSnap =
            await getDoc(ticketRef)

          if (!ticketSnap.exists()) {

            setTicketStatus("INVALID")
            setLoading(false)
            return

           }

           const ticket =
             ticketSnap.data()

           if (ticket.used) {

             setScanResult(ticket)
             setTicketStatus("USED")
             setLoading(false)
             return

            }

            await updateDoc(ticketRef, {

              used: true,

              scannedAt:
                new Date().toISOString(),

              status: "USED"

            })

            setScanResult({

              ...ticket,

              used: true,

              scannedAt:
                new Date().toISOString()

              })

              setTicketStatus("VALID")

               }

               catch (error) {

                 console.log(error)

                 setTicketStatus("INVALID")

               }

               setLoading(false)

              }

    function onScanError(error) {
      console.log(error)
    }

  }, [])

  return (

    <div
      style={{
        minHeight: "100vh",
        background: "#000",
        color: "white",
        padding: "30px"
      }}
    >

      <h1
        style={{
          textAlign: "center",
          color: "red",
          marginBottom: "30px"
        }}
      >
        MGS ADMIN SCANNER
      </h1>

      <div
        id="reader"
        style={{
          maxWidth: "500px",
          margin: "0 auto"
        }}
      />

      {loading && (

        <div
          style={{
            textAlign: "center",
            marginTop: "20px"
          }}
        >
          Checking Ticket...
        </div>

      )}

      {scanResult && (

        <div
          style={{
            maxWidth: "550px",
            margin: "30px auto",
            background: "#111",
            padding: "30px",
            borderRadius: "20px",
            boxShadow: "0 0 20px red"
          }}
        >

          <h2
            style={{
              color:
                ticketStatus === "VALID"
                  ? "lime"
                  : ticketStatus === "USED"
                  ? "orange"
                  : "red"
            }}
          >
            {ticketStatus}
          </h2>

          <p>
            <strong>Name:</strong>{" "}
            {scanResult.name}
          </p>

          <p>
            <strong>Email:</strong>{" "}
            {scanResult.email}
          </p>

          <p>
            <strong>Phone:</strong>{" "}
            {scanResult.phone}
          </p>

          <p>
            <strong>Package:</strong>{" "}
            {
              scanResult.packageName ||
              ticketNames[
                scanResult.type
              ]
            }
          </p>

          <p>
            <strong>Quantity:</strong>{" "}
            {scanResult.quantity}
          </p>

          <p>
            <strong>Total Paid:</strong>{" "}
            R{scanResult.total}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            {
              ticketStatus === "VALID"
                ? "ACCESS GRANTED"
                : ticketStatus === "USED"
                ? "ALREADY USED"
                : "INVALID"
            }
          </p>

          <p>
            <strong>Ticket ID:</strong>
            <br />
            {scanResult.id}
          </p>

          {scanResult.scannedAt && (

            <p>
              <strong>Scanned:</strong>
              <br />
              {new Date(
                scanResult.scannedAt
              ).toLocaleString()}
            </p>

          )}

          <button
            onClick={() =>
              window.location.reload()
            }
            style={{
              width: "100%",
              padding: "15px",
              marginTop: "20px",
              background: "red",
              border: "none",
              borderRadius: "10px",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            SCAN NEXT TICKET
          </button>

        </div>

      )}

      {!scanResult &&
       ticketStatus === "INVALID" && (

        <div
          style={{
            maxWidth: "500px",
            margin: "30px auto",
            background: "#111",
            padding: "30px",
            borderRadius: "20px",
            textAlign: "center",
            boxShadow: "0 0 20px red"
          }}
        >

          <h2 style={{ color: "red" }}>
            INVALID TICKET
          </h2>

          <button
            onClick={() =>
              window.location.reload()
            }
            style={{
              width: "100%",
              padding: "15px",
              marginTop: "20px",
              background: "red",
              border: "none",
              borderRadius: "10px",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            TRY AGAIN
          </button>

        </div>

      )}

    </div>

  )
}

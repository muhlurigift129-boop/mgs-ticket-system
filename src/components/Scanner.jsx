import { Html5QrcodeScanner } from "html5-qrcode"
import { useEffect, useState } from "react"

export default function Scanner() {

  const [scanResult, setScanResult] = useState(null)
  const [ticketStatus, setTicketStatus] = useState("")

  useEffect(() => {

    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        fps: 5,
        qrbox: 250
      },
      false
    )

    scanner.render(success, error)

    function success(result) {

      scanner.clear()

      try {

        const data = JSON.parse(result)

        setScanResult(data)

        // CHECK IF USED
        const usedTickets =
          JSON.parse(localStorage.getItem("usedTickets")) || []

        const alreadyUsed =
          usedTickets.includes(data.id)

        if (alreadyUsed) {

          setTicketStatus("USED")

        } else {

          setTicketStatus("VALID")

          usedTickets.push(data.id)

          localStorage.setItem(
            "usedTickets",
            JSON.stringify(usedTickets)
          )

        }

      } catch {

        setTicketStatus("INVALID")

      }

    }

    function error(err) {
      console.log(err)
    }

  }, [])

  return (

    <div style={{
      minHeight: "100vh",
      background: "black",
      color: "white",
      padding: "30px"
    }}>

      <h1 style={{
        textAlign: "center",
        color: "red",
        marginBottom: "30px"
      }}>
        MGS ADMIN SCANNER
      </h1>

      <div
        id="reader"

        style={{
          maxWidth: "500px",
          margin: "0 auto"
        }}
      ></div>

      {
        scanResult && (

          <div style={{
            maxWidth: "500px",
            margin: "30px auto",
            background: "#111",
            padding: "30px",
            borderRadius: "20px",
            boxShadow: "0 0 20px red"
          }}>

            <h2 style={{
              color:
                ticketStatus === "VALID"
                  ? "lime"
                  : ticketStatus === "USED"
                  ? "orange"
                  : "red"
            }}>

              {ticketStatus}

            </h2>

            <p>
              Name: {scanResult.name}
            </p>

            <p>
              Email: {scanResult.email}
            </p>

            <p>
              Ticket Type:
              {
                scanResult.type === "full"
                  ? " Full Event"
                  : " Vibe Only"
              }
            </p>

            <p>
              Quantity: {scanResult.qty}
            </p>

            <p>
              Ticket ID: {scanResult.id}
            </p>

            <button
              onClick={() => window.location.reload()}

              style={{
                width: "100%",
                padding: "15px",
                marginTop: "20px",
                background: "red",
                border: "none",
                borderRadius: "10px",
                color: "white",
                cursor: "pointer"
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
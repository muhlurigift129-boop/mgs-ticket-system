import { useEffect, useState } from "react"

import {
  collection,
  getDocs
} from "firebase/firestore"

import { db } from "../firebase/config"

export default function Admin() {

  const [tickets, setTickets] = useState([])

  const [loading, setLoading] = useState(true)

  useEffect(() => {

    async function loadTickets() {

      try {

        const querySnapshot =
          await getDocs(
            collection(db, "tickets")
          )

        const data = []

        querySnapshot.forEach((doc) => {

          data.push(doc.data())

        })

        setTickets(data)

      }

      catch (error) {

        console.log(error)

        alert("Failed To Load Tickets")

      }

      finally {

        setLoading(false)

      }

    }

    loadTickets()

  }, [])

  // ANALYTICS
  const usedTickets =
    tickets.filter(ticket => ticket.used)

  const unusedTickets =
    tickets.filter(ticket => !ticket.used)

  const totalRevenue =
    tickets.reduce((sum, ticket) => {

      return sum + Number(ticket.total || 0)

    }, 0)

  return (

    <div style={{
      background: "linear-gradient(to bottom, #000, #111)",
      color: "white",
      minHeight: "100vh",
      padding: "30px",
      fontFamily: "Arial"
    }}>

      {/* HEADER */}

      <div style={{
        marginBottom: "40px",
        textAlign: "center"
      }}>

        <h1 style={{
          color: "red",
          fontSize: "40px",
          letterSpacing: "3px"
        }}>
          MGS ADMIN DASHBOARD
        </h1>

        <p style={{
          color: "#aaa"
        }}>
          LIVE EVENT MANAGEMENT SYSTEM
        </p>

      </div>

      {/* ANALYTICS */}

      <div style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "20px",
        marginBottom: "40px"
      }}>

        <div style={cardStyle}>
          <h2>Total Tickets</h2>

          <h1 style={{
            color: "red"
          }}>
            {tickets.length}
          </h1>
        </div>

        <div style={cardStyle}>
          <h2>Used Tickets</h2>

          <h1 style={{
            color: "orange"
          }}>
            {usedTickets.length}
          </h1>
        </div>

        <div style={cardStyle}>
          <h2>Unused Tickets</h2>

          <h1 style={{
            color: "lime"
          }}>
            {unusedTickets.length}
          </h1>
        </div>

        <div style={cardStyle}>
          <h2>Total Revenue</h2>

          <h1 style={{
            color: "cyan"
          }}>
            R{totalRevenue}
          </h1>
        </div>

      </div>

      {/* LOADING */}

      {

        loading && (

          <div style={{
            textAlign: "center",
            marginTop: "50px"
          }}>

            <h2>
              Loading Tickets...
            </h2>

          </div>

        )

      }

      {/* TICKETS */}

      {

        !loading && tickets.map(ticket => (

          <div
            key={ticket.id}

            style={{
              background: "#111",
              padding: "25px",
              marginBottom: "20px",
              borderRadius: "20px",
              border: "1px solid red",
              boxShadow:
                "0 0 15px rgba(255,0,0,0.3)"
            }}
          >

            <div style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "20px"
            }}>

              {/* LEFT */}

              <div>

                <h2 style={{
                  color: "red",
                  marginBottom: "10px"
                }}>
                  {ticket.fullName}
                </h2>

                <p>
                  <strong>Email:</strong>
                  {" "}
                  {ticket.email}
                </p>

                <p>
                  <strong>Phone:</strong>
                  {" "}
                  {ticket.phone || "N/A"}
                </p>

                <p>
                  <strong>Ticket:</strong>
                  {" "}
                  {ticket.ticketType || "Full"}
                </p>

                <p>
                  <strong>Quantity:</strong>
                  {" "}
                  {ticket.quantity || 1}
                </p>

                <p>
                  <strong>Total:</strong>
                  {" "}
                  R{ticket.total || ticket.amount}
                </p>

              </div>

              {/* RIGHT */}

              <div style={{
                textAlign: "right"
              }}>

                <h3 style={{
                  color:
                    ticket.used
                      ? "orange"
                      : "lime"
                }}>

                  {

                    ticket.used
                      ? "USED"
                      : "UNUSED"

                  }

                </h3>

                <p style={{
                  color: "#aaa",
                  marginTop: "15px",
                  maxWidth: "250px",
                  wordBreak: "break-all"
                }}>

                  {ticket.id}

                </p>

                {

                  ticket.qr && (

                    <img
                      src={ticket.qr}
                      alt="QR"
                      width="120"
                      style={{
                        marginTop: "15px",
                        borderRadius: "10px",
                        background: "white",
                        padding: "5px"
                      }}
                    />

                  )

                }

              </div>

            </div>

          </div>

        ))

      }

    </div>

  )

}

const cardStyle = {

  background: "#111",

  padding: "25px",

  borderRadius: "20px",

  border: "1px solid red",

  textAlign: "center",

  boxShadow:
    "0 0 15px rgba(255,0,0,0.3)"

}
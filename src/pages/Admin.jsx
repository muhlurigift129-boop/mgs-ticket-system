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

        const snapshot =
          await getDocs(
            collection(db, "tickets")
          )

        const ticketData = []

        snapshot.forEach((doc) => {

          ticketData.push(doc.data())

        })

        setTickets(ticketData)

        setLoading(false)

      }

      catch(error){

        console.log(error)

      }

    }

    loadTickets()

  }, [])

  // ANALYTICS
  const totalTickets = tickets.length

  const usedTickets =
    tickets.filter(ticket => ticket.used)

  const unusedTickets =
    tickets.filter(ticket => !ticket.used)

  const totalRevenue =
    tickets.reduce((total, ticket) => {

      return total + Number(ticket.total || 0)

    }, 0)

  return (

    <div style={{
      background:"#000",
      minHeight:"100vh",
      color:"white",
      padding:"30px",
      fontFamily:"Arial"
    }}>

      {/* HEADER */}
      <div style={{
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        marginBottom:"30px",
        borderBottom:"1px solid red",
        paddingBottom:"15px"
      }}>

        <h1 style={{
          color:"red",
          letterSpacing:"3px"
        }}>
          MGS ADMIN DASHBOARD
        </h1>

        <div style={{
          background:"red",
          padding:"10px 20px",
          borderRadius:"10px",
          fontWeight:"bold"
        }}>
          LIVE SYSTEM
        </div>

      </div>

      {/* ANALYTICS */}
      <div style={{
        display:"grid",
        gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",
        gap:"20px",
        marginBottom:"40px"
      }}>

        <div style={cardStyle}>
          <h3>Total Tickets</h3>
          <h1>{totalTickets}</h1>
        </div>

        <div style={cardStyle}>
          <h3>Used Tickets</h3>
          <h1>{usedTickets.length}</h1>
        </div>

        <div style={cardStyle}>
          <h3>Unused Tickets</h3>
          <h1>{unusedTickets.length}</h1>
        </div>

        <div style={cardStyle}>
          <h3>Total Revenue</h3>
          <h1>R{totalRevenue}</h1>
        </div>

      </div>

      {/* LOADING */}
      {

        loading ? (

          <div style={{
            textAlign:"center",
            marginTop:"50px"
          }}>

            <h2>Loading Tickets...</h2>

          </div>

        ) : (

          <>

            {/* TICKETS */}
            <h2 style={{
              color:"red",
              marginBottom:"20px"
            }}>
              CUSTOMER TICKETS
            </h2>

            {

              tickets.length === 0 ? (

                <div style={{
                  background:"#111",
                  padding:"30px",
                  borderRadius:"15px"
                }}>

                  No Tickets Found

                </div>

              ) : (

                tickets.map(ticket => (

                  <div
                    key={ticket.id}

                    style={{
                      background:"#111",
                      padding:"20px",
                      borderRadius:"15px",
                      marginBottom:"20px",
                      border:"1px solid #222",
                      boxShadow:"0 0 10px rgba(255,0,0,0.2)"
                    }}
                  >

                    <div style={{
                      display:"flex",
                      justifyContent:"space-between",
                      flexWrap:"wrap"
                    }}>

                      <div>

                        <h2 style={{
                          color:"red",
                          marginBottom:"10px"
                        }}>
                          {ticket.fullName}
                        </h2>

                        <p>
                          📧 {ticket.email}
                        </p>

                        <p>
                          📱 {ticket.phone}
                        </p>

                        <p>
                          🎟 Ticket:
                          {" "}
                          {ticket.ticketType}
                        </p>

                        <p>
                          🔢 Quantity:
                          {" "}
                          {ticket.quantity}
                        </p>

                        <p>
                          💰 Total:
                          {" "}
                          R{ticket.total}
                        </p>

                      </div>

                      <div style={{
                        textAlign:"right"
                      }}>

                        <div style={{
                          background:
                            ticket.used
                              ? "red"
                              : "green",

                          padding:"10px 15px",

                          borderRadius:"10px",

                          fontWeight:"bold",

                          marginBottom:"10px"
                        }}>

                          {

                            ticket.used
                              ? "USED"
                              : "VALID"

                          }

                        </div>

                        <p style={{
                          fontSize:"12px",
                          color:"#aaa",
                          maxWidth:"250px",
                          wordBreak:"break-all"
                        }}>
                          {ticket.id}
                        </p>

                      </div>

                    </div>

                  </div>

                ))

              )

            }

          </>

        )

      }

    </div>

  )

}

const cardStyle = {

  background:"#111",

  padding:"25px",

  borderRadius:"20px",

  border:"1px solid #222",

  textAlign:"center",

  boxShadow:"0 0 15px rgba(255,0,0,0.2)"

}
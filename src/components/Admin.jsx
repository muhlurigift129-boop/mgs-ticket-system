import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"

import {
  collection,
  getDocs
} from "firebase/firestore"

import * as XLSX from "xlsx"

import { db } from "../firebase/config"

export default function Admin() {

  const isAdmin =
    localStorage.getItem("mgs_admin") === "true"

  if (!isAdmin) {
    return <Navigate to="/admin-login" />
  }

  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")

  async function loadTickets() {

    try {

      setLoading(true)

      const snapshot =
        await getDocs(
          collection(db, "tickets")
        )

      const data = []

      snapshot.forEach((doc) => {

        data.push({
          firestoreId: doc.id,
          ...doc.data()
        })

      })

      setTickets(data)

    } catch (error) {

      console.error(error)
      alert("Failed To Load Tickets")

    } finally {

      setLoading(false)

    }

  }

  useEffect(() => {
    loadTickets()
  }, [])

  function logout() {

    localStorage.removeItem(
      "mgs_admin"
    )

    window.location.href =
      "#/admin-login"

  }

  const filteredTickets =
    tickets.filter(ticket => {

      const name =
        (
          ticket.fullName ||
          ticket.name ||
          ""
        ).toLowerCase()

      return name.includes(
        search.toLowerCase()
      )

    })

  const usedTickets =
    tickets.filter(
      t => t.used
    )

  const unusedTickets =
    tickets.filter(
      t => !t.used
    )

  const totalRevenue =
    tickets.reduce(

      (sum, ticket) =>
        sum + Number(ticket.total || 0),

      0

    )

  function exportExcel() {

    const rows =
      tickets.map(ticket => ({

        Name:
          ticket.fullName ||
          ticket.name,

        Email:
          ticket.email,

        Phone:
          ticket.phone,

        Package:
          ticket.packageName,

        Quantity:
          ticket.quantity,

        Total:
          ticket.total,

        Status:
          ticket.used
            ? "USED"
            : "VALID"

      }))

    const worksheet =
      XLSX.utils.json_to_sheet(rows)

    const workbook =
      XLSX.utils.book_new()

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "MGS Tickets"
    )

    XLSX.writeFile(
      workbook,
      "MGS_Attendees.xlsx"
    )

  }

  return (

    <div
      style={{
        background:
          "linear-gradient(to bottom,#000,#111)",
        minHeight:"100vh",
        color:"white",
        padding:"30px"
      }}
    >

      <div
        style={{
          textAlign:"center",
          marginBottom:"40px"
        }}
      >

        <h1
          style={{
            color:"red",
            fontSize:"42px"
          }}
        >
          MGS ADMIN DASHBOARD
        </h1>

        <button
          onClick={logout}
          style={{
            background:"red",
            color:"white",
            border:"none",
            padding:"12px 20px",
            borderRadius:"10px",
            cursor:"pointer"
          }}
        >
          LOGOUT
        </button>

      </div>

      <div
        style={{
          display:"flex",
          gap:"10px",
          marginBottom:"20px"
        }}
      >

        <button
          onClick={loadTickets}
          style={buttonStyle}
        >
          REFRESH
        </button>

        <button
          onClick={exportExcel}
          style={buttonStyle}
        >
          EXPORT EXCEL
        </button>

      </div>

      <input
        type="text"
        placeholder="Search attendee..."
        value={search}
        onChange={(e)=>
          setSearch(e.target.value)
        }
        style={{
          width:"100%",
          padding:"15px",
          borderRadius:"10px",
          marginBottom:"25px"
        }}
      />

      <div
        style={{
          display:"grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap:"20px",
          marginBottom:"30px"
        }}
      >

        <div style={cardStyle}>
          <h3>Total Tickets</h3>
          <h1>{tickets.length}</h1>
        </div>

        <div style={cardStyle}>
          <h3>Attendance</h3>
          <h1>{usedTickets.length}</h1>
        </div>

        <div style={cardStyle}>
          <h3>Unused</h3>
          <h1>{unusedTickets.length}</h1>
        </div>

        <div style={cardStyle}>
          <h3>Revenue</h3>
          <h1>R{totalRevenue}</h1>
        </div>

      </div>

      {loading ? (

        <h2
          style={{
            textAlign:"center"
          }}
        >
          Loading Tickets...
        </h2>

      ) : (

        filteredTickets.map(ticket => (

          <div
            key={ticket.firestoreId}
            style={{
              background:"#111",
              border:"1px solid red",
              borderRadius:"20px",
              padding:"25px",
              marginBottom:"20px"
            }}
          >

            <h2 style={{color:"red"}}>
              {
                ticket.fullName ||
                ticket.name
              }
            </h2>

            <p>Email: {ticket.email}</p>

            <p>Phone: {ticket.phone}</p>

            <p>
              Package:
              {" "}
              {ticket.packageName}
            </p>

            <p>
              Quantity:
              {" "}
              {ticket.quantity}
            </p>

            <p>
              Total:
              {" "}
              R{ticket.total}
            </p>

            <p>
              Status:
              {" "}
              <span
                style={{
                  color:
                    ticket.used
                    ? "orange"
                    : "lime"
                }}
              >
                {
                  ticket.used
                    ? "USED"
                    : "VALID"
                }
              </span>
            </p>

            <p
              style={{
                fontSize:"12px",
                color:"#999",
                wordBreak:"break-all"
              }}
            >
              {ticket.id}
            </p>

            {ticket.qr && (

              <div
                style={{
                  marginTop:"20px",
                  textAlign:"center"
                }}
              >

                <img
                  src={ticket.qr}
                  alt="QR Code"
                  width="200"
                />

                <br />

                <a
                  href={ticket.qr}
                  download={`ticket-${ticket.id}.png`}
                  style={{
                    color:"red",
                    display:"inline-block",
                    marginTop:"10px"
                  }}
                >
                  Download QR Code
                </a>

              </div>

            )}

          </div>

        ))

      )}

    </div>

  )

}

const cardStyle = {
  background:"#111",
  border:"1px solid red",
  borderRadius:"20px",
  padding:"25px",
  textAlign:"center"
}

const buttonStyle = {
  background:"red",
  color:"white",
  border:"none",
  padding:"15px 25px",
  borderRadius:"10px",
  cursor:"pointer",
  fontWeight:"bold"
}

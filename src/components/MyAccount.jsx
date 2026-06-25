import { useEffect, useState } from "react"

import {
  auth,
  db
} from "../firebase/config"

import {
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  where
} from "firebase/firestore"

import {
  signOut
} from "firebase/auth"

import { useNavigate } from "react-router-dom"

export default function MyAccount() {

  const navigate = useNavigate()

  const [userData, setUserData] =
    useState(null)

  const [tickets, setTickets] =
    useState([])

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {

    async function loadAccount() {

      try {

        if (!auth.currentUser) {

          navigate("/login")
          return

        }

        const userRef = doc(
          db,
          "users",
          auth.currentUser.uid
        )

        const userSnap =
          await getDoc(userRef)

        if (userSnap.exists()) {

          setUserData(
            userSnap.data()
          )

        }

        const q = query(

          collection(
            db,
            "tickets"
          ),

          where(
            "email",
            "==",
            auth.currentUser.email
          )

        )

        const ticketSnap =
          await getDocs(q)

        const ticketData = []

        ticketSnap.forEach(doc => {

          ticketData.push({

            id: doc.id,

            ...doc.data()

          })

        })

        setTickets(ticketData)

      }

      catch(error) {

        console.log(error)

      }

      setLoading(false)

    }

    loadAccount()

  }, [])

  async function logout() {

    await signOut(auth)

    navigate("/login")

  }

  if (loading) {

    return (

      <div
        style={{
          minHeight:"100vh",
          background:"#000",
          color:"white",
          display:"flex",
          justifyContent:"center",
          alignItems:"center"
        }}
      >
        Loading Account...
      </div>

    )

  }

  return (

    <div
      style={{
        minHeight:"100vh",
        background:"#000",
        color:"white",
        padding:"100px 20px"
      }}
    >

      <div
        style={{
          maxWidth:"1200px",
          margin:"auto"
        }}
      >

        <h1
          style={{
            color:"red"
          }}
        >
          MY ACCOUNT
        </h1>

        <div
          style={{
            background:"#111",
            padding:"25px",
            borderRadius:"20px",
            marginTop:"20px"
          }}
        >

          <h2>
            {userData?.fullName}
          </h2>

          <p>
            {userData?.email}
          </p>

          <p>
            {userData?.phone}
          </p>

        </div>

        <div
          style={{
            display:"grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(250px,1fr))",
            gap:"20px",
            marginTop:"25px"
          }}
        >

          <div style={card}>
            <h3>Total Tickets</h3>
            <h1>{tickets.length}</h1>
          </div>

          <div style={card}>
            <h3>Status</h3>
            <h1>ACTIVE</h1>
          </div>

        </div>

        <h2
          style={{
            marginTop:"40px",
            color:"red"
          }}
        >
          MY TICKETS
        </h2>

        {

          tickets.length === 0

          ?

          <p>
            No tickets found.
          </p>

          :

          tickets.map(ticket => (

            <div
              key={ticket.id}
              style={{
                background:"#111",
                padding:"25px",
                borderRadius:"20px",
                marginTop:"20px"
              }}
            >

              <h3>
                {ticket.packageName}
              </h3>

              <p>
                Ticket ID:
                {ticket.id}
              </p>

              <p>
                Quantity:
                {ticket.quantity}
              </p>

              <p>
                Total:
                R{ticket.total}
              </p>

              <p>
                Status:
                {ticket.status}
              </p>

              {

                ticket.qrCode && (

                  <img
                    src={ticket.qrCode}
                    alt="QR"
                    width="220"
                    style={{
                      marginTop:"15px",
                      borderRadius:"10px",
                      background:"white",
                      padding:"10px"
                    }}
                  />

                )

              }

            </div>

          ))

        }

        <button
          onClick={logout}
          style={{
            marginTop:"30px",
            background:"red",
            color:"white",
            border:"none",
            padding:"15px 30px",
            borderRadius:"12px",
            cursor:"pointer",
            fontWeight:"bold"
          }}
        >
          LOGOUT
        </button>

      </div>

    </div>

  )

}

const card = {

  background:"#111",

  padding:"25px",

  borderRadius:"20px",

  textAlign:"center",

  boxShadow:
    "0 0 20px rgba(255,0,0,.3)"

}

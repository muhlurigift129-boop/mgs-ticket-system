import { useEffect, useState } from "react"

import { auth, db }
from "../firebase/config"

import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs
} from "firebase/firestore"

import {
  signOut
} from "firebase/auth"

import { useNavigate }
from "react-router-dom"

export default function MyAccount() {

  const navigate =
    useNavigate()

  const [userData,setUserData] =
    useState(null)

  const [tickets,setTickets] =
    useState([])

  const [loading,setLoading] =
    useState(true)

  useEffect(() => {

    async function loadData() {

      try {

        const user =
          auth.currentUser

        if (!user) {

          navigate("/login")
          return

        }

        const userDoc =
          await getDoc(
            doc(
              db,
              "users",
              user.uid
            )
          )

        if (
          userDoc.exists()
        ) {

          setUserData(
            userDoc.data()
          )

        }

        const ticketQuery =
          query(

            collection(
              db,
              "tickets"
            ),

            where(
              "email",
              "==",
              user.email
            )

          )

        const snapshot =
          await getDocs(
            ticketQuery
          )

        const userTickets = []

        snapshot.forEach(doc => {

          userTickets.push({

            id: doc.id,
            ...doc.data()

          })

        })

        setTickets(
          userTickets
        )

      }

      catch(error) {

        console.log(error)

      }

      setLoading(false)

    }

    loadData()

  }, [navigate])

  async function logout() {

    await signOut(auth)

    navigate("/login")

  }

  if (loading) {

    return (

      <div
        style={{
          background:"#000",
          color:"white",
          minHeight:"100vh",
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
        padding:"30px"
      }}
    >

      <div
        style={{
          maxWidth:"1000px",
          margin:"0 auto"
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
            marginBottom:"30px"
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

          <button
            onClick={logout}
            style={{
              background:"red",
              color:"white",
              border:"none",
              padding:"12px 25px",
              borderRadius:"10px",
              cursor:"pointer"
            }}
          >
            LOGOUT
          </button>

        </div>

        <h2
          style={{
            color:"red"
          }}
        >
          MY TICKETS
        </h2>

        {tickets.length === 0 ? (

          <p>
            No Tickets Found
          </p>

        ) : (

          tickets.map(ticket => (

            <div
              key={ticket.id}
              style={{
                background:"#111",
                padding:"20px",
                borderRadius:"15px",
                marginBottom:"20px"
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
                Status:
                {ticket.used
                  ? "USED"
                  : "VALID"}
              </p>

              <p>
                Total:
                R{ticket.total}
              </p>

              {ticket.qrCode && (

                <img
                  src={ticket.qrCode}
                  alt="QR Code"
                  width="180"
                />

              )}

            </div>

          ))

        )}

      </div>

    </div>

  )

}

import { useEffect, useState } from "react"

import {
  collection,
  query,
  where,
  getDocs,
  orderBy
} from "firebase/firestore"

import {
  db,
  auth
} from "../firebase/config"

export default function Orders() {

  const [orders, setOrders] = useState([])

  const [loading, setLoading] = useState(true)

  const [error, setError] = useState("")


  async function loadOrders() {

    try {

      setLoading(true)

      setError("")

      const user = auth.currentUser

      if (!user) {

        setOrders([])

        return

      }


      const q = query(

        collection(db, "tickets"),

        where(
          "userId",
          "==",
          user.uid
        ),

        where(
          "paymentStatus",
          "==",
          "paid"
        )

      )


      const snapshot = await getDocs(q)


      const orderList = []


      snapshot.forEach((doc) => {

        orderList.push({

          id: doc.id,

          ...doc.data()

        })

      })


      orderList.sort(
        (a, b) =>
          new Date(b.createdAt || 0) -
          new Date(a.createdAt || 0)
      )


      setOrders(orderList)


    } catch (err) {

      console.error(
        "ORDER LOAD ERROR:",
        err
      )

      setError(
        "Unable to load your paid tickets."
      )

    } finally {

      setLoading(false)

    }

  }


  useEffect(() => {

    loadOrders()

  }, [])


  return (

    <div style={page}>

      <h1 style={title}>
        MY TICKETS
      </h1>


      <p style={subtitle}>
        Your successfully paid MGS Event tickets
      </p>


      {loading && (

        <div style={message}>
          Loading your tickets...
        </div>

      )}


      {error && (

        <div style={errorBox}>
          {error}
        </div>

      )}


      {!loading &&
       !error &&
       orders.length === 0 && (

        <div style={message}>

          <h2>
            No Paid Tickets
          </h2>

          <p>
            Your ticket will appear here after
            PayFast confirms your payment.
          </p>

        </div>

      )}


      <div style={ticketsContainer}>

        {orders.map((order) => (

          <div
            key={order.id}
            style={ticketCard}
          >

            <div style={ticketHeader}>

              <div>

                <h2 style={ticketTitle}>
                  MGS EVENT
                </h2>

                <p style={ticketNumber}>
                  TICKET #{order.id.slice(0, 8)}
                </p>

              </div>


              <div style={paidBadge}>
                PAID
              </div>

            </div>


            <div style={line} />


            <div style={details}>

              <p>
                <strong>Name:</strong>{" "}
                {order.fullName}
              </p>


              <p>
                <strong>Email:</strong>{" "}
                {order.email}
              </p>


              <p>
                <strong>Ticket:</strong>{" "}
                {order.ticketName ||
                 order.packageName}
              </p>


              <p>
                <strong>Quantity:</strong>{" "}
                {order.quantity}
              </p>


              <p>
                <strong>Total Paid:</strong>{" "}
                R{order.total}
              </p>


              <p>
                <strong>Payment:</strong>{" "}
                Successfully Paid
              </p>

            </div>


            <div style={ticketFooter}>

              <span>
                MGS EVENTS
              </span>

              <span>
                VALID TICKET
              </span>

            </div>

          </div>

        ))}

      </div>

    </div>

  )

}


const page = {

  minHeight: "100vh",

  background:
    "linear-gradient(180deg,#000,#111)",

  color: "white",

  padding: "100px 20px 50px",

  boxSizing: "border-box"

}


const title = {

  textAlign: "center",

  color: "red",

  fontSize: "45px",

  marginBottom: "5px"

}


const subtitle = {

  textAlign: "center",

  color: "#aaa",

  marginBottom: "40px"

}


const ticketsContainer = {

  maxWidth: "800px",

  margin: "0 auto",

  display: "flex",

  flexDirection: "column",

  gap: "25px"

}


const ticketCard = {

  background:
    "linear-gradient(145deg,#111,#181818)",

  border:
    "2px solid red",

  borderRadius: "20px",

  padding: "25px",

  boxShadow:
    "0 0 25px rgba(255,0,0,.25)"

}


const ticketHeader = {

  display: "flex",

  justifyContent: "space-between",

  alignItems: "center"

}


const ticketTitle = {

  color: "red",

  margin: 0

}


const ticketNumber = {

  color: "#777",

  fontSize: "12px"

}


const paidBadge = {

  background: "#008000",

  color: "white",

  padding: "8px 15px",

  borderRadius: "20px",

  fontWeight: "bold",

  fontSize: "13px"

}


const line = {

  height: "1px",

  background: "#333",

  margin: "20px 0"

}


const details = {

  lineHeight: "1.8",

  color: "#ddd"

}


const ticketFooter = {

  display: "flex",

  justifyContent: "space-between",

  borderTop: "1px dashed #555",

  paddingTop: "15px",

  marginTop: "20px",

  color: "red",

  fontWeight: "bold",

  fontSize: "13px"

}


const message = {

  maxWidth: "600px",

  margin: "40px auto",

  background: "#111",

  border: "1px solid #333",

  borderRadius: "15px",

  padding: "30px",

  textAlign: "center",

  color: "#aaa"

}


const errorBox = {

  maxWidth: "600px",

  margin: "20px auto",

  background: "#400",

  border: "1px solid red",

  borderRadius: "10px",

  padding: "15px",

  textAlign: "center"

}
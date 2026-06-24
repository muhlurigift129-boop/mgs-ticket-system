import { useEffect, useState } from "react"

import {
  collection,
  query,
  where,
  getDocs
} from "firebase/firestore"

import {
  auth,
  db
} from "../firebase/config"

export default function Orders() {

  const [orders,setOrders] =
    useState([])

  useEffect(() => {

    loadOrders()

  }, [])

  async function loadOrders() {

    if (!auth.currentUser)
      return

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

    const snap =
      await getDocs(q)

    const data = []

    snap.forEach(doc => {

      data.push({

        id: doc.id,

        ...doc.data()

      })

    })

    setOrders(data)
  }

  return (

    <div
      style={{
        background:"#000",
        color:"white",
        minHeight:"100vh",
        padding:"100px 20px"
      }}
    >

      <h1
        style={{
          color:"red"
        }}
      >
        MY ORDERS
      </h1>

      {

        orders.map(order => (

          <div
            key={order.id}
            style={{
              background:"#111",
              padding:"20px",
              marginTop:"20px",
              borderRadius:"15px",
              border:"1px solid red"
            }}
          >

            <h3>
              {order.packageName}
            </h3>

            <p>
              Quantity:
              {order.quantity}
            </p>

            <p>
              Total:
              R{order.total}
            </p>

            <p>
              Ticket ID:
              {order.id}
            </p>

          </div>

        ))

      }

    </div>

  )
}

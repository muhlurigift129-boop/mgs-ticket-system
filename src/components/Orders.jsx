import { useEffect, useState } from "react"

import {
  collection,
  getDocs,
  query,
  where
} from "firebase/firestore"

import {
  db,
  auth
} from "../firebase/config"

export default function Orders() {

  const [orders, setOrders] =
    useState([])

  useEffect(() => {

    async function loadOrders() {

      if (!auth.currentUser) return

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

      const snapshot =
        await getDocs(q)

      const data = []

      snapshot.forEach(doc => {

        data.push({

          id: doc.id,

          ...doc.data()

        })

      })

      setOrders(data)

    }

    loadOrders()

  }, [])

  return (

    <div
      style={{
        minHeight:"100vh",
        background:"#000",
        color:"white",
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

        orders.length === 0

        ?

        <p>No orders found.</p>

        :

        orders.map(order => (

          <div
            key={order.id}
            style={{
              background:"#111",
              padding:"20px",
              borderRadius:"15px",
              marginTop:"15px"
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
              Status:
              {order.status}
            </p>

          </div>

        ))

      }

    </div>

  )

}

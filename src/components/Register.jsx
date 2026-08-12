import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { auth, db } from "../firebase/config"

import {
  addDoc,
  collection
} from "firebase/firestore"

export default function Register() {

  const navigate = useNavigate()

  const selectedTicket = JSON.parse(
    localStorage.getItem("selectedTicket") || "null"
  )

  const [formData, setFormData] = useState({
    fullName: "",
    email: auth.currentUser?.email || "",
    phone: "",
    delivery: "email",
    quantity: 1
  })

  const [loading, setLoading] = useState(false)

  const ticket = selectedTicket || {
    name: "MGS EVENT TICKET",
    price: 420,
    type: "full"
  }

  const price = Number(ticket.price) || 420

  const quantity = Math.max(
    1,
    Number(formData.quantity) || 1
  )

  const total = price * quantity


  useEffect(() => {

    if (!auth.currentUser) {
      navigate("/login", { replace: true })
    }

  }, [navigate])


  function handleChange(e) {

    const { name, value } = e.target

    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

  }


  async function handleSubmit(e) {

    e.preventDefault()

    const currentUser = auth.currentUser

    if (!currentUser) {

      alert("Please login first.")

      navigate("/login")

      return

    }

    setLoading(true)

    try {

      // CREATE THE PAYMENT ORDER FIRST
      const order = {

        userId: currentUser.uid,

        fullName: formData.fullName,

        email: formData.email || currentUser.email,

        phone: formData.phone,

        delivery: formData.delivery,

        ticketType: ticket.type,

        ticketName: ticket.name,

        packageName: ticket.name,

        quantity: quantity,

        price: price,

        total: total,

        status: "Pending Payment",

        paymentStatus: "unpaid",

        createdAt: new Date().toISOString()

      }


      // IMPORTANT:
      // SAVE THIS BEFORE GOING TO PAYMENT
      localStorage.setItem(
        "mgsCustomer",
        JSON.stringify(order)
      )


      // TEST THAT IT WAS ACTUALLY SAVED
      const savedOrder = localStorage.getItem(
        "mgsCustomer"
      )

      if (!savedOrder) {

        throw new Error(
          "Order could not be saved in browser storage."
        )

      }


      // SAVE TO FIRESTORE FOR ORDERS PAGE
      const orderRef = await addDoc(
        collection(db, "tickets"),
        order
      )


      // SAVE FIRESTORE ORDER ID
      localStorage.setItem(
        "mgsOrderId",
        orderRef.id
      )


      // UPDATE LOCAL PAYMENT ORDER WITH ORDER ID
      localStorage.setItem(
        "mgsCustomer",
        JSON.stringify({
          ...order,
          orderId: orderRef.id
        })
      )


      console.log(
        "ORDER SAVED:",
        JSON.parse(
          localStorage.getItem("mgsCustomer")
        )
      )


      navigate("/payment")


    } catch (error) {

      console.error(
        "ORDER CREATION ERROR:",
        error
      )

      alert(
        "Could not create order: " +
        error.message
      )

    } finally {

      setLoading(false)

    }

  }


  return (

    <div style={container}>

      <div style={card}>

        <h1 style={title}>
          MGS REGISTRATION
        </h1>

        <p style={subtitle}>
          Complete your ticket order
        </p>


        <div style={summary}>

          <h2 style={{ color: "red" }}>
            MGS EVENT TICKET
          </h2>

          <p>
            Date: 12 September 2026
          </p>

          <p>
            Price: R{price}
          </p>

        </div>


        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            required
            value={formData.fullName}
            onChange={handleChange}
            style={inputStyle}
          />


          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            value={formData.email}
            onChange={handleChange}
            style={inputStyle}
          />


          <input
            type="tel"
            name="phone"
            placeholder="WhatsApp / Phone Number"
            required
            value={formData.phone}
            onChange={handleChange}
            style={inputStyle}
          />


          <input
            type="number"
            name="quantity"
            min="1"
            value={formData.quantity}
            onChange={handleChange}
            style={inputStyle}
          />


          <select
            name="delivery"
            value={formData.delivery}
            onChange={handleChange}
            style={inputStyle}
          >

            <option value="email">
              Email Ticket
            </option>

            <option value="whatsapp">
              WhatsApp Ticket
            </option>

          </select>


          <div style={summary}>

            <h2 style={{ color: "red" }}>
              ORDER SUMMARY
            </h2>

            <p>
              Ticket: {ticket.name}
            </p>

            <p>
              Quantity: {quantity}
            </p>

            <p>
              Price each: R{price}
            </p>

            <h1 style={{
              color: "red",
              textAlign: "center"
            }}>
              TOTAL: R{total}
            </h1>

          </div>


          <button
            type="submit"
            disabled={loading}
            style={button}
          >

            {loading
              ? "CREATING ORDER..."
              : "CONTINUE TO PAYMENT"
            }

          </button>

        </form>

      </div>

    </div>

  )

}


const container = {

  minHeight: "100vh",

  background:
    "linear-gradient(to bottom, #000, #111)",

  display: "flex",

  justifyContent: "center",

  alignItems: "center",

  padding: "100px 20px",

  boxSizing: "border-box"

}


const card = {

  width: "100%",

  maxWidth: "550px",

  background: "#111",

  padding: "40px",

  borderRadius: "25px",

  color: "white",

  boxShadow:
    "0 0 35px rgba(255,0,0,.5)",

  boxSizing: "border-box"

}


const title = {

  color: "red",

  textAlign: "center"

}


const subtitle = {

  color: "#aaa",

  textAlign: "center",

  marginBottom: "25px"

}


const inputStyle = {

  width: "100%",

  padding: "15px",

  marginBottom: "15px",

  borderRadius: "10px",

  border: "1px solid #333",

  background: "#1a1a1a",

  color: "white",

  fontSize: "16px",

  boxSizing: "border-box"

}


const summary = {

  background: "#1a1a1a",

  padding: "20px",

  borderRadius: "15px",

  marginBottom: "20px"

}


const button = {

  width: "100%",

  padding: "18px",

  background: "red",

  color: "white",

  border: "none",

  borderRadius: "12px",

  fontSize: "18px",

  fontWeight: "bold",

  cursor: "pointer"

}
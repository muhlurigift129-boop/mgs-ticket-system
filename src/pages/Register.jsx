import { useState } from "react"

export default function Register() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    deliveryMethod: "email",
    ticketType: "full",
    quantity: 1
  })

  const prices = {
    full: 300,
    vibe: 100
  }

  const total =
    prices[formData.ticketType] *
    Number(formData.quantity)

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  function handleSubmit(e) {
    e.preventDefault()

    localStorage.setItem(
      "mgs_order",
      JSON.stringify({
        ...formData,
        total
      })
    )

    console.log("Going to payment page")

    window.location.hash = "#/payment"
  }

  return (
    <div
      style={{
        background: "#000",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px"
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#111",
          padding: "40px",
          borderRadius: "20px",
          width: "400px",
          color: "white",
          boxShadow: "0 0 20px red"
        }}
      >
        <h1
          style={{
            color: "red",
            textAlign: "center",
            marginBottom: "20px"
          }}
        >
          MGS TICKETS
        </h1>

        <input
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <input
          name="phone"
          placeholder="Phone / WhatsApp"
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <select
          name="ticketType"
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="full">
            Full Event - R300
          </option>

          <option value="vibe">
            Vibe Only - R100
          </option>
        </select>

        <input
          type="number"
          name="quantity"
          min="1"
          defaultValue="1"
          onChange={handleChange}
          style={inputStyle}
        />

        <select
          name="deliveryMethod"
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

        <div
          style={{
            textAlign: "center",
            margin: "20px 0",
            color: "red",
            fontSize: "24px",
            fontWeight: "bold"
          }}
        >
          TOTAL: R{total}
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "18px",
            background: "red",
            border: "none",
            borderRadius: "10px",
            color: "white",
            fontSize: "18px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          CONTINUE TO PAYMENT
        </button>
      </form>
    </div>
  )
}

const inputStyle = {
  width: "100%",
  padding: "15px",
  margin: "10px 0",
  borderRadius: "10px",
  background: "#1a1a1a",
  border: "1px solid #333",
  color: "white",
  boxSizing: "border-box"
}
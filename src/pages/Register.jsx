import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Register() {

  const navigate = useNavigate()

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

  const total = prices[formData.ticketType] * formData.quantity

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  function handleSubmit(e) {
    e.preventDefault()

    // SAVE ORDER
    localStorage.setItem(
      "mgs_order",
      JSON.stringify({
        ...formData,
        total
      })
    )

    // GO TO PAYMENT PAGE
    navigate("/payment")
  }

  return (

    <div style={{
      background: "#000",
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "30px"
    }}>

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

        <h1 style={{ color: "red", textAlign: "center" }}>
          MGS TICKETS
        </h1>

        <input name="name" placeholder="Full Name" onChange={handleChange} style={inputStyle} required />
        <input name="email" placeholder="Email" onChange={handleChange} style={inputStyle} required />
        <input name="phone" placeholder="Phone / WhatsApp" onChange={handleChange} style={inputStyle} required />

        <select name="ticketType" onChange={handleChange} style={inputStyle}>
          <option value="full">Full Event - R300</option>
          <option value="vibe">Vibe Only - R100</option>
        </select>

        <input
          type="number"
          name="quantity"
          min="1"
          onChange={handleChange}
          style={inputStyle}
          defaultValue={1}
        />

        <select name="deliveryMethod" onChange={handleChange} style={inputStyle}>
          <option value="email">Email</option>
          <option value="whatsapp">WhatsApp</option>
        </select>

        <div style={{
          textAlign: "center",
          margin: "20px 0",
          color: "red"
        }}>
          TOTAL: R{total}
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "18px",
            background: "red",
            border: "none",
            color: "white",
            fontSize: "18px",
            cursor: "pointer"
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
  color: "white"
}
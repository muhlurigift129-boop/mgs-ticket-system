import { useState } from "react"

export default function Register({ ticketType, quantity, total }) {

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    delivery: "email"
  })

  function handleChange(e) {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })

  }

  function handleSubmit(e) {

    e.preventDefault()

    localStorage.setItem(
      "mgsCustomer",
      JSON.stringify({
        ...formData,
        ticketType,
        quantity,
        total
      })
    )

    window.location.href = "/payment"

  }

  return (

    <div style={{
      minHeight: "100vh",
      background: "black",
      color: "white",
      padding: "40px"
    }}>

      <div style={{
        maxWidth: "500px",
        margin: "0 auto",
        background: "#111",
        padding: "40px",
        borderRadius: "20px",
        boxShadow: "0 0 30px rgba(255,0,0,0.5)"
      }}>

        <h1 style={{
          color: "red",
          textAlign: "center",
          marginBottom: "30px"
        }}>
          CUSTOMER DETAILS
        </h1>

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
            type="text"
            name="phone"
            placeholder="WhatsApp Number"
            required
            value={formData.phone}
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
              Send Ticket Via Email
            </option>

            <option value="whatsapp">
              Send Ticket Via WhatsApp
            </option>

          </select>

          <div style={{
            background: "#1a1a1a",
            padding: "20px",
            borderRadius: "12px",
            marginBottom: "25px"
          }}>

            <h3 style={{ color: "red" }}>
              ORDER SUMMARY
            </h3>

            <p>
              Ticket: {ticketType === "full"
                ? "Full Event"
                : "Vibe Only"}
            </p>

            <p>
              Quantity: {quantity}
            </p>

            <h2>
              Total: R{total}
            </h2>

          </div>

          <button
            type="submit"

            style={{
              width: "100%",
              padding: "18px",
              background: "red",
              border: "none",
              borderRadius: "12px",
              color: "white",
              fontSize: "20px",
              cursor: "pointer"
            }}
          >

            CONTINUE TO PAYMENT

          </button>

        </form>

      </div>

    </div>

  )
}

const inputStyle = {

  width: "100%",
  padding: "16px",
  marginBottom: "20px",
  borderRadius: "10px",
  border: "1px solid #333",
  background: "#1a1a1a",
  color: "white",
  fontSize: "16px",
  outline: "none"

}
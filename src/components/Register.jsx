import { useEffect } from "react"
import { auth } from "../firebase/config"
import { useNavigate } from "react-router-dom"

export default function Register() {

  const navigate = useNavigate()

  useEffect(() => {

    if (!auth.currentUser) {

      navigate("/login")

    }

  }, [])

  const selectedTicket =
    JSON.parse(
      localStorage.getItem("selectedTicket")
    ) || {
      type: "full"
    }

  const prices = {
    full: 300,
    vibe: 100,
    vibeDrinks: 200,
    vibeFood: 200
  }

  const ticketNames = {
    full: "FULL EVENT",
    vibe: "VIBE ONLY",
    vibeDrinks: "VIBE + DRINKS",
    vibeFood: "VIBE + FOOD"
  }

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    delivery: "email",
    ticketType: selectedTicket.type,
    quantity: 1
  })

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

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      alert("Passwords Do Not Match")
      return
    }

    const user = {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      registeredAt:
        new Date().toISOString()
    }

    localStorage.setItem(
      "mgsUser",
      JSON.stringify(user)
    )

    const order = {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      delivery: formData.delivery,
      ticketType: formData.ticketType,
      ticketName:
        ticketNames[formData.ticketType],
      quantity: Number(
        formData.quantity
      ),
      total
    }

    localStorage.setItem(
      "mgsCustomer",
      JSON.stringify(order)
    )

    alert("Account Created Successfully")

    navigate("/payment")
  }

  return (

    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(to bottom,#000,#111)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px"
      }}
    >

      <div
        style={{
          width: "550px",
          background: "#111",
          padding: "40px",
          borderRadius: "25px",
          boxShadow:
            "0 0 35px rgba(255,0,0,.5)",
          color: "white"
        }}
      >

        <h1
          style={{
            textAlign: "center",
            color: "red"
          }}
        >
          MGS REGISTRATION
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#aaa",
            marginBottom: "30px"
          }}
        >
          Create Your Account
        </p>

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

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
            style={inputStyle}
          />

          <select
            name="ticketType"
            value={formData.ticketType}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="full">
              Full Event - R300
            </option>

            <option value="vibe">
              Vibe Only - R100
            </option>

            <option value="vibeDrinks">
              Vibe + Drinks - R200
            </option>

            <option value="vibeFood">
              Vibe + Food - R200
            </option>
          </select>

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

          <div
            style={{
              background:"#1a1a1a",
              padding:"20px",
              borderRadius:"15px",
              marginBottom:"20px"
            }}
          >

            <h3 style={{color:"red"}}>
              ORDER SUMMARY
            </h3>

            <p>
              Ticket:
              {" "}
              {ticketNames[
                formData.ticketType
              ]}
            </p>

            <p>
              Quantity:
              {" "}
              {formData.quantity}
            </p>

            <h2 style={{color:"red"}}>
              TOTAL: R{total}
            </h2>

          </div>

          <button
            type="submit"
            style={{
              width:"100%",
              padding:"18px",
              background:"red",
              border:"none",
              borderRadius:"12px",
              color:"white",
              fontSize:"18px",
              fontWeight:"bold",
              cursor:"pointer"
            }}
          >
            CREATE ACCOUNT & PAY
          </button>

        </form>

      </div>

    </div>

  )

}

const inputStyle = {
  width:"100%",
  padding:"15px",
  marginBottom:"15px",
  borderRadius:"10px",
  border:"1px solid #333",
  background:"#1a1a1a",
  color:"white",
  fontSize:"16px",
  boxSizing:"border-box"
}

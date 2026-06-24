import { auth } from "../firebase/config"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

export default function Home() {

  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const user = auth.currentUser

  const tickets = [
    {
      name: "FULL EVENT",
      price: 300,
      description: "Full access to the entire MGS experience",
      type: "full",
      popular: true,
      features: [
        "Full Event Access",
        "Main Stage",
        "Networking",
        "All Activities"
      ]
    },
    {
      name: "VIBE ONLY",
      price: 100,
      description: "Enjoy the atmosphere and entertainment",
      type: "vibe",
      features: [
        "Event Entry",
        "Live Entertainment",
        "Music & Vibes"
      ]
    },
    {
      name: "VIBE + DRINKS",
      price: 200,
      description: "Entertainment with drinks included",
      type: "vibeDrinks",
      features: [
        "Event Entry",
        "Selected Drinks",
        "Live Entertainment"
      ]
    },
    {
      name: "VIBE + FOOD",
      price: 200,
      description: "Entertainment with food included",
      type: "vibeFood",
      features: [
        "Event Entry",
        "Meal Included",
        "Live Entertainment"
      ]
    }
  ]

  function selectTicket(ticket) {

    if (!user) {
      alert("⚠ You must login before buying tickets!")
      navigate("/login")
      return
    }

    localStorage.setItem(
      "selectedTicket",
      JSON.stringify(ticket)
    )

    navigate("/register")
  }

  return (

    <div style={page}>

      {/* TOP BAR */}
      <div style={topBar}>

        {/* MENU BUTTON */}
        <div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={menuBtn}
          >
            ☰
          </button>
        </div>

        {/* RIGHT SIDE */}
        <div style={{ display: "flex", gap: "10px" }}>

          {user ? (
            <button
              onClick={() => navigate("/my-account")}
              style={topBtn}
            >
              MY ACCOUNT
            </button>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                style={topBtn}
              >
                LOGIN
              </button>

              <button
                onClick={() => navigate("/register")}
                style={topBtnRed}
              >
                REGISTER
              </button>
            </>
          )}

        </div>

      </div>

      {/* SIDE MENU */}
      {menuOpen && (
        <div style={sideMenu}>

          <button
            onClick={() => navigate("/my-account")}
            style={menuItem}
          >
            My Account
          </button>

          <button
            onClick={() => navigate("/orders")}
            style={menuItem}
          >
            Orders
          </button>

          <button
            onClick={() => window.open("https://wa.me/0735306246")}
            style={menuItem}
          >
            Contact Us
          </button>

        </div>
      )}

      {/* HEADER */}
      <div style={{ textAlign: "center", marginTop: "80px" }}>

        <h1 style={{ color: "red", fontSize: "70px" }}>
          MGS EVENT
        </h1>

        <h3>JULY 31 – AUGUST 01</h3>

        <p style={{ color: "#aaa", maxWidth: "600px", margin: "auto" }}>
          Choose your ticket and secure your place.
        </p>

      </div>

      {/* TICKETS */}
      <div style={grid}>

        {tickets.map(ticket => (

          <div key={ticket.type} style={card(ticket.popular)}>

            <h2 style={{ color: "red" }}>
              {ticket.name}
            </h2>

            <h1>R{ticket.price}</h1>

            <p>{ticket.description}</p>

            <div style={{ textAlign: "left" }}>
              {ticket.features.map(f => (
                <p key={f}>✓ {f}</p>
              ))}
            </div>

            <button
              onClick={() => selectTicket(ticket)}
              style={buyBtn}
            >
              BUY NOW
            </button>

          </div>

        ))}

      </div>

    </div>

  )
}

/* STYLES */

const page = {
  minHeight: "100vh",
  background: "#000",
  color: "white",
  padding: "20px"
}

const topBar = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  display: "flex",
  justifyContent: "space-between",
  padding: "15px",
  background: "#111",
  zIndex: 1000
}

const menuBtn = {
  fontSize: "25px",
  background: "none",
  color: "white",
  border: "none",
  cursor: "pointer"
}

const topBtn = {
  background: "#222",
  color: "white",
  border: "1px solid red",
  padding: "10px 15px",
  borderRadius: "8px",
  cursor: "pointer"
}

const topBtnRed = {
  background: "red",
  color: "white",
  border: "none",
  padding: "10px 15px",
  borderRadius: "8px",
  cursor: "pointer"
}

const sideMenu = {
  position: "fixed",
  top: "60px",
  left: 0,
  width: "200px",
  background: "#111",
  height: "100%",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  gap: "10px"
}

const menuItem = {
  background: "none",
  color: "white",
  border: "1px solid red",
  padding: "10px",
  cursor: "pointer",
  borderRadius: "8px"
}

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
  gap: "20px",
  marginTop: "120px"
}

const card = (popular) => ({
  background: "#111",
  border: popular ? "2px solid red" : "1px solid #333",
  padding: "25px",
  borderRadius: "20px",
  textAlign: "center"
})

const buyBtn = {
  marginTop: "15px",
  width: "100%",
  padding: "15px",
  background: "red",
  color: "white",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer"
}

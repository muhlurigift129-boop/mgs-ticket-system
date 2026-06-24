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
      alert("⚠ Please login before buying tickets")
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

      {/* TOP NAV BAR */}
      <div style={navBar}>

        {/* MENU LEFT */}
        <div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={menuBtn}
          >
            ☰ MENU
          </button>

          {menuOpen && (

            <div style={menuDropdown}>

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
                onClick={() =>
                  window.open(
                    "https://wa.me/0735306246",
                    "_blank"
                  )
                }
                style={menuItem}
              >
                Contact Us
              </button>

            </div>

          )}

        </div>

        {/* RIGHT AUTH BUTTONS */}
        <div style={{ display: "flex", gap: "10px" }}>

          {!user ? (

            <>
              <button
                onClick={() => navigate("/login")}
                style={authBtnRed}
              >
                LOGIN
              </button>

              <button
                onClick={() => navigate("/register")}
                style={authBtnDark}
              >
                REGISTER
              </button>
            </>

          ) : (

            <button
              onClick={() => navigate("/my-account")}
              style={authBtnRed}
            >
              MY ACCOUNT
            </button>

          )}

        </div>

      </div>

      {/* HEADER */}
      <div style={header}>

        <h1 style={title}>MGS EVENT</h1>

        <h2>JULY 31 – AUGUST 01</h2>

        <p style={desc}>
          Choose your preferred ticket package and secure your place.
        </p>

      </div>

      {/* TICKETS */}
      <div style={grid}>

        {tickets.map((ticket) => (

          <div key={ticket.type} style={card}>

            {ticket.popular && (
              <div style={badge}>
                MOST POPULAR
              </div>
            )}

            <h2 style={{ color: "red" }}>
              {ticket.name}
            </h2>

            <h1>R{ticket.price}</h1>

            <p style={{ color: "#bbb" }}>
              {ticket.description}
            </p>

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

/* ================= STYLES ================= */

const page = {
  minHeight: "100vh",
  background: "linear-gradient(180deg,#000,#111)",
  color: "white"
}

const navBar = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "15px 20px",
  borderBottom: "1px solid #222",
  position: "sticky",
  top: 0,
  background: "#000",
  zIndex: 10
}

const menuBtn = {
  background: "red",
  color: "white",
  border: "none",
  padding: "10px 15px",
  borderRadius: "10px",
  fontWeight: "bold",
  cursor: "pointer"
}

const menuDropdown = {
  position: "absolute",
  background: "#111",
  border: "1px solid red",
  padding: "10px",
  marginTop: "10px",
  borderRadius: "10px",
  display: "flex",
  flexDirection: "column",
  gap: "10px"
}

const menuItem = {
  background: "transparent",
  color: "white",
  border: "none",
  cursor: "pointer",
  textAlign: "left"
}

const authBtnRed = {
  background: "red",
  color: "white",
  border: "none",
  padding: "10px 15px",
  borderRadius: "10px",
  fontWeight: "bold",
  cursor: "pointer"
}

const authBtnDark = {
  background: "#222",
  color: "white",
  border: "1px solid red",
  padding: "10px 15px",
  borderRadius: "10px",
  cursor: "pointer"
}

const header = {
  textAlign: "center",
  padding: "40px 20px"
}

const title = {
  fontSize: "60px",
  color: "red"
}

const desc = {
  color: "#aaa",
  maxWidth: "600px",
  margin: "0 auto"
}

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
  gap: "20px",
  padding: "40px"
}

const card = {
  background: "#111",
  padding: "25px",
  borderRadius: "20px",
  border: "1px solid #333",
  textAlign: "center"
}

const badge = {
  background: "red",
  padding: "5px 10px",
  borderRadius: "20px",
  fontSize: "12px",
  marginBottom: "10px"
}

const buyBtn = {
  marginTop: "15px",
  width: "100%",
  padding: "15px",
  background: "red",
  border: "none",
  borderRadius: "10px",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer"
}

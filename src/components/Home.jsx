import { auth } from "../firebase/config"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

export default function Home() {

  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {

    const unsubscribe =
      auth.onAuthStateChanged((u) => {
        setUser(u)
      })

    return () => unsubscribe()

  }, [])

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
        "Live Music",
        "DJ Experience"
      ]
    },
    {
      name: "VIBE + DRINKS",
      price: 200,
      description: "Entertainment with drinks included",
      type: "vibeDrinks",
      features: [
        "Entry",
        "Drinks",
        "Entertainment"
      ]
    },
    {
      name: "VIBE + FOOD",
      price: 200,
      description: "Entertainment with food included",
      type: "vibeFood",
      features: [
        "Entry",
        "Food Included",
        "Entertainment"
      ]
    }
  ]

  function selectTicket(ticket) {

    if (!user) {

      alert("⚠ You must login before buying tickets")

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
        <div
          style={menuBtn}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </div>

        {/* RIGHT LOGIN AREA */}
        <div style={authArea}>

          {!user ? (

            <>
              <button
                onClick={() => navigate("/login")}
                style={loginBtn}
              >
                LOGIN
              </button>

              <button
                onClick={() => navigate("/register")}
                style={registerBtn}
              >
                REGISTER
              </button>
            </>

          ) : (

            <button
              onClick={() => navigate("/my-account")}
              style={accountBtn}
            >
              MY ACCOUNT
            </button>

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
            onClick={() => navigate("/my-account")}
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

      {/* HEADER */}
      <div style={{ textAlign: "center", marginTop: "60px" }}>

        <h1 style={title}>MGS EVENT</h1>

        {!user && (
          <p style={warning}>
            ⚠ Login required to purchase tickets
          </p>
        )}

      </div>

      {/* TICKETS */}
      <div style={grid}>

        {tickets.map((ticket) => (

          <div key={ticket.type} style={card(ticket.popular)}>

            {ticket.popular && (
              <div style={badge}>MOST POPULAR</div>
            )}

            <h2 style={cardTitle}>{ticket.name}</h2>

            <h1 style={price}>R{ticket.price}</h1>

            <p style={{ color: "#bbb" }}>
              {ticket.description}
            </p>

            <div style={features}>
              {ticket.features.map((f) => (
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

/* ===== STYLES ===== */

const page = {
  minHeight: "100vh",
  background: "#000",
  color: "white"
}

const topBar = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "15px 20px",
  background: "#0a0a0a",
  borderBottom: "1px solid red",
  position: "sticky",
  top: 0
}

const menuBtn = {
  fontSize: "26px",
  cursor: "pointer",
  color: "red"
}

const authArea = {
  display: "flex",
  gap: "10px"
}

const loginBtn = {
  background: "red",
  border: "none",
  color: "white",
  padding: "10px 15px",
  borderRadius: "8px",
  cursor: "pointer"
}

const registerBtn = {
  background: "#222",
  border: "1px solid red",
  color: "white",
  padding: "10px 15px",
  borderRadius: "8px",
  cursor: "pointer"
}

const accountBtn = {
  background: "green",
  border: "none",
  color: "white",
  padding: "10px 15px",
  borderRadius: "8px",
  cursor: "pointer"
}

const sideMenu = {
  position: "fixed",
  top: "60px",
  left: 0,
  width: "220px",
  height: "100%",
  background: "#111",
  borderRight: "1px solid red",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  gap: "10px"
}

const menuItem = {
  background: "#222",
  border: "1px solid red",
  color: "white",
  padding: "12px",
  borderRadius: "8px",
  cursor: "pointer",
  textAlign: "left"
}

const title = {
  color: "red",
  fontSize: "60px"
}

const warning = {
  color: "red",
  marginTop: "10px"
}

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
  gap: "20px",
  padding: "40px"
}

const card = (popular) => ({
  background: "#111",
  border: popular ? "2px solid red" : "1px solid #333",
  borderRadius: "20px",
  padding: "25px",
  textAlign: "center"
})

const badge = {
  background: "red",
  padding: "5px 10px",
  borderRadius: "20px",
  fontSize: "12px",
  position: "relative",
  top: "-10px"
}

const cardTitle = {
  color: "red"
}

const price = {
  fontSize: "40px",
  margin: "10px 0"
}

const features = {
  textAlign: "left",
  marginTop: "15px"
}

const buyBtn = {
  width: "100%",
  marginTop: "15px",
  padding: "14px",
  background: "red",
  border: "none",
  color: "white",
  borderRadius: "10px",
  cursor: "pointer"
}

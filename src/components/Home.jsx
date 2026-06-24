import { auth } from "../firebase/config"
import { useNavigate } from "react-router-dom"

export default function Home() {

  const navigate = useNavigate()

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

    const user = auth.currentUser

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

    <div style={container}>

      {/* HEADER */}
      <div style={header}>

        <h1 style={title}>
          MGS EVENT
        </h1>

        <h2 style={subtitle}>
          JULY 31 – AUGUST 01
        </h2>

        <p style={description}>
          Choose your ticket package and secure your place at the MGS experience.
        </p>

      </div>

      {/* TICKETS */}
      <div style={grid}>

        {tickets.map(ticket => (

          <div key={ticket.type} style={{
            ...card,
            border: ticket.popular ? "2px solid red" : "1px solid #333",
            boxShadow: ticket.popular
              ? "0 0 25px rgba(255,0,0,.5)"
              : "0 0 10px rgba(255,255,255,.05)"
          }}>

            {ticket.popular && (
              <div style={badge}>
                MOST POPULAR
              </div>
            )}

            <h2 style={cardTitle}>
              {ticket.name}
            </h2>

            <h1 style={price}>
              R{ticket.price}
            </h1>

            <p style={cardDesc}>
              {ticket.description}
            </p>

            <div style={features}>
              {ticket.features.map(f => (
                <p key={f}>✓ {f}</p>
              ))}
            </div>

            <button
              onClick={() => selectTicket(ticket)}
              style={buyButton}
            >
              BUY NOW
            </button>

          </div>

        ))}

      </div>

    </div>

  )
}

/* =======================
   MGS STYLES
======================= */

const container = {
  minHeight: "100vh",
  background: "linear-gradient(180deg,#000,#111)",
  color: "white",
  padding: "40px 20px"
}

const header = {
  textAlign: "center",
  marginBottom: "50px"
}

const title = {
  color: "red",
  fontSize: "60px",
  letterSpacing: "3px",
  marginBottom: "10px"
}

const subtitle = {
  color: "white"
}

const description = {
  color: "#aaa",
  maxWidth: "600px",
  margin: "20px auto"
}

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
  gap: "25px",
  maxWidth: "1200px",
  margin: "0 auto"
}

const card = {
  background: "#111",
  borderRadius: "25px",
  padding: "30px",
  textAlign: "center",
  position: "relative"
}

const badge = {
  position: "absolute",
  top: "-10px",
  left: "50%",
  transform: "translateX(-50%)",
  background: "red",
  padding: "6px 15px",
  borderRadius: "20px",
  fontSize: "12px",
  fontWeight: "bold"
}

const cardTitle = {
  color: "red",
  marginBottom: "10px"
}

const price = {
  fontSize: "45px",
  margin: "15px 0"
}

const cardDesc = {
  color: "#bbb",
  marginBottom: "20px"
}

const features = {
  textAlign: "left",
  marginBottom: "20px"
}

const buyButton = {
  width: "100%",
  padding: "15px",
  background: "red",
  border: "none",
  borderRadius: "12px",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer"
}

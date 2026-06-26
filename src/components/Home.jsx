```jsx
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

    localStorage.setItem(
      "selectedTicket",
      JSON.stringify(ticket)
    )

    navigate("/login")

  }

  return (

    <div style={page}>

      <div style={header}>

        <h1 style={title}>
          MGS EVENT
        </h1>

        <h2 style={date}>
          JULY 31 – AUGUST 01
        </h2>

        <p style={desc}>
          Choose your preferred ticket package and secure your place.
        </p>

      </div>

      <div style={grid}>

        {tickets.map((ticket) => (

          <div
            key={ticket.type}
            style={{
              ...card,
              border: ticket.popular
                ? "2px solid red"
                : "1px solid #333"
            }}
          >

            {ticket.popular && (

              <div style={badge}>
                MOST POPULAR
              </div>

            )}

            <h2 style={ticketTitle}>
              {ticket.name}
            </h2>

            <h1 style={price}>
              R{ticket.price}
            </h1>

            <p style={description}>
              {ticket.description}
            </p>

            <div style={featureBox}>

              {ticket.features.map((feature) => (

                <p key={feature}>
                  ✓ {feature}
                </p>

              ))}

            </div>

            <button
              style={buyBtn}
              onClick={() => selectTicket(ticket)}
            >
              BUY NOW
            </button>

          </div>

        ))}

      </div>

    </div>

  )

}

const page = {
  minHeight: "100vh",
  background: "linear-gradient(180deg,#000,#111)",
  color: "white",
  paddingTop: "90px"
}

const header = {
  textAlign: "center",
  padding: "40px 20px"
}

const title = {
  color: "red",
  fontSize: "60px",
  marginBottom: "10px"
}

const date = {
  color: "white"
}

const desc = {
  color: "#aaa",
  maxWidth: "700px",
  margin: "20px auto"
}

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
  gap: "25px",
  padding: "40px"
}

const card = {
  background: "#111",
  borderRadius: "20px",
  padding: "25px",
  textAlign: "center",
  transition: ".3s"
}

const badge = {
  background: "red",
  color: "white",
  display: "inline-block",
  padding: "6px 12px",
  borderRadius: "20px",
  marginBottom: "15px",
  fontWeight: "bold",
  fontSize: "12px"
}

const ticketTitle = {
  color: "red"
}

const price = {
  fontSize: "42px"
}

const description = {
  color: "#bbb"
}

const featureBox = {
  textAlign: "left",
  marginTop: "20px"
}

const buyBtn = {
  width: "100%",
  marginTop: "20px",
  padding: "15px",
  background: "red",
  color: "white",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "16px"
}
```

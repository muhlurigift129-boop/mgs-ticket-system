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

      alert(
        "Please login or register first."
      )

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

    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg,#000000,#111111)",
        color: "white",
        padding: "40px 20px"
      }}
    >

      <div
        style={{
          textAlign: "center",
          marginBottom: "60px"
        }}
      >

        <h1
          style={{
            color: "red",
            fontSize: "70px",
            marginBottom: "10px",
            letterSpacing: "3px"
          }}
        >
          MGS EVENT
        </h1>

        <h2>
          JULY 31 – AUGUST 01
        </h2>

        <p
          style={{
            color: "#aaa",
            maxWidth: "700px",
            margin: "20px auto"
          }}
        >
          Choose your preferred ticket package and
          secure your place at the MGS Event.
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "15px",
            flexWrap: "wrap",
            marginTop: "30px"
          }}
        >

          <button
            onClick={() => navigate("/login")}
            style={navButtonRed}
          >
            LOGIN
          </button>

          <button
            onClick={() => navigate("/my-account")}
            style={navButtonDark}
          >
            MY ACCOUNT
          </button>

          <button
            onClick={() => navigate("/register")}
            style={navButtonDark}
          >
            REGISTER
          </button>

          <button
            onClick={() =>
              window.open(
                "https://wa.me/0735306246",
                "_blank"
              )
            }
            style={navButtonGreen}
          >
            CONTACT US
          </button>

        </div>

      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(280px,1fr))",
          gap: "25px",
          maxWidth: "1300px",
          margin: "0 auto"
        }}
      >

        {tickets.map((ticket) => (

          <div
            key={ticket.type}
            style={{
              background: "#111",
              border:
                ticket.popular
                  ? "3px solid red"
                  : "1px solid #333",
              borderRadius: "25px",
              padding: "30px",
              textAlign: "center",
              position: "relative",
              boxShadow:
                ticket.popular
                  ? "0 0 30px rgba(255,0,0,.5)"
                  : "0 0 15px rgba(255,255,255,.05)"
            }}
          >

            {ticket.popular && (

              <div
                style={{
                  position: "absolute",
                  top: "-12px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "red",
                  color: "white",
                  padding: "6px 15px",
                  borderRadius: "20px",
                  fontSize: "12px",
                  fontWeight: "bold"
                }}
              >
                MOST POPULAR
              </div>

            )}

            <h2
              style={{
                color: "red",
                marginTop: "10px"
              }}
            >
              {ticket.name}
            </h2>

            <h1
              style={{
                fontSize: "48px",
                margin: "20px 0"
              }}
            >
              R{ticket.price}
            </h1>

            <p
              style={{
                color: "#bbb",
                marginBottom: "20px"
              }}
            >
              {ticket.description}
            </p>

            <div
              style={{
                textAlign: "left",
                marginBottom: "25px"
              }}
            >
              {ticket.features.map((feature) => (
                <p key={feature}>
                  ✓ {feature}
                </p>
              ))}
            </div>

            <button
              onClick={() => selectTicket(ticket)}
              style={{
                width: "100%",
                padding: "16px",
                background: "red",
                border: "none",
                borderRadius: "12px",
                color: "white",
                fontWeight: "bold",
                fontSize: "17px",
                cursor: "pointer"
              }}
            >
              BUY NOW
            </button>

          </div>

        ))}

      </div>

    </div>

  )
}

const navButtonRed = {
  padding: "15px 30px",
  background: "red",
  color: "white",
  border: "none",
  borderRadius: "10px",
  fontWeight: "bold",
  cursor: "pointer"
}

const navButtonDark = {
  padding: "15px 30px",
  background: "#222",
  color: "white",
  border: "1px solid red",
  borderRadius: "10px",
  fontWeight: "bold",
  cursor: "pointer"
}

const navButtonGreen = {
  padding: "15px 30px",
  background: "green",
  color: "white",
  border: "none",
  borderRadius: "10px",
  fontWeight: "bold",
  cursor: "pointer"
}

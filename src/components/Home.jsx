import { auth } from "../firebase/config"
import {
  signOut,
  onAuthStateChanged
} from "firebase/auth"

import {
  useNavigate
} from "react-router-dom"

import {
  useState,
  useEffect
} from "react"

export default function Home() {

  const navigate = useNavigate()

  const [menuOpen, setMenuOpen] =
    useState(false)

  const [user, setUser] =
    useState(null)

  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(
        auth,
        (currentUser) => {

          setUser(currentUser)

        }
      )

    return () => unsubscribe()

  }, [])

  async function logout() {

    await signOut(auth)

    localStorage.removeItem(
      "mgs_user"
    )

    navigate("/")

  }

  const tickets = [

    {
      name: "FULL EVENT",
      price: 300,
      description:
        "Full access to the entire MGS experience",
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
      description:
        "Enjoy the atmosphere and entertainment",
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
      description:
        "Entertainment with drinks included",
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
      description:
        "Entertainment with food included",
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

    if (!user) {

      alert(
        "Please login before purchasing tickets."
      )

      navigate("/login")

      return

    }

    navigate("/register")

  }

  function openAccount() {

    if (!user) {

      navigate("/login")

      return

    }

    navigate("/my-account")

  }

  function openOrders() {

    if (!user) {

      navigate("/login")

      return

    }

    navigate("/orders")

  }

  return (

    <div style={page}>

      {/* NAVBAR */}

      <div style={navBar}>

        <div>

          <button
            style={menuBtn}
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
          >
            ☰ MENU
          </button>

          {menuOpen && (

            <div style={menuDropdown}>

              <button
                style={menuItem}
                onClick={openAccount}
              >
                👤 My Account
              </button>

              <button
                style={menuItem}
                onClick={openOrders}
              >
                🎫 Orders
              </button>

              <button
                style={menuItem}
                onClick={() =>
                  navigate("/contact")
                }
              >
                📞 Contact Us
              </button>

              {user && (

                <button
                  style={menuItem}
                  onClick={logout}
                >
                  🚪 Logout
                </button>

              )}

            </div>

          )}

        </div>

        <div
          style={{
            display: "flex",
            gap: "10px"
          }}
        >

          {!user ? (

            <>

              <button
                onClick={() =>
                  navigate("/login")
                }
                style={authBtnRed}
              >
                LOGIN
              </button>

              <button
                onClick={() =>
                  navigate(
                    "/register-account"
                  )
                }
                style={authBtnDark}
              >
                REGISTER
              </button>

            </>

          ) : (

            <>

              <button
                onClick={() =>
                  navigate("/my-account")
                }
                style={authBtnRed}
              >
                MY ACCOUNT
              </button>

              <button
                onClick={logout}
                style={authBtnDark}
              >
                LOGOUT
              </button>

            </>

          )}

        </div>

      </div>

      {/* HEADER */}

      <div style={header}>

        <h1 style={title}>
          MGS EVENT
        </h1>

        <h2>
          JULY 31 – AUGUST 01
        </h2>

        <p style={desc}>
          Choose your preferred ticket
          package and secure your place.
        </p>

      </div>

      {/* TICKETS */}

      <div style={grid}>

        {tickets.map(ticket => (

          <div
            key={ticket.type}
            style={card}
          >

            {ticket.popular && (

              <div style={badge}>
                MOST POPULAR
              </div>

            )}

            <h2
              style={{
                color: "red"
              }}
            >
              {ticket.name}
            </h2>

            <h1>
              R{ticket.price}
            </h1>

            <p
              style={{
                color: "#bbb"
              }}
            >
              {ticket.description}
            </p>

            <div
              style={{
                textAlign: "left"
              }}
            >

              {ticket.features.map(
                feature => (

                  <p key={feature}>
                    ✓ {feature}
                  </p>

                )
              )}

            </div>

            <button
              onClick={() =>
                selectTicket(ticket)
              }
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

const page = {

  minHeight: "100vh",

  background:
    "linear-gradient(180deg,#000,#111)",

  color: "white"

}

const navBar = {

  display: "flex",

  justifyContent:
    "space-between",

  alignItems: "center",

  padding: "15px 20px",

  borderBottom:
    "1px solid #222",

  background: "#000",

  position: "sticky",

  top: 0,

  zIndex: 999

}

const menuBtn = {

  background: "red",

  color: "white",

  border: "none",

  padding: "12px 15px",

  borderRadius: "10px",

  cursor: "pointer",

  fontWeight: "bold"

}

const menuDropdown = {

  position: "absolute",

  marginTop: "10px",

  background: "#111",

  border: "1px solid red",

  borderRadius: "12px",

  padding: "10px",

  display: "flex",

  flexDirection: "column",

  gap: "10px",

  minWidth: "180px"

}

const menuItem = {

  background: "transparent",

  color: "white",

  border: "none",

  cursor: "pointer",

  textAlign: "left",

  padding: "10px"

}

const authBtnRed = {

  background: "red",

  color: "white",

  border: "none",

  padding: "10px 15px",

  borderRadius: "10px",

  cursor: "pointer",

  fontWeight: "bold"

}

const authBtnDark = {

  background: "#111",

  color: "white",

  border: "1px solid red",

  padding: "10px 15px",

  borderRadius: "10px",

  cursor: "pointer"

}

const header = {

  textAlign: "center",

  padding: "50px 20px"

}

const title = {

  color: "red",

  fontSize: "70px",

  marginBottom: "10px"

}

const desc = {

  color: "#aaa",

  maxWidth: "700px",

  margin: "0 auto"

}

const grid = {

  display: "grid",

  gridTemplateColumns:
    "repeat(auto-fit,minmax(280px,1fr))",

  gap: "25px",

  padding: "40px"

}

const card = {

  background: "#111",

  border: "1px solid #333",

  borderRadius: "20px",

  padding: "25px",

  textAlign: "center"

}

const badge = {

  background: "red",

  color: "white",

  padding: "6px 12px",

  borderRadius: "20px",

  display: "inline-block",

  marginBottom: "10px",

  fontSize: "12px",

  fontWeight: "bold"

}

const buyBtn = {

  width: "100%",

  padding: "15px",

  marginTop: "15px",

  background: "red",

  color: "white",

  border: "none",

  borderRadius: "10px",

  cursor: "pointer",

  fontWeight: "bold"

}

import { useNavigate } from "react-router-dom"
import { auth } from "../firebase/config"
import { signOut } from "firebase/auth"
import { useEffect, useState } from "react"

export default function Navbar() {

  const navigate = useNavigate()

  const [user, setUser] = useState(null)

  useEffect(() => {

    const unsubscribe =
      auth.onAuthStateChanged((currentUser) => {

        setUser(currentUser)

      })

    return () => unsubscribe()

  }, [])

  async function logout() {

    await signOut(auth)

    navigate("/")

  }

  return (

    <div
      style={{
        background: "#000",
        borderBottom: "2px solid red",
        padding: "15px 25px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "sticky",
        top: 0,
        zIndex: 999
      }}
    >

      {/* LEFT */}

      <button
        onClick={() => navigate("/")}
        style={{
          background: "transparent",
          border: "none",
          color: "red",
          fontSize: "28px",
          cursor: "pointer",
          fontWeight: "bold"
        }}
      >
        ☰ MGS
      </button>

      {/* RIGHT */}

      <div
        style={{
          display: "flex",
          gap: "10px"
        }}
      >

        {!user ? (

          <>

            <button
              onClick={() => navigate("/login")}
              style={buttonStyle}
            >
              LOGIN
            </button>

            <button
              onClick={() => navigate("/register")}
              style={buttonStyle}
            >
              REGISTER
            </button>

          </>

        ) : (

          <>

            <button
              onClick={() => navigate("/my-account")}
              style={buttonStyle}
            >
              MY ACCOUNT
            </button>

            <button
              onClick={() => navigate("/orders")}
              style={buttonStyle}
            >
              ORDERS
            </button>

            <button
              onClick={logout}
              style={{
                ...buttonStyle,
                background: "#222"
              }}
            >
              LOGOUT
            </button>

          </>

        )}

      </div>

    </div>

  )

}

const buttonStyle = {

  background: "red",

  color: "white",

  border: "none",

  padding: "10px 18px",

  borderRadius: "10px",

  cursor: "pointer",

  fontWeight: "bold"

}

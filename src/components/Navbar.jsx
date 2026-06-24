import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { auth } from "../firebase/config"

export default function Navbar() {

  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const user = auth.currentUser

  function logout() {
    auth.signOut()
    localStorage.clear()
    navigate("/")
  }

  return (

    <div style={navStyle}>

      {/* LEFT MENU */}
      <div style={{ position: "relative" }}>

        <button
          onClick={() => setOpen(!open)}
          style={menuBtn}
        >
          ☰ MENU
        </button>

        {open && (
          <div style={dropdown}>

            <button
              onClick={() => navigate("/my-account")}
              style={dropItem}
            >
              My Account
            </button>

            <button
              onClick={() => navigate("/orders")}
              style={dropItem}
            >
              Orders
            </button>

            <button
              onClick={() => navigate("/contact")}
              style={dropItem}
            >
              Contact Us
            </button>

          </div>
        )}

      </div>

      {/* RIGHT AUTH */}
      <div>

        {user ? (

          <div style={{ display: "flex", gap: "10px" }}>

            <button
              onClick={() => navigate("/my-account")}
              style={authBtn}
            >
              PROFILE
            </button>

            <button
              onClick={logout}
              style={logoutBtn}
            >
              LOGOUT
            </button>

          </div>

        ) : (

          <div style={{ display: "flex", gap: "10px" }}>

            <button
              onClick={() => navigate("/login")}
              style={authBtn}
            >
              LOGIN
            </button>

            <button
              onClick={() => navigate("/register-account")}
              style={authBtn}
            >
              REGISTER
            </button>

          </div>

        )}

      </div>

    </div>

  )
}

const navStyle = {

  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  height: "70px",
  background: "#000",
  borderBottom: "2px solid red",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 20px",
  zIndex: 1000
}

const menuBtn = {

  background: "transparent",
  color: "red",
  border: "1px solid red",
  padding: "10px 15px",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "bold"

}

const dropdown = {

  position: "absolute",
  top: "50px",
  left: 0,
  background: "#111",
  border: "1px solid red",
  borderRadius: "10px",
  width: "180px",
  display: "flex",
  flexDirection: "column"

}

const dropItem = {

  padding: "12px",
  background: "transparent",
  color: "white",
  border: "none",
  cursor: "pointer",
  textAlign: "left"

}

const authBtn = {

  background: "red",
  color: "white",
  border: "none",
  padding: "10px 15px",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "bold"

}

const logoutBtn = {

  background: "black",
  color: "red",
  border: "1px solid red",
  padding: "10px 15px",
  borderRadius: "10px",
  cursor: "pointer"

}

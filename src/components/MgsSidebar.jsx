import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function MgsSidebar() {

  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const user =
    localStorage.getItem("mgs_user")

  const isLoggedIn = !!user

  function logout() {

    localStorage.removeItem("mgs_user")

    setOpen(false)

    navigate("/login")

  }

  return (

    <>
      {/* TOP BAR */}
      <div style={topBar}>

        {/* MENU BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          style={menuBtn}
        >
          ☰ Menu
        </button>

        {/* RIGHT SIDE AUTH */}
        <div style={rightSide}>

          {!isLoggedIn ? (

            <>
              <button
                onClick={() =>
                  navigate("/login")
                }
                style={authBtn}
              >
                Login
              </button>

              <button
                onClick={() =>
                  navigate("/register-account")
                }
                style={authBtn}
              >
                Register
              </button>
            </>

          ) : (

            <button
              onClick={() =>
                navigate("/my-account")
              }
              style={authBtn}
            >
              My Account
            </button>

          )}

        </div>

      </div>

      {/* SIDEBAR */}
      {open && (

        <div style={sidebar}>

          <button
            onClick={() => {
              navigate("/")
              setOpen(false)
            }}
            style={linkBtn}
          >
            Home
          </button>

          {isLoggedIn && (

            <button
              onClick={() => {
                navigate("/my-account")
                setOpen(false)
              }}
              style={linkBtn}
            >
              My Account
            </button>

          )}

          <button
            onClick={() => {
              navigate("/orders")
              setOpen(false)
            }}
            style={linkBtn}
          >
            Orders
          </button>

          <button
            onClick={() => {
              navigate("/contact")
              setOpen(false)
            }}
            style={linkBtn}
          >
            Contact Us
          </button>

          {isLoggedIn && (

            <button
              onClick={logout}
              style={{
                ...linkBtn,
                color: "red"
              }}
            >
              Logout
            </button>

          )}

        </div>

      )}

    </>

  )

}

/* ===== STYLES ===== */

const topBar = {

  position: "fixed",
  top: 0,
  left: 0,
  right: 0,

  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",

  padding: "12px 15px",

  background: "rgba(0,0,0,0.9)",
  borderBottom: "1px solid red",

  zIndex: 9999
}

const menuBtn = {

  background: "red",
  color: "white",
  border: "none",
  padding: "10px 15px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold"
}

const rightSide = {

  display: "flex",
  gap: "10px"
}

const authBtn = {

  background: "#111",
  color: "white",
  border: "1px solid red",
  padding: "8px 12px",
  borderRadius: "8px",
  cursor: "pointer"
}

const sidebar = {

  position: "fixed",
  top: "60px",
  left: 0,

  width: "220px",
  height: "100vh",

  background: "#0a0a0a",
  borderRight: "1px solid red",

  display: "flex",
  flexDirection: "column",
  padding: "15px",
  gap: "10px",

  zIndex: 9998
}

const linkBtn = {

  background: "transparent",
  border: "1px solid #222",
  color: "white",
  padding: "12px",
  borderRadius: "8px",
  cursor: "pointer",
  textAlign: "left"
}

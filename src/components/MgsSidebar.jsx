import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import {
  auth
} from "../firebase/config"

import {
  signOut,
  onAuthStateChanged
} from "firebase/auth"

export default function MgsSidebar() {

  const navigate = useNavigate()

  const [open, setOpen] = useState(false)

  const [user, setUser] = useState(null)

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {

        setUser(currentUser)

      }
    )

    return () => unsubscribe()

  }, [])

  async function logout() {

    await signOut(auth)

    setOpen(false)

    navigate("/")

  }

  return (

    <>

      {/* TOP BAR */}

      <div style={topBar}>

        {/* LEFT */}

        <button

          onClick={() => setOpen(!open)}

          style={menuBtn}

        >

          ☰ MENU

        </button>

        {/* RIGHT */}

        {!user && (

          <div style={rightSide}>

            <button

              style={authBtn}

              onClick={() => navigate("/login")}

            >

              LOGIN

            </button>

            <button

              style={authBtnOutline}

              onClick={() => navigate("/register-account")}

            >

              REGISTER

            </button>

          </div>

        )}

      </div>

      {/* SIDEBAR */}

      <div

        style={{

          ...sidebar,

          left: open ? "0" : "-260px"

        }}

      >

        <button

          style={closeBtn}

          onClick={() => setOpen(false)}

        >

          ✕

        </button>

        <button

          style={linkBtn}

          onClick={() => {

            navigate("/")

            setOpen(false)

          }}

        >

          🏠 Home

        </button>

        {user && (

          <>

            <button

              style={linkBtn}

              onClick={() => {

                navigate("/my-account")

                setOpen(false)

              }}

            >

              👤 My Account

            </button>

            <button

              style={linkBtn}

              onClick={() => {

                navigate("/orders")

                setOpen(false)

              }}

            >

              🎟 Orders

            </button>

          </>

        )}

        <button

          style={linkBtn}

          onClick={() => {

            navigate("/contact")

            setOpen(false)

          }}

        >

          📞 Contact Us

        </button>

        {user && (

          <button

            style={logoutBtn}

            onClick={logout}

          >

            🚪 Logout

          </button>

        )}

      </div>

      {open && (

        <div

          style={overlay}

          onClick={() => setOpen(false)}

        />

      )}

    </>

  )

}

/* ========================= */

const topBar = {

  position: "fixed",

  top: 0,

  left: 0,

  right: 0,

  height: "65px",

  background: "#000",

  borderBottom: "2px solid red",

  display: "flex",

  justifyContent: "space-between",

  alignItems: "center",

  padding: "0 20px",

  zIndex: 9999

}

const menuBtn = {

  background: "red",

  color: "white",

  border: "none",

  padding: "12px 18px",

  borderRadius: "10px",

  cursor: "pointer",

  fontWeight: "bold",

  fontSize: "15px"

}

const rightSide = {

  display: "flex",

  gap: "10px"

}

const authBtn = {

  background: "red",

  color: "white",

  border: "none",

  padding: "10px 18px",

  borderRadius: "10px",

  cursor: "pointer",

  fontWeight: "bold"

}

const authBtnOutline = {

  background: "transparent",

  color: "white",

  border: "1px solid red",

  padding: "10px 18px",

  borderRadius: "10px",

  cursor: "pointer",

  fontWeight: "bold"

}

const sidebar = {

  position: "fixed",

  top: "65px",

  left: "-260px",

  width: "250px",

  height: "100vh",

  background: "#111",

  borderRight: "2px solid red",

  transition: ".3s",

  display: "flex",

  flexDirection: "column",

  padding: "20px",

  gap: "12px",

  zIndex: 9999

}

const closeBtn = {

  background: "transparent",

  border: "none",

  color: "red",

  fontSize: "24px",

  cursor: "pointer",

  alignSelf: "flex-end"

}

const linkBtn = {

  background: "#1a1a1a",

  border: "1px solid #333",

  color: "white",

  padding: "15px",

  borderRadius: "10px",

  cursor: "pointer",

  textAlign: "left",

  fontWeight: "bold",

  fontSize: "15px"

}

const logoutBtn = {

  background: "#2b0000",

  border: "1px solid red",

  color: "red",

  padding: "15px",

  borderRadius: "10px",

  cursor: "pointer",

  textAlign: "left",

  fontWeight: "bold",

  marginTop: "auto"

}

const overlay = {

  position: "fixed",

  top: 0,

  left: 0,

  right: 0,

  bottom: 0,

  background: "rgba(0,0,0,.55)",

  zIndex: 9998

}

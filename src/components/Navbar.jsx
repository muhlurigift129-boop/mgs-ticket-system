import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { auth } from "../firebase/config"
import { signOut } from "firebase/auth"

export default function Navbar() {

  const navigate = useNavigate()

  const [open, setOpen] =
    useState(false)

  const user =
    auth.currentUser

  async function logout() {

    try {

      await signOut(auth)

      navigate("/")

    } catch (error) {

      console.log(error)

    }

  }

  return (

    <>
      <div
        style={{
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
          zIndex: 9999
        }}
      >

        {/* LEFT MENU */}

        <button
          onClick={() =>
            setOpen(!open)
          }
          style={{
            background: "transparent",
            border: "none",
            color: "white",
            fontSize: "28px",
            cursor: "pointer"
          }}
        >
          ☰
        </button>

        {/* LOGO */}

        <h2
          style={{
            color: "red",
            margin: 0
          }}
        >
          MGS
        </h2>

        {/* RIGHT */}

        {user ? (

          <button
            onClick={logout}
            style={{
              background: "red",
              border: "none",
              color: "white",
              padding: "10px 20px",
              borderRadius: "10px",
              cursor: "pointer"
            }}
          >
            Logout
          </button>

        ) : (

          <div>

            <button
              onClick={() =>
                navigate("/login")
              }
              style={{
                background: "transparent",
                color: "white",
                border: "1px solid red",
                padding: "10px 15px",
                borderRadius: "10px",
                marginRight: "10px",
                cursor: "pointer"
              }}
            >
              Login
            </button>

            <button
              onClick={() =>
                navigate("/login")
              }
              style={{
                background: "red",
                color: "white",
                border: "none",
                padding: "10px 15px",
                borderRadius: "10px",
                cursor: "pointer"
              }}
            >
              Register
            </button>

          </div>

        )}

      </div>

      {/* SIDEBAR */}

      {open && (

        <div
          style={{
            position: "fixed",
            top: "70px",
            left: 0,
            width: "250px",
            height: "100%",
            background: "#111",
            borderRight: "2px solid red",
            padding: "20px",
            zIndex: 9998
          }}
        >

          <Link
            to="/"
            style={linkStyle}
          >
            Home
          </Link>

          {user && (

            <>
              <Link
                to="/my-account"
                style={linkStyle}
              >
                My Account
              </Link>

              <Link
                to="/orders"
                style={linkStyle}
              >
                Orders
              </Link>
            </>

          )}

          <Link
            to="/contact"
            style={linkStyle}
          >
            Contact Us
          </Link>

        </div>

      )}
    </>
  )
}

const linkStyle = {

  display: "block",

  color: "white",

  textDecoration: "none",

  padding: "15px 0",

  borderBottom:
    "1px solid #222"
}

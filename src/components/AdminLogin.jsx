import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function AdminLogin() {

  const navigate = useNavigate()

  const [password, setPassword] = useState("")

  useEffect(() => {
    if (localStorage.getItem("mgs_admin") === "true") {
      navigate("/admin")
    }
  }, [navigate])

  function login(e) {

    e.preventDefault()

    if (!password.trim()) {
      alert("Enter password")
      return
    }

    if (password === "MGS2026") {

      localStorage.setItem(
        "mgs_admin",
        "true"
      )

      navigate("/admin")

    } else {

      alert("Wrong Password")

    }
  }

  return (

    <div
      style={{
        minHeight: "100vh",
        background: "black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >

      <form
        onSubmit={login}
        style={{
          background: "#111",
          padding: "40px",
          borderRadius: "20px",
          width: "350px",
          boxShadow: "0 0 25px rgba(255,0,0,0.5)"
        }}
      >

        <h1
          style={{
            color: "red",
            textAlign: "center",
            marginBottom: "25px"
          }}
        >
          MGS ADMIN
        </h1>

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          style={{
            width: "100%",
            padding: "15px",
            borderRadius: "10px",
            border: "1px solid #333",
            background: "#1a1a1a",
            color: "white",
            marginBottom: "20px",
            boxSizing: "border-box"
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "15px",
            background: "red",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          LOGIN
        </button>

      </form>

    </div>

  )
}
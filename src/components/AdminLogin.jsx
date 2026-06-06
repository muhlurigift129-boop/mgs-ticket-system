import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function AdminLogin() {

  const navigate = useNavigate()

  const [password,setPassword] =
    useState("")

  function login() {

    if(password === "MGS2026") {

      localStorage.setItem(
        "mgs_admin",
        "true"
      )

      navigate("/admin")
    }
    else {
      alert("Wrong Password")
    }
  }

  return (
    <div>

      <input
        type="password"
        onChange={(e)=>
          setPassword(
            e.target.value
          )
        }
      />

      <button onClick={login}>
        Login
      </button>

    </div>
  )
}
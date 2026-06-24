import { useState } from "react"
import { useNavigate }
from "react-router-dom"

import {
  loginUser
}
from "../firebase/auth"

export default function Login() {

  const navigate =
    useNavigate()

  const [email,setEmail] =
    useState("")

  const [password,setPassword] =
    useState("")

  async function handleLogin(e){

    e.preventDefault()

    try {

      await loginUser(
        email,
        password
      )

      navigate("/account")

    }

    catch(error){

      alert(error.message)

    }

  }

  return (

    <div className="page">

      <h1>LOGIN</h1>

      <form onSubmit={handleLogin}>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>
            setPassword(e.target.value)
          }
        />

        <button>
          LOGIN
        </button>

      </form>

    </div>

  )

}

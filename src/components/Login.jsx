import { useState } from "react"
import { useNavigate } from "react-router-dom"

import {
  signInWithEmailAndPassword
} from "firebase/auth"

import { auth }
from "../firebase/config"

export default function Login() {

  const navigate =
    useNavigate()

  const [email,setEmail] =
    useState("")

  const [password,setPassword] =
    useState("")

  const [error,setError] =
    useState("")

  const [loading,setLoading] =
    useState(false)

  async function handleLogin(e){

    e.preventDefault()

    setLoading(true)
    setError("")

    try{

      await signInWithEmailAndPassword(

        auth,
        email,
        password

      )

      navigate("/my-account")

    }

    catch(error){

      setError(
        "Invalid email or password"
      )

    }

    setLoading(false)

  }

  return(

    <div style={container}>

      <div style={card}>

        <h1
          style={{
            color:"red",
            textAlign:"center"
          }}
        >
          MGS LOGIN
        </h1>

        <p
          style={{
            color:"#999",
            textAlign:"center"
          }}
        >
          Access your tickets and orders
        </p>

        {error && (

          <div
            style={{
              background:"red",
              color:"white",
              padding:"12px",
              borderRadius:"10px",
              marginBottom:"15px"
            }}
          >
            {error}
          </div>

        )}

        <form
          onSubmit={handleLogin}
        >

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e)=>
              setEmail(e.target.value)
            }
            required
            style={input}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>
              setPassword(e.target.value)
            }
            required
            style={input}
          />

          <button
            type="submit"
            style={button}
          >

            {
              loading
              ? "LOGGING IN..."
              : "LOGIN"
            }

          </button>

        </form>

        <button
          onClick={() =>
            navigate("/register-account")
          }
          style={{
            ...button,
            marginTop:"15px",
            background:"#222",
            border:"1px solid red"
          }}
        >
          CREATE ACCOUNT
        </button>

      </div>

    </div>

  )

}

const container = {

  minHeight:"100vh",
  background:"#000",
  display:"flex",
  justifyContent:"center",
  alignItems:"center"

}

const card = {

  width:"450px",
  background:"#111",
  padding:"40px",
  borderRadius:"20px",
  boxShadow:
    "0 0 30px rgba(255,0,0,.5)"

}

const input = {

  width:"100%",
  padding:"15px",
  marginBottom:"15px",
  background:"#1a1a1a",
  color:"white",
  border:"1px solid #333",
  borderRadius:"10px",
  boxSizing:"border-box"

}

const button = {

  width:"100%",
  padding:"15px",
  background:"red",
  color:"white",
  border:"none",
  borderRadius:"10px",
  cursor:"pointer",
  fontWeight:"bold"

}

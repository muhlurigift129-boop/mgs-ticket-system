import { useState, useEffect } from "react"
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

  useEffect(() => {

    if (auth.currentUser) {

      const selectedTicket =
        localStorage.getItem("selectedTicket")

      if (selectedTicket) {

        navigate("/register")

      } else {

        navigate("/my-account")

      }

    }

  }, [navigate])

  async function handleLogin(e){

    e.preventDefault()

    setLoading(true)

    setError("")

    try{

      await signInWithEmailAndPassword(auth, email, password)

      navigate("/my-account")

    }

    catch(error){

      console.log(error)

      if(
        error.code ===
        "auth/user-not-found"
      ){

        setError(
          "Account not found."
        )

      }

      else if(
        error.code ===
        "auth/wrong-password"
      ){

        setError(
          "Incorrect password."
        )

      }

      else{

        setError(
          "Invalid email or password."
        )

      }

    }

    setLoading(false)

  }

  return(

    <div style={container}>

      <div style={card}>

        <h1 style={title}>
          MGS LOGIN
        </h1>

        <p style={subtitle}>
          Access your tickets,
          orders and account.
        </p>

        {error && (

          <div style={errorBox}>
            {error}
          </div>

        )}

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e)=>
              setEmail(
                e.target.value
              )
            }
            required
            style={{
              ...input,
              border:error
                ? "1px solid red"
                : "1px solid #333"
            }}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>
              setPassword(
                e.target.value
              )
            }
            required
            style={{
              ...input,
              border:error
                ? "1px solid red"
                : "1px solid #333"
            }}
          />

          <button
            disabled={loading}
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
            navigate(
              "/register-account"
            )
          }
          style={registerButton}
        >
          CREATE ACCOUNT
        </button>

      </div>

    </div>

  )

}

const container = {

  minHeight:"100vh",

  background:
    "linear-gradient(to bottom,#000,#111)",

  display:"flex",

  justifyContent:"center",

  alignItems:"center",

  padding:"20px"
}

const card = {

  width:"450px",

  background:"#111",

  padding:"40px",

  borderRadius:"20px",

  boxShadow:
    "0 0 30px rgba(255,0,0,.4)"
}

const title = {

  textAlign:"center",

  color:"red",

  marginBottom:"10px"
}

const subtitle = {

  textAlign:"center",

  color:"#999",

  marginBottom:"25px"
}

const errorBox = {

  background:"#4d0000",

  border:"1px solid red",

  color:"white",

  padding:"12px",

  borderRadius:"10px",

  marginBottom:"15px"
}

const input = {

  width:"100%",

  padding:"15px",

  marginBottom:"15px",

  background:"#1a1a1a",

  color:"white",

  borderRadius:"10px",

  boxSizing:"border-box",

  outline:"none"
}

const button = {

  width:"100%",

  padding:"15px",

  background:"red",

  color:"white",

  border:"none",

  borderRadius:"10px",

  cursor:"pointer",

  fontWeight:"bold",

  fontSize:"16px"
}

const registerButton = {

  width:"100%",

  padding:"15px",

  background:"#1a1a1a",

  color:"white",

  border:"1px solid red",

  borderRadius:"10px",

  cursor:"pointer",

  fontWeight:"bold",

  marginTop:"15px"
}

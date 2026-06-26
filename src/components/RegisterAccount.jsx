import { useState } from "react"
import { useNavigate } from "react-router-dom"

import {
  createUserWithEmailAndPassword
} from "firebase/auth"

import {
  doc,
  setDoc
} from "firebase/firestore"

import {
  auth,
  db
} from "../firebase/config"

export default function RegisterAccount() {

  const navigate = useNavigate()

  const [loading,setLoading] =
    useState(false)

  const [error,setError] =
    useState("")

  const [formData,setFormData] =
    useState({

      fullName:"",
      phone:"",
      email:"",
      password:"",
      confirmPassword:""

    })

  function handleChange(e){

    setFormData({

      ...formData,

      [e.target.name]:
      e.target.value

    })

  }

  async function handleSubmit(e){

    e.preventDefault()

    setError("")
    setLoading(true)

    try{

      if(
        formData.password.length < 6
      ){

        throw new Error(
          "Password must be at least 6 characters."
        )

      }

      if(
        formData.password !==
        formData.confirmPassword
      ){

        throw new Error(
          "Passwords do not match."
        )

      }

      const userCredential =

        await createUserWithEmailAndPassword(

          auth,
          formData.email,
          formData.password

        )

      await setDoc(

        doc(
          db,
          "users",
          userCredential.user.uid
        ),

        {

          uid:
            userCredential.user.uid,

          fullName:
            formData.fullName,

          phone:
            formData.phone,

          email:
            formData.email,

          createdAt:
            new Date()
            .toISOString()

        }

      )

      const selectedTicket =
        localStorage.getItem("selectedTicket")

      if (selectedTicket) {

         navigate("/register")

       } else {

         navigate("/my-account")

       }

    catch(error){

      setError(error.message)

    }

    setLoading(false)

  }

  return(

    <div style={container}>

      <div style={card}>

        <h1 style={title}>
          MGS REGISTER
        </h1>

        <p style={subtitle}>
          Create your account to
          buy tickets and track orders.
        </p>

        {error && (

          <div style={errorBox}>
            {error}
          </div>

        )}

        <form onSubmit={handleSubmit}>

          <input
            name="fullName"
            placeholder="Full Name"
            required
            style={{
              ...input,
              border:error
                ? "1px solid red"
                : "1px solid #333"
            }}
            onChange={handleChange}
          />

          <input
            name="phone"
            placeholder="Phone Number"
            required
            style={{
              ...input,
              border:error
                ? "1px solid red"
                : "1px solid #333"
            }}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            style={{
              ...input,
              border:error
                ? "1px solid red"
                : "1px solid #333"
            }}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            style={{
              ...input,
              border:error
                ? "1px solid red"
                : "1px solid #333"
            }}
            onChange={handleChange}
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            required
            style={{
              ...input,
              border:error
                ? "1px solid red"
                : "1px solid #333"
            }}
            onChange={handleChange}
          />

          <button
            type="submit"
            disabled={loading}
            style={button}
          >

            {
              loading
              ? "CREATING ACCOUNT..."
              : "REGISTER"
            }

          </button>

        </form>

        <button
          onClick={() =>
            navigate("/login")
          }
          style={loginButton}
        >
          ALREADY HAVE AN ACCOUNT?
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

  width:"500px",

  background:"#111",

  padding:"40px",

  borderRadius:"20px",

  boxShadow:
    "0 0 30px rgba(255,0,0,.5)"

}

const title = {

  color:"red",

  textAlign:"center",

  marginBottom:"10px"

}

const subtitle = {

  color:"#999",

  textAlign:"center",

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

  fontWeight:"bold"

}

const loginButton = {

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

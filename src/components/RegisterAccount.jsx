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
      password:""

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

    setLoading(true)
    setError("")

    try{

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

      navigate("/")

    }

    catch(error){

      setError(error.message)

    }

    setLoading(false)

  }

  return(

    <div
      style={container}
    >

      <div
        style={card}
      >

        <h1
          style={{
            color:"red",
            textAlign:"center"
          }}
        >
          MGS REGISTER
        </h1>

        {error && (

          <div
            style={{
              color:"white",
              background:"red",
              padding:"12px",
              borderRadius:"10px",
              marginBottom:"15px"
            }}
          >
            {error}
          </div>

        )}

        <form
          onSubmit={handleSubmit}
        >

          <input
            name="fullName"
            placeholder="Full Name"
            required
            style={input}
            onChange={handleChange}
          />

          <input
            name="phone"
            placeholder="Phone Number"
            required
            style={input}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            style={input}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            style={input}
            onChange={handleChange}
          />

          <button
            type="submit"
            style={button}
          >

            {
              loading
              ? "CREATING..."
              : "REGISTER"
            }

          </button>

        </form>

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

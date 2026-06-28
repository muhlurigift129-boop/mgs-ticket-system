import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import {
  signOut
} from "firebase/auth"

import {
  doc,
  getDoc
} from "firebase/firestore"

import {
  auth,
  db
} from "../firebase/config"

export default function MyAccount() {

  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)

  const [userData, setUserData] = useState(null)

  useEffect(() => {

    async function loadUser() {

      if (!auth.currentUser) {

        navigate("/login")

        return

      }

      try {

        const docRef = doc(
          db,
          "users",
          auth.currentUser.uid
        )

        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {

          setUserData(docSnap.data())

        }

      } catch (error) {

        console.log(error)

      }

      setLoading(false)

    }

    loadUser()

  }, [navigate])

  async function logout() {

    await signOut(auth)

    localStorage.removeItem("selectedTicket")

    navigate("/")

  }

  if (loading) {

    return (

      <div style={loadingStyle}>
        Loading Account...
      </div>

    )

  }

  return (

    <div style={container}>

      <div style={card}>

        <h1 style={title}>
          MY ACCOUNT
        </h1>

        <div style={infoBox}>

          <label style={label}>
            Full Name
          </label>

          <p style={value}>
            {userData?.fullName || "-"}
          </p>

        </div>

        <div style={infoBox}>

          <label style={label}>
            Email
          </label>

          <p style={value}>
            {userData?.email || "-"}
          </p>

        </div>

        <div style={infoBox}>

          <label style={label}>
            Phone Number
          </label>

          <p style={value}>
            {userData?.phone || "-"}
          </p>

        </div>

        <div style={infoBox}>

          <label style={label}>
            Account Created
          </label>

          <p style={value}>
            {userData?.createdAt
              ? new Date(userData.createdAt).toLocaleDateString()
              : "-"}
          </p>

        </div>

        <button
          style={logoutBtn}
          onClick={logout}
        >
          LOG OUT
        </button>

      </div>

    </div>

  )

}

const loadingStyle = {

  background: "#000",

  color: "white",

  height: "100vh",

  display: "flex",

  justifyContent: "center",

  alignItems: "center",

  fontSize: "22px"

}

const container = {

  minHeight: "100vh",

  background: "linear-gradient(#000,#111)",

  display: "flex",

  justifyContent: "center",

  alignItems: "center",

  padding: "30px"

}

const card = {

  width: "500px",

  background: "#111",

  border: "1px solid red",

  borderRadius: "20px",

  padding: "40px",

  color: "white",

  boxShadow: "0 0 25px rgba(255,0,0,.35)"

}

const title = {

  textAlign: "center",

  color: "red",

  marginBottom: "35px"

}

const infoBox = {

  marginBottom: "20px"

}

const label = {

  color: "#888",

  fontSize: "14px"

}

const value = {

  marginTop: "6px",

  fontSize: "18px",

  fontWeight: "bold"

}

const logoutBtn = {

  width: "100%",

  marginTop: "30px",

  padding: "15px",

  background: "red",

  color: "white",

  border: "none",

  borderRadius: "10px",

  cursor: "pointer",

  fontWeight: "bold",

  fontSize: "16px"

}

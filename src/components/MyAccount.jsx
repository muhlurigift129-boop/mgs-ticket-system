import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import {
  onAuthStateChanged,
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

  const [error, setError] = useState("")


  // ==========================================
  // LOAD LOGGED-IN USER
  // ==========================================

  useEffect(() => {

    let mounted = true

    const unsubscribe = onAuthStateChanged(
      auth,
      async (currentUser) => {

        if (!mounted) return


        // --------------------------------------
        // USER NOT LOGGED IN
        // --------------------------------------

        if (!currentUser) {

          setLoading(false)

          navigate("/login", {
            replace: true
          })

          return

        }


        // --------------------------------------
        // START LOADING
        // --------------------------------------

        try {

          setError("")


          // Firebase Authentication information
          const authData = {

            uid: currentUser.uid,

            email:
              currentUser.email || "",

            displayName:
              currentUser.displayName || "",

            photoURL:
              currentUser.photoURL || "",

            emailVerified:
              currentUser.emailVerified

          }


          // ------------------------------------
          // FIRESTORE USER DOCUMENT
          // ------------------------------------

          const userRef = doc(
            db,
            "users",
            currentUser.uid
          )

          const userSnapshot =
            await getDoc(userRef)


          if (!mounted) return


          if (userSnapshot.exists()) {

            setUserData({

              ...authData,

              ...userSnapshot.data()

            })

          } else {

            // --------------------------------
            // FALLBACK
            // If Firestore document doesn't
            // exist, still show Firebase Auth
            // information.
            // --------------------------------

            setUserData(authData)

          }


        } catch (error) {

          console.error(
            "MY ACCOUNT ERROR:",
            error
          )

          if (!mounted) return


          // Even if Firestore fails,
          // show Firebase Auth details.

          setUserData({

            uid: currentUser.uid,

            email:
              currentUser.email || "",

            displayName:
              currentUser.displayName || "",

            photoURL:
              currentUser.photoURL || "",

            emailVerified:
              currentUser.emailVerified

          })


          setError(
            "Some account information could not be loaded."
          )

        } finally {

          if (mounted) {

            setLoading(false)

          }

        }

      }
    )


    return () => {

      mounted = false

      unsubscribe()

    }

  }, [navigate])


  // ==========================================
  // LOGOUT
  // ==========================================

  async function logout() {

    try {

      await signOut(auth)

      // Keep selected ticket/order information
      // untouched unless you specifically want
      // it cleared.

      localStorage.removeItem(
        "selectedTicket"
      )

      localStorage.removeItem(
        "mgsCustomer"
      )

      localStorage.removeItem(
        "mgsOrderId"
      )

      navigate("/", {
        replace: true
      })

    } catch (error) {

      console.error(
        "LOGOUT ERROR:",
        error
      )

      alert(
        "Could not log out. Please try again."
      )

    }

  }


  // ==========================================
  // LOADING SCREEN
  // ==========================================

  if (loading) {

    return (

      <div style={loadingStyle}>

        <div>

          <div style={loadingSpinner}>
            MGS
          </div>

          <p style={loadingText}>
            LOADING ACCOUNT...
          </p>

        </div>

      </div>

    )

  }


  // ==========================================
  // ACCOUNT PAGE
  // ==========================================

  return (

    <div style={container}>

      <div style={card}>


        {/* ==================================
            HEADER
        ================================== */}

        <div style={header}>

          {userData?.photoURL ? (

            <img
              src={userData.photoURL}
              alt="Profile"
              style={profileImage}
            />

          ) : (

            <div style={profileCircle}>

              {(
                userData?.fullName ||
                userData?.displayName ||
                userData?.email ||
                "U"
              )
                .charAt(0)
                .toUpperCase()}

            </div>

          )}


          <h1 style={title}>
            MY ACCOUNT
          </h1>

          <p style={subtitle}>
            MGS EVENTS
          </p>

        </div>


        {/* ==================================
            ERROR
        ================================== */}

        {error && (

          <div style={warningBox}>

            ⚠ {error}

          </div>

        )}


        {/* ==================================
            ACCOUNT DETAILS
        ================================== */}

        <div style={sectionTitle}>
          ACCOUNT DETAILS
        </div>


        <div style={infoBox}>

          <label style={label}>
            FULL NAME
          </label>

          <p style={value}>

            {userData?.fullName ||
             userData?.displayName ||
             "Not provided"}

          </p>

        </div>


        <div style={infoBox}>

          <label style={label}>
            EMAIL ADDRESS
          </label>

          <p style={value}>

            {userData?.email ||
             "Not provided"}

          </p>

        </div>


        <div style={infoBox}>

          <label style={label}>
            PHONE NUMBER
          </label>

          <p style={value}>

            {userData?.phone ||
             userData?.phoneNumber ||
             "Not provided"}

          </p>

        </div>


        <div style={infoBox}>

          <label style={label}>
            USER ID
          </label>

          <p
            style={{
              ...value,
              fontSize: "13px",
              color: "#aaa",
              wordBreak: "break-all"
            }}
          >

            {userData?.uid || "-"}

          </p>

        </div>


        <div style={infoBox}>

          <label style={label}>
            EMAIL VERIFICATION
          </label>

          <p
            style={{
              ...value,
              color:
                userData?.emailVerified
                  ? "#00ff88"
                  : "#ff4444"
            }}
          >

            {userData?.emailVerified
              ? "✓ VERIFIED"
              : "✕ NOT VERIFIED"}

          </p>

        </div>


        <div style={infoBox}>

          <label style={label}>
            ACCOUNT CREATED
          </label>

          <p style={value}>

            {formatDate(
              userData?.createdAt
            )}

          </p>

        </div>


        {/* ==================================
            ACCOUNT ACTIONS
        ================================== */}

        <div style={actions}>

          <button
            style={ordersBtn}
            onClick={() =>
              navigate("/orders")
            }
          >
            MY ORDERS
          </button>


          <button
            style={contactBtn}
            onClick={() =>
              navigate("/contact")
            }
          >
            CONTACT SUPPORT
          </button>


          <button
            style={logoutBtn}
            onClick={logout}
          >
            LOG OUT
          </button>

        </div>


      </div>

    </div>

  )

}


// ==========================================
// DATE FORMATTER
// ==========================================

function formatDate(dateValue) {

  if (!dateValue) {

    return "Not available"

  }


  try {

    // Firestore Timestamp
    if (
      typeof dateValue === "object" &&
      typeof dateValue.toDate === "function"
    ) {

      return dateValue
        .toDate()
        .toLocaleDateString(
          "en-ZA",
          {
            day: "2-digit",
            month: "long",
            year: "numeric"
          }
        )

    }


    // ISO string
    return new Date(
      dateValue
    ).toLocaleDateString(
      "en-ZA",
      {
        day: "2-digit",
        month: "long",
        year: "numeric"
      }
    )

  } catch {

    return "Not available"

  }

}


// ==========================================
// LOADING
// ==========================================

const loadingStyle = {

  minHeight: "100vh",

  background:
    "linear-gradient(#000,#111)",

  color: "white",

  display: "flex",

  justifyContent: "center",

  alignItems: "center",

  textAlign: "center"

}


const loadingSpinner = {

  width: "70px",

  height: "70px",

  borderRadius: "50%",

  border: "3px solid #222",

  borderTop: "3px solid red",

  display: "flex",

  justifyContent: "center",

  alignItems: "center",

  margin: "0 auto",

  color: "red",

  fontWeight: "900",

  fontSize: "20px"

}


const loadingText = {

  color: "#aaa",

  marginTop: "20px",

  letterSpacing: "2px"

}


// ==========================================
// CONTAINER
// ==========================================

const container = {

  minHeight: "100vh",

  background:
    "linear-gradient(180deg,#000,#080808,#111)",

  display: "flex",

  justifyContent: "center",

  alignItems: "flex-start",

  padding: "100px 20px 50px",

  boxSizing: "border-box",

  color: "white"

}


// ==========================================
// CARD
// ==========================================

const card = {

  width: "100%",

  maxWidth: "550px",

  background:
    "linear-gradient(145deg,#151515,#0b0b0b)",

  border: "1px solid #333",

  borderRadius: "25px",

  padding: "40px",

  boxSizing: "border-box",

  boxShadow:
    "0 0 35px rgba(255,0,0,.25)"

}


// ==========================================
// HEADER
// ==========================================

const header = {

  textAlign: "center",

  marginBottom: "35px"

}


const profileCircle = {

  width: "90px",

  height: "90px",

  borderRadius: "50%",

  background: "red",

  color: "white",

  display: "flex",

  justifyContent: "center",

  alignItems: "center",

  margin: "0 auto 20px",

  fontSize: "38px",

  fontWeight: "900",

  boxShadow:
    "0 0 25px rgba(255,0,0,.35)"

}


const profileImage = {

  width: "90px",

  height: "90px",

  borderRadius: "50%",

  objectFit: "cover",

  display: "block",

  margin: "0 auto 20px",

  border: "3px solid red"

}


const title = {

  textAlign: "center",

  color: "red",

  margin: "0",

  fontSize: "32px",

  fontWeight: "900"

}


const subtitle = {

  textAlign: "center",

  color: "#777",

  marginTop: "8px",

  letterSpacing: "2px"

}


// ==========================================
// SECTION
// ==========================================

const sectionTitle = {

  color: "red",

  fontSize: "13px",

  fontWeight: "bold",

  letterSpacing: "2px",

  marginBottom: "15px"

}


// ==========================================
// INFO
// ==========================================

const infoBox = {

  background: "#0d0d0d",

  border: "1px solid #252525",

  borderRadius: "12px",

  padding: "16px",

  marginBottom: "12px"

}


const label = {

  color: "#777",

  fontSize: "11px",

  fontWeight: "bold",

  letterSpacing: "1px"

}


const value = {

  color: "white",

  margin: "7px 0 0",

  fontSize: "17px",

  fontWeight: "bold"

}


// ==========================================
// WARNING
// ==========================================

const warningBox = {

  background: "#351000",

  border: "1px solid #ff6600",

  color: "#ffb080",

  padding: "12px",

  borderRadius: "10px",

  marginBottom: "20px",

  fontSize: "13px"

}


// ==========================================
// ACTIONS
// ==========================================

const actions = {

  marginTop: "30px",

  display: "flex",

  flexDirection: "column",

  gap: "12px"

}


const ordersBtn = {

  width: "100%",

  padding: "15px",

  background: "red",

  color: "white",

  border: "none",

  borderRadius: "10px",

  cursor: "pointer",

  fontWeight: "bold",

  fontSize: "15px"

}


const contactBtn = {

  width: "100%",

  padding: "15px",

  background: "#1a1a1a",

  color: "white",

  border: "1px solid #444",

  borderRadius: "10px",

  cursor: "pointer",

  fontWeight: "bold",

  fontSize: "15px"

}


const logoutBtn = {

  width: "100%",

  padding: "15px",

  background: "#1a1a1a",

  color: "#ff4444",

  border: "1px solid #ff4444",

  borderRadius: "10px",

  cursor: "pointer",

  fontWeight: "bold",

  fontSize: "15px"

}
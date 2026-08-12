import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import {
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "firebase/auth"

import { auth } from "../firebase/config"


export default function Login() {

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [error, setError] = useState("")

  const [loading, setLoading] = useState(false)

  const [checkingAuth, setCheckingAuth] = useState(true)


  // ==========================================
  // CHECK FIREBASE LOGIN STATUS
  // ==========================================

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {

        // Firebase is still checking
        // Don't redirect yet.
        if (currentUser) {

          const selectedTicket =
            localStorage.getItem("selectedTicket")

          // ==================================
          // USER LOGGED IN + BUYING TICKET
          // ==================================

          if (selectedTicket) {

            navigate(
              "/register",
              { replace: true }
            )

            return
          }


          // ==================================
          // USER LOGGED IN + NO TICKET
          // ==================================

          navigate(
            "/my-account",
            { replace: true }
          )

          return
        }


        // No user
        setCheckingAuth(false)

      }
    )


    return () => unsubscribe()

  }, [navigate])


  // ==========================================
  // LOGIN
  // ==========================================

  async function handleLogin(e) {

    e.preventDefault()

    if (loading) {
      return
    }


    setLoading(true)
    setError("")


    try {

      // ======================================
      // FIREBASE LOGIN
      // ======================================

      const userCredential =
        await signInWithEmailAndPassword(
          auth,
          email.trim(),
          password
        )


      const user =
        userCredential.user


      console.log(
        "MGS LOGIN SUCCESS:",
        user.email
      )


      // ======================================
      // CHECK SELECTED TICKET
      // ======================================

      const selectedTicket =
        localStorage.getItem(
          "selectedTicket"
        )


      // ======================================
      // BUYING A TICKET
      // ======================================

      if (selectedTicket) {

        console.log(
          "Ticket selected - continuing to Register Ticket"
        )


        /*
         IMPORTANT:

         DO NOT GO TO /payment HERE.

         Register.jsx must first:
         1. Collect customer details
         2. Create Firestore order
         3. Save mgsCustomer
         4. Save mgsOrderId
         5. Then go to /payment
        */

        navigate(
          "/register",
          { replace: true }
        )

        return
      }


      // ======================================
      // NORMAL LOGIN
      // ======================================

      navigate(
        "/my-account",
        { replace: true }
      )


    } catch (error) {

      console.error(
        "MGS LOGIN ERROR:",
        error
      )


      // ======================================
      // FIREBASE ERROR MESSAGES
      // ======================================

      switch (error.code) {

        case "auth/user-not-found":

          setError(
            "Account not found. Please create an account first."
          )

          break


        case "auth/wrong-password":

          setError(
            "Incorrect password."
          )

          break


        case "auth/invalid-credential":

          setError(
            "Incorrect email or password."
          )

          break


        case "auth/invalid-email":

          setError(
            "Please enter a valid email address."
          )

          break


        case "auth/user-disabled":

          setError(
            "This account has been disabled."
          )

          break


        case "auth/too-many-requests":

          setError(
            "Too many login attempts. Please try again later."
          )

          break


        case "auth/network-request-failed":

          setError(
            "Network error. Please check your internet connection."
          )

          break


        default:

          setError(
            error.message ||
            "Unable to login. Please try again."
          )

      }

    } finally {

      setLoading(false)

    }

  }


  // ==========================================
  // CREATE ACCOUNT
  // ==========================================

  function createAccount() {

    /*
      selectedTicket remains in localStorage.

      Therefore:

      Home
        ↓
      BUY NOW
        ↓
      Login
        ↓
      CREATE ACCOUNT
        ↓
      RegisterAccount
        ↓
      Register Ticket
    */

    navigate(
      "/register-account"
    )

  }


  // ==========================================
  // LOADING AUTH CHECK
  // ==========================================

  if (checkingAuth) {

    return (

      <div style={loadingPage}>

        <div style={loadingCard}>

          <div style={spinner}></div>

          <h2>
            MGS EVENTS
          </h2>

          <p>
            CHECKING ACCOUNT...
          </p>

        </div>

      </div>

    )

  }


  // ==========================================
  // LOGIN PAGE
  // ==========================================

  return (

    <div style={container}>

      <div style={card}>

        {/* ==================================
            TITLE
        ================================== */}

        <h1 style={title}>
          MGS LOGIN
        </h1>


        <p style={subtitle}>

          Access your tickets,
          orders and account.

        </p>


        {/* ==================================
            PURCHASE MESSAGE
        ================================== */}

        {localStorage.getItem(
          "selectedTicket"
        ) && (

          <div style={purchaseBox}>

            <strong>
              🎟 TICKET PURCHASE
            </strong>

            <p>
              Login to continue with
              your MGS Event ticket.
            </p>

          </div>

        )}


        {/* ==================================
            ERROR
        ================================== */}

        {error && (

          <div style={errorBox}>

            {error}

          </div>

        )}


        {/* ==================================
            LOGIN FORM
        ================================== */}

        <form
          onSubmit={handleLogin}
        >

          {/* EMAIL */}

          <label style={label}>
            EMAIL ADDRESS
          </label>

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => {

              setEmail(
                e.target.value
              )

              setError("")

            }}
            required
            autoComplete="email"
            style={{
              ...input,
              border:
                error
                  ? "1px solid red"
                  : "1px solid #333"
            }}
          />


          {/* PASSWORD */}

          <label style={label}>
            PASSWORD
          </label>

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {

              setPassword(
                e.target.value
              )

              setError("")

            }}
            required
            autoComplete="current-password"
            style={{
              ...input,
              border:
                error
                  ? "1px solid red"
                  : "1px solid #333"
            }}
          />


          {/* LOGIN BUTTON */}

          <button
            type="submit"
            disabled={loading}
            style={{
              ...button,
              opacity:
                loading ? 0.7 : 1,
              cursor:
                loading
                  ? "not-allowed"
                  : "pointer"
            }}
          >

            {loading
              ? "LOGGING IN..."
              : "LOGIN"
            }

          </button>

        </form>


        {/* ==================================
            CREATE ACCOUNT
        ================================== */}

        <div style={divider}>

          <span>
            OR
          </span>

        </div>


        <button
          type="button"
          onClick={createAccount}
          disabled={loading}
          style={registerButton}
        >

          CREATE ACCOUNT

        </button>


        {/* ==================================
            BACK HOME
        ================================== */}

        <button
          type="button"
          onClick={() =>
            navigate("/")
          }
          style={homeButton}
        >

          ← BACK TO HOME

        </button>


        {/* ==================================
            FLOW INFORMATION
        ================================== */}

        {localStorage.getItem(
          "selectedTicket"
        ) && (

          <div style={flowBox}>

            <p>
              <span style={activeStep}>
                1. Login
              </span>
            </p>

            <p>
              2. Register Ticket
            </p>

            <p>
              3. Payment
            </p>

            <p>
              4. PayFast
            </p>

            <p>
              5. Orders
            </p>

          </div>

        )}

      </div>

    </div>

  )

}


// ==========================================
// LOADING PAGE
// ==========================================

const loadingPage = {

  minHeight: "100vh",

  background:
    "linear-gradient(to bottom,#000,#111)",

  display: "flex",

  justifyContent: "center",

  alignItems: "center",

  color: "white"

}


const loadingCard = {

  textAlign: "center"

}


const spinner = {

  width: "45px",

  height: "45px",

  border:
    "4px solid #222",

  borderTop:
    "4px solid red",

  borderRadius: "50%",

  margin:
    "0 auto 20px",

  animation:
    "mgsSpin 1s linear infinite"

}


// ==========================================
// MAIN CONTAINER
// ==========================================

const container = {

  minHeight: "100vh",

  background:
    "linear-gradient(to bottom,#000,#111)",

  display: "flex",

  justifyContent: "center",

  alignItems: "center",

  padding: "30px 20px",

  boxSizing: "border-box",

  color: "white"

}


// ==========================================
// CARD
// ==========================================

const card = {

  width: "100%",

  maxWidth: "450px",

  background: "#111",

  padding: "40px",

  borderRadius: "20px",

  boxShadow:
    "0 0 30px rgba(255,0,0,.4)",

  boxSizing: "border-box"

}


// ==========================================
// TITLE
// ==========================================

const title = {

  textAlign: "center",

  color: "red",

  marginBottom: "10px",

  fontSize: "36px",

  fontWeight: "900",

  letterSpacing: "2px"

}


// ==========================================
// SUBTITLE
// ==========================================

const subtitle = {

  textAlign: "center",

  color: "#999",

  marginBottom: "25px",

  lineHeight: "1.5"

}


// ==========================================
// PURCHASE BOX
// ==========================================

const purchaseBox = {

  background:
    "rgba(255,0,0,.08)",

  border:
    "1px solid red",

  color: "white",

  padding: "15px",

  borderRadius: "10px",

  marginBottom: "20px",

  textAlign: "center",

  fontSize: "14px"

}


// ==========================================
// ERROR
// ==========================================

const errorBox = {

  background: "#4d0000",

  border: "1px solid red",

  color: "white",

  padding: "12px",

  borderRadius: "10px",

  marginBottom: "15px",

  lineHeight: "1.5"

}


// ==========================================
// LABEL
// ==========================================

const label = {

  display: "block",

  color: "#aaa",

  fontSize: "12px",

  fontWeight: "bold",

  marginBottom: "7px",

  letterSpacing: "1px"

}


// ==========================================
// INPUT
// ==========================================

const input = {

  width: "100%",

  padding: "15px",

  marginBottom: "18px",

  background: "#1a1a1a",

  color: "white",

  borderRadius: "10px",

  boxSizing: "border-box",

  outline: "none",

  fontSize: "16px"

}


// ==========================================
// LOGIN BUTTON
// ==========================================

const button = {

  width: "100%",

  padding: "16px",

  background: "red",

  color: "white",

  border: "none",

  borderRadius: "10px",

  fontWeight: "bold",

  fontSize: "16px",

  letterSpacing: "1px"

}


// ==========================================
// DIVIDER
// ==========================================

const divider = {

  display: "flex",

  alignItems: "center",

  justifyContent: "center",

  color: "#555",

  margin: "25px 0",

  fontSize: "12px",

  fontWeight: "bold"

}


// ==========================================
// REGISTER BUTTON
// ==========================================

const registerButton = {

  width: "100%",

  padding: "15px",

  background: "#1a1a1a",

  color: "white",

  border: "1px solid red",

  borderRadius: "10px",

  cursor: "pointer",

  fontWeight: "bold",

  fontSize: "15px"

}


// ==========================================
// HOME BUTTON
// ==========================================

const homeButton = {

  width: "100%",

  padding: "12px",

  marginTop: "12px",

  background: "transparent",

  color: "#888",

  border: "1px solid #333",

  borderRadius: "10px",

  cursor: "pointer"

}


// ==========================================
// FLOW BOX
// ==========================================

const flowBox = {

  marginTop: "25px",

  padding: "15px",

  background: "#0a0a0a",

  border:
    "1px solid #292929",

  borderRadius: "12px",

  color: "#666",

  fontSize: "12px",

  textAlign: "left",

  lineHeight: "1.3"

}


const activeStep = {

  color: "red",

  fontWeight: "bold"

}
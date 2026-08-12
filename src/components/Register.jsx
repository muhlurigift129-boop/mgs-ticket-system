import { useEffect, useState } from "react"
import { auth, db } from "../firebase/config"
import { useNavigate } from "react-router-dom"

import { addDoc, collection } from "firebase/firestore"

export default function Register() {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    delivery: "email",
    ticketType: "full",
    quantity: 1
  })

  const [loading, setLoading] = useState(false)

  const [selectedTicket, setSelectedTicket] = useState(null)

  // =========================
  // CHECK LOGIN
  // =========================

  useEffect(() => {

    if (!auth.currentUser) {
      navigate("/login")
      return
    }

    const savedTicket =
      JSON.parse(
        localStorage.getItem("selectedTicket")
      )

    if (savedTicket) {

      setSelectedTicket(savedTicket)

      setFormData(prev => ({
        ...prev,
        ticketType: savedTicket.type || "full"
      }))

    }

    // Automatically use Firebase account email
    if (auth.currentUser.email) {

      setFormData(prev => ({
        ...prev,
        email: auth.currentUser.email
      }))

    }

  }, [navigate])


  // =========================
  // TICKET PRICES
  // =========================

  const prices = {

    full: 420,

    vibe: 420,

    vibeDrinks: 420,

    vibeFood: 420

  }


  // =========================
  // TICKET NAMES
  // =========================

  const ticketNames = {

    full: "MGS EVENT TICKET",

    vibe: "MGS EVENT TICKET",

    vibeDrinks: "MGS EVENT TICKET",

    vibeFood: "MGS EVENT TICKET"

  }


  // =========================
  // SELECTED PRICE
  // =========================

  const price =
    prices[formData.ticketType] || 420


  const total =
    price * Number(formData.quantity)


  // =========================
  // HANDLE INPUT
  // =========================

  function handleChange(e) {

    const {
      name,
      value
    } = e.target

    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

  }


  // =========================
  // SUBMIT ORDER
  // =========================

  async function handleSubmit(e) {

    e.preventDefault()

    if (!auth.currentUser) {

      alert(
        "Your login session has expired. Please login again."
      )

      navigate("/login")

      return
    }


    if (Number(formData.quantity) < 1) {

      alert("Quantity must be at least 1.")

      return

    }


    setLoading(true)


    try {

      const user =
        auth.currentUser


      // =========================
      // CREATE ORDER
      // =========================

      const order = {

        userId:
          user.uid,

        fullName:
          formData.fullName,

        email:
          formData.email || user.email,

        phone:
          formData.phone,

        delivery:
          formData.delivery,

        ticketType:
          formData.ticketType,

        ticketName:
          ticketNames[formData.ticketType],

        packageName:
          ticketNames[formData.ticketType],

        quantity:
          Number(formData.quantity),

        price:
          price,

        total:
          total,

        status:
          "pending",

        paymentStatus:
          "unpaid",

        createdAt:
          new Date().toISOString()

      }


      // =========================
      // SAVE ORDER TO FIRESTORE
      // =========================

      const orderRef =
        await addDoc(
          collection(db, "tickets"),
          order
        )


      console.log(
        "ORDER CREATED:",
        orderRef.id
      )


      // =========================
      // SAVE ORDER FOR PAYMENT
      // =========================

      const paymentOrder = {

        ...order,

        orderId:
          orderRef.id

      }


      localStorage.setItem(
        "mgsCustomer",
        JSON.stringify(paymentOrder)
      )


      // =========================
      // SAVE USER ORDER LOCALLY
      // =========================

      localStorage.setItem(
        "mgsOrderId",
        orderRef.id
      )


      // =========================
      // REMOVE SELECTED TICKET
      // =========================

      localStorage.removeItem(
        "selectedTicket"
      )


      // =========================
      // GO TO PAYMENT
      // =========================

      navigate("/payment")


    } catch (error) {

      console.error(
        "ORDER ERROR:",
        error
      )

      alert(
        "Could not create your order.\n\n" +
        error.message
      )

    } finally {

      setLoading(false)

    }

  }


  // =========================
  // PAGE
  // =========================

  return (

    <div
      style={container}
    >

      <div
        style={card}
      >

        <h1
          style={title}
        >
          MGS EVENT
        </h1>


        <p
          style={subtitle}
        >
          COMPLETE YOUR TICKET ORDER
        </p>


        {selectedTicket && (

          <div
            style={selectedBox}
          >

            <p>
              SELECTED TICKET
            </p>

            <h2>
              MGS EVENT TICKET
            </h2>

            <h1>
              R420
            </h1>

          </div>

        )}


        <form
          onSubmit={handleSubmit}
        >

          {/* FULL NAME */}

          <input

            type="text"

            name="fullName"

            placeholder="Full Name"

            required

            value={
              formData.fullName
            }

            onChange={
              handleChange
            }

            style={inputStyle}

          />


          {/* EMAIL */}

          <input

            type="email"

            name="email"

            placeholder="Email Address"

            required

            value={
              formData.email
            }

            onChange={
              handleChange
            }

            style={inputStyle}

          />


          {/* PHONE */}

          <input

            type="tel"

            name="phone"

            placeholder="WhatsApp / Phone Number"

            required

            value={
              formData.phone
            }

            onChange={
              handleChange
            }

            style={inputStyle}

          />


          {/* TICKET */}

          <select

            name="ticketType"

            value={
              formData.ticketType
            }

            onChange={
              handleChange
            }

            style={inputStyle}

          >

            <option value="full">
              MGS EVENT TICKET — R420
            </option>

            <option value="vibe">
              MGS EVENT TICKET — R420
            </option>

            <option value="vibeDrinks">
              MGS EVENT TICKET — R420
            </option>

            <option value="vibeFood">
              MGS EVENT TICKET — R420
            </option>

          </select>


          {/* QUANTITY */}

          <input

            type="number"

            name="quantity"

            min="1"

            max="20"

            value={
              formData.quantity
            }

            onChange={
              handleChange
            }

            style={inputStyle}

          />


          {/* DELIVERY */}

          <select

            name="delivery"

            value={
              formData.delivery
            }

            onChange={
              handleChange
            }

            style={inputStyle}

          >

            <option value="email">
              Email Ticket
            </option>

            <option value="whatsapp">
              WhatsApp Ticket
            </option>

          </select>


          {/* ORDER SUMMARY */}

          <div
            style={summary}
          >

            <h2
              style={{
                color: "red"
              }}
            >
              ORDER SUMMARY
            </h2>


            <p>
              Ticket:
              {" "}
              MGS EVENT TICKET
            </p>


            <p>
              Price:
              {" "}
              R420
            </p>


            <p>
              Quantity:
              {" "}
              {formData.quantity}
            </p>


            <hr
              style={{
                borderColor: "#333"
              }}
            />


            <h1
              style={{
                color: "red",
                textAlign: "center"
              }}
            >
              TOTAL: R{total}
            </h1>

          </div>


          {/* PAY BUTTON */}

          <button

            type="submit"

            disabled={loading}

            style={{
              ...button,
              opacity:
                loading ? 0.6 : 1
            }}

          >

            {loading
              ? "CREATING ORDER..."
              : "CREATE ORDER & PAY"
            }

          </button>

        </form>


        <button

          onClick={() =>
            navigate("/")
          }

          style={backButton}

        >

          ← BACK TO HOME

        </button>

      </div>

    </div>

  )

}


// ======================================
// STYLES
// ======================================

const container = {

  minHeight: "100vh",

  background:
    "linear-gradient(to bottom,#000,#111)",

  display: "flex",

  justifyContent: "center",

  alignItems: "center",

  padding: "100px 20px",

  boxSizing: "border-box"

}


const card = {

  width: "100%",

  maxWidth: "550px",

  background: "#111",

  padding: "40px",

  borderRadius: "25px",

  boxShadow:
    "0 0 35px rgba(255,0,0,.5)",

  color: "white",

  boxSizing: "border-box"

}


const title = {

  textAlign: "center",

  color: "red",

  marginBottom: "5px",

  fontSize: "40px"

}


const subtitle = {

  textAlign: "center",

  color: "#aaa",

  marginBottom: "30px"

}


const selectedBox = {

  background: "#1a1a1a",

  border:
    "1px solid red",

  padding: "20px",

  borderRadius: "15px",

  marginBottom: "25px",

  textAlign: "center"

}


const inputStyle = {

  width: "100%",

  padding: "15px",

  marginBottom: "15px",

  borderRadius: "10px",

  border:
    "1px solid #333",

  background: "#1a1a1a",

  color: "white",

  fontSize: "16px",

  boxSizing: "border-box",

  outline: "none"

}


const summary = {

  background: "#1a1a1a",

  padding: "20px",

  borderRadius: "15px",

  marginTop: "10px",

  marginBottom: "20px"

}


const button = {

  width: "100%",

  padding: "18px",

  background: "red",

  border: "none",

  borderRadius: "12px",

  color: "white",

  fontSize: "18px",

  fontWeight: "bold",

  cursor: "pointer"

}


const backButton = {

  width: "100%",

  padding: "14px",

  marginTop: "15px",

  background: "#1a1a1a",

  border: "1px solid #444",

  borderRadius: "10px",

  color: "white",

  cursor: "pointer",

  fontWeight: "bold"

}
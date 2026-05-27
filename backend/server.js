const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const axios = require("axios")
const QRCode = require("qrcode")
const { v4: uuidv4 } = require("uuid")
const nodemailer = require("nodemailer")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const { db } = require("./firebase")

dotenv.config()

const app = express()

// MIDDLEWARE
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// TEST ROUTE
app.get("/", (req, res) => {

  res.send("MGS PRODUCTION SERVER RUNNING")

})


// ========================================
// VERIFY PAYMENT ROUTE
// ========================================

app.post("/verify-payment", async (req, res) => {

  try {

    const customer = req.body

    const ticketId = uuidv4()

    const ticket = {

      id: ticketId,

      fullName: customer.fullName,

      email: customer.email,

      phone: customer.phone,

      ticketType: customer.ticketType,

      quantity: customer.quantity,

      total: customer.total,

      paymentStatus: "PAID",

      used: false,

      locked: false,

      status: "VALID",

      createdAt: new Date().toISOString()

    }

    // GENERATE QR CODE
    const qrCode =
      await QRCode.toDataURL(ticketId)

    ticket.qr = qrCode

    // SAVE TO FIREBASE
    await db
      .collection("tickets")
      .doc(ticketId)
      .set(ticket)

    // SEND EMAIL
    await sendTicketEmail(ticket)

    res.json({

      success: true,

      message: "Ticket Generated Successfully",

      ticket

    })

  }

  catch (error) {

    console.log(error)

    res.status(500).json({

      success: false,

      error: error.message

    })

  }

})


// ========================================
// PAYFAST ITN ROUTE
// ========================================

app.post("/payfast-itn", async (req, res) => {

  try {

    console.log("PAYFAST ITN RECEIVED")

    const paymentData = req.body

    // CHECK PAYMENT STATUS
    if (
      paymentData.payment_status !== "COMPLETE"
    ) {

      return res
        .status(400)
        .send("Payment Not Complete")

    }

    // CREATE TICKET
    const ticketId = uuidv4()

    const ticket = {

      id: ticketId,

      fullName:
        paymentData.name_first || "Customer",

      email:
        paymentData.email_address,

      phone:
        paymentData.custom_str1 || "",

      ticketType:
        paymentData.item_name || "MGS Ticket",

      quantity: 1,

      total:
        paymentData.amount_gross,

      paymentId:
        paymentData.pf_payment_id,

      paymentStatus: "PAID",

      used: false,

      locked: false,

      status: "VALID",

      createdAt: new Date().toISOString()

    }

    // GENERATE QR
    const qrCode =
      await QRCode.toDataURL(ticketId)

    ticket.qr = qrCode

    // SAVE FIREBASE
    await db
      .collection("tickets")
      .doc(ticketId)
      .set(ticket)

    // SEND EMAIL
    await sendTicketEmail(ticket)

    res.status(200).send("ITN RECEIVED")

  }

  catch (error) {

    console.log(error)

    res.status(500).send(error.message)

  }

})


// ========================================
// QR VALIDATION ROUTE
// ========================================

app.post("/validate-ticket", async (req, res) => {

  try {

    const { ticketId } = req.body

    const ticketRef =
      db.collection("tickets").doc(ticketId)

    const ticketSnap =
      await ticketRef.get()

    // FAKE TICKET
    if (!ticketSnap.exists) {

      return res.json({

        valid: false,

        message: "FAKE TICKET"

      })

    }

    const ticket =
      ticketSnap.data()

    // USED TICKET
    if (ticket.used === true) {

      return res.json({

        valid: false,

        message: "TICKET ALREADY USED"

      })

    }

    // LOCK TICKET
    await ticketRef.update({

      used: true,

      usedAt:
        new Date().toISOString()

    })

    res.json({

      valid: true,

      message: "VALID TICKET",

      ticket

    })

  }

  catch (error) {

    console.log(error)

    res.status(500).json({

      valid: false,

      error: error.message

    })

  }

})


// ========================================
// ADMIN LOGIN
// ========================================

app.post("/admin-login", async (req, res) => {

  try {

    const {
      username,
      password
    } = req.body

    // CHECK LOGIN
    if (

      username === process.env.ADMIN_USER &&

      password === process.env.ADMIN_PASS

    ) {

      const token = jwt.sign(

        { admin: true },

        process.env.JWT_SECRET,

        { expiresIn: "7d" }

      )

      return res.json({

        success: true,

        token

      })

    }

    res.status(401).json({

      success: false,

      message: "Invalid Credentials"

    })

  }

  catch (error) {

    console.log(error)

    res.status(500).json({

      success: false,

      error: error.message

    })

  }

})


// ========================================
// GET ALL TICKETS (ADMIN)
// ========================================

app.get("/tickets", async (req, res) => {

  try {

    const snapshot =
      await db.collection("tickets").get()

    const tickets = []

    snapshot.forEach((doc) => {

      tickets.push(doc.data())

    })

    res.json(tickets)

  }

  catch (error) {

    console.log(error)

    res.status(500).json({

      error: error.message

    })

  }

})


// ========================================
// EMAIL FUNCTION
// ========================================

async function sendTicketEmail(ticket) {

  try {

    const transporter =
      nodemailer.createTransport({

        service: "gmail",

        auth: {

          user: process.env.EMAIL_USER,

          pass: process.env.EMAIL_PASS

        }

      })

    const html = `

      <div style="
        background:black;
        color:white;
        padding:30px;
        font-family:Arial;
      ">

        <h1 style="
          color:red;
          text-align:center;
        ">
          MGS EVENT TICKET
        </h1>

        <h3 style="
          text-align:center;
          color:#ccc;
        ">
          JULY 31 - AUGUST 01
        </h3>

        <div style="
          background:#111;
          padding:20px;
          border-radius:15px;
          margin-top:20px;
        ">

          <p>
            <strong>Name:</strong>
            ${ticket.fullName}
          </p>

          <p>
            <strong>Ticket:</strong>
            ${ticket.ticketType}
          </p>

          <p>
            <strong>Quantity:</strong>
            ${ticket.quantity}
          </p>

          <p>
            <strong>Total:</strong>
            R${ticket.total}
          </p>

          <p>
            <strong>Status:</strong>
            ${ticket.status}
          </p>

        </div>

        <div style="
          text-align:center;
          margin-top:30px;
        ">

          <img
            src="${ticket.qr}"
            width="250"
          />

        </div>

        <h3 style="
          color:red;
          text-align:center;
          margin-top:20px;
        ">
          Ticket ID
        </h3>

        <p style="
          text-align:center;
          color:#ccc;
          word-break:break-all;
        ">
          ${ticket.id}
        </p>

      </div>

    `

    await transporter.sendMail({

      from: process.env.EMAIL_USER,

      to: ticket.email,

      subject: "MGS EVENT TICKET",

      html

    })

    console.log("EMAIL SENT")

  }

  catch (error) {

    console.log(
      "EMAIL ERROR:",
      error.message
    )

  }

}


// ========================================
// SERVER
// ========================================

const PORT =
  process.env.PORT || 5000

app.listen(PORT, () => {

  console.log(

    "MGS SERVER RUNNING ON PORT " + PORT

  )

})
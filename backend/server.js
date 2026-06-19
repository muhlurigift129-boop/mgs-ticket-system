const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const QRCode = require("qrcode")
const { v4: uuidv4 } = require("uuid")
const nodemailer = require("nodemailer")

const { db } = require("./firebase")

dotenv.config()

const app = express()

// MIDDLEWARE
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ROOT
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "MGS Ticket System Backend Running",
    status: "ONLINE"
  })
})

// HEALTH
app.get("/health", (req, res) => {
  res.json({
    success: true,
    status: "ONLINE",
    service: "MGS Backend"
  })
})

/* =====================================================
   CREATE TICKET AFTER PAYMENT (MANUAL OR ITN)
===================================================== */
app.post("/verify-payment", async (req, res) => {
  try {
    const customer = req.body

    const ticketId = uuidv4()

    const qr = await QRCode.toDataURL(
      JSON.stringify({ id: ticketId })
    )

    const ticket = {
      id: ticketId,
      fullName: customer.fullName,
      email: customer.email,
      phone: customer.phone,
      ticketType: customer.ticketType,
      packageName: customer.packageName,
      quantity: customer.quantity,
      total: customer.total,
      used: false,
      status: "VALID",
      qr,
      createdAt: new Date().toISOString()
    }

    await db.collection("tickets").doc(ticketId).set(ticket)

    await sendTicketEmail(ticket)

    res.json({
      success: true,
      ticket
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
})

/* =====================================================
   VALIDATE SCANNER
===================================================== */
app.post("/validate-ticket", async (req, res) => {
  try {
    const { ticketId } = req.body

    const ref = db.collection("tickets").doc(ticketId)
    const snap = await ref.get()

    if (!snap.exists) {
      return res.json({
        valid: false,
        message: "INVALID TICKET"
      })
    }

    const ticket = snap.data()

    if (ticket.used) {
      return res.json({
        valid: false,
        message: "TICKET ALREADY USED",
        ticket
      })
    }

    await ref.update({
      used: true,
      status: "USED",
      scannedAt: new Date().toISOString()
    })

    res.json({
      valid: true,
      message: "VALID TICKET",
      ticket
    })

  } catch (error) {
    res.status(500).json({
      valid: false,
      error: error.message
    })
  }
})

/* =====================================================
   GET ALL TICKETS
===================================================== */
app.get("/tickets", async (req, res) => {
  try {
    const snapshot = await db.collection("tickets").get()

    const tickets = []

    snapshot.forEach(doc => {
      tickets.push(doc.data())
    })

    res.json(tickets)

  } catch (error) {
    res.status(500).json({
      error: error.message
    })
  }
})

/* =====================================================
   ANALYTICS
===================================================== */
app.get("/analytics", async (req, res) => {
  try {
    const snapshot = await db.collection("tickets").get()

    const tickets = []
    snapshot.forEach(doc => tickets.push(doc.data()))

    res.json({
      totalTickets: tickets.length,
      usedTickets: tickets.filter(t => t.used).length,
      unusedTickets: tickets.filter(t => !t.used).length,
      revenue: tickets.reduce(
        (sum, t) => sum + Number(t.total || 0),
        0
      )
    })

  } catch (error) {
    res.status(500).json({
      error: error.message
    })
  }
})

/* =====================================================
   EMAIL FUNCTION
===================================================== */
async function sendTicketEmail(ticket) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    })

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: ticket.email,
      subject: "MGS Event Ticket",
      html: `
        <div style="font-family:Arial">
          <h1>MGS EVENT TICKET</h1>
          <p><b>Name:</b> ${ticket.fullName}</p>
          <p><b>Ticket ID:</b> ${ticket.id}</p>
          <p><b>Type:</b> ${ticket.ticketType}</p>
          <p><b>Total:</b> R${ticket.total}</p>
          <img src="${ticket.qr}" width="250"/>
        </div>
      `
    })

    console.log("EMAIL SENT")

  } catch (error) {
    console.log("EMAIL ERROR:", error.message)
  }
}

// START SERVER
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`MGS SERVER RUNNING ON PORT ${PORT}`)
})

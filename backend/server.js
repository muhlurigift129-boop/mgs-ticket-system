const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const QRCode = require("qrcode")
const { v4: uuidv4 } = require("uuid")
const nodemailer = require("nodemailer")

const { db } = require("./firebase")

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ROOT
app.get("/", (req, res) => {
  res.json({
    success: true,
        ticketType,
      quantity,
      total
    } = req.body

    const ticketId = uuidv4()

    const qr = await QRCode.toDataURL(ticketId)

    const ticket = {
      id: ticketId,
      fullName,
      email,
      phone,
      ticketType,
      quantity,
      total,
      used: false,
      status: "VALID",
      qr,
      createdAt: new Date().toISOString()
    }

    await db
      .collection("tickets")
      .doc(ticketId)
      .set(ticket)

    await sendTicketEmail(ticket)

    res.json({
      success: true,
      ticket
    })  message: "MGS Ticket System Backend Running",
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

// CREATE TICKET
app.post("/verify-payment", async (req, res) => {
  const customer = req.body

  const ticketId = uuidv4()

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
    createdAt: new Date().toISOString()
  }

  await db.collection("tickets").doc(ticketId).set(ticket)

  await sendTicketEmail(ticket)

  res.json({ success: true, ticket })
})

// VALIDATE TICKET
app.post("/validate-ticket", async (req, res) => {
  try {

    const { ticketId } = req.body

    const ticketRef =
      db.collection("tickets").doc(ticketId)

    const ticketSnap =
      await ticketRef.get()

    if (!ticketSnap.exists) {
      return res.json({
        valid: false,
        message: "INVALID TICKET"
      })
    }

    const ticket = ticketSnap.data()

    if (ticket.used) {
      return res.json({
        valid: false,
        message: "TICKET ALREADY USED",
        ticket
      })
    }

    await ticketRef.update({
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

// GET TICKETS
app.get("/tickets", async (req, res) => {

  try {

    const snapshot =
      await db.collection("tickets").get()

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

// ANALYTICS
app.get("/analytics", async (req, res) => {

  try {

    const snapshot =
      await db.collection("tickets").get()

    const tickets = []

    snapshot.forEach(doc => {
      tickets.push(doc.data())
    })

    res.json({
      totalTickets: tickets.length,
      usedTickets:
        tickets.filter(t => t.used).length,
      unusedTickets:
        tickets.filter(t => !t.used).length,
      revenue:
        tickets.reduce(
          (sum, t) =>
            sum + Number(t.total || 0),
          0
        )
    })

  } catch (error) {

    res.status(500).json({
      error: error.message
    })
  }
})

// EMAIL
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

    await transporter.sendMail({

      from: process.env.EMAIL_USER,

      to: ticket.email,

      subject: "MGS Event Ticket",

      html: `
        <h1>MGS Event Ticket</h1>
        <p>Name: ${ticket.fullName}</p>
        <p>Ticket ID: ${ticket.id}</p>
        <img src="${ticket.qr}" width="250" />
      `
    })

    console.log("EMAIL SENT")

  } catch (error) {

    console.log(
      "EMAIL ERROR:",
      error.message
    )
  }
}

const PORT =
  process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(
    `MGS SERVER RUNNING ON PORT ${PORT}`
  )
})

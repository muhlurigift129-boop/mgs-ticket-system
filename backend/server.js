const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")

const { db } = require("./firebase")

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ========================================
// ROOT
// ========================================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "MGS Ticket System Backend Running",
    status: "ONLINE"
  })
})

// ========================================
// HEALTH
// ========================================

app.get("/health", (req, res) => {
  res.json({
    success: true,
    status: "ONLINE",
    service: "MGS Backend"
  })
})

// ========================================
// VALIDATE TICKET
// ========================================

app.post("/validate-ticket", async (req, res) => {
  try {
    const { ticketId } = req.body

    if (!ticketId) {
      return res.status(400).json({
        valid: false,
        message: "Ticket ID required"
      })
    }

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

    return res.json({
      valid: true,
      message: "VALID TICKET",
      ticket
    })

  } catch (error) {

    console.log(error)

    return res.status(500).json({
      valid: false,
      error: error.message
    })
  }
})

// ========================================
// GET ALL TICKETS
// ========================================

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

// ========================================
// ANALYTICS
// ========================================

app.get("/analytics", async (req, res) => {
  try {

    const snapshot =
      await db.collection("tickets").get()

    const tickets = []

    snapshot.forEach(doc => {
      tickets.push(doc.data())
    })

    const totalTickets = tickets.length

    const usedTickets =
      tickets.filter(t => t.used).length

    const unusedTickets =
      tickets.filter(t => !t.used).length

    const revenue =
      tickets.reduce(
        (sum, ticket) =>
          sum + Number(ticket.total || 0),
        0
      )

    res.json({
      totalTickets,
      usedTickets,
      unusedTickets,
      revenue
    })

  } catch (error) {

    res.status(500).json({
      error: error.message
    })
  }
})

// ========================================
// SERVER
// ========================================

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(
    `MGS SERVER RUNNING ON PORT ${PORT}`
  )
})

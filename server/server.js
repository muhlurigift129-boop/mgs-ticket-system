const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const QRCode = require("qrcode")
const nodemailer = require("nodemailer")
const { v4: uuidv4 } = require("uuid")

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("MGS SERVER RUNNING")
})

// CREATE TICKET
app.post("/create-ticket", async (req, res) => {

  try {

    const {
      fullName,
      email,
      phone,
      ticketType,
      quantity,
      total
    } = req.body

    const ticketId = uuidv4()

    const ticket = {

      id: ticketId,

      fullName,
      email,
      phone,

      ticketType,
      quantity,
      total,

      status: "VALID",
      used: false,

      createdAt: new Date()

    }

    // GENERATE QR
    const qrCode = await QRCode.toDataURL(
      JSON.stringify(ticket)
    )

    // SEND RESPONSE
    res.json({

      success: true,

      ticket,
      qrCode

    })

  }

  catch (err) {

    console.log(err)

    res.status(500).json({
      success: false
    })

  }

})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {

  console.log("SERVER RUNNING ON PORT", PORT)

})
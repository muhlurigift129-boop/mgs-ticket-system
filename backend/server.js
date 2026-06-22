const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const nodemailer = require("nodemailer")

const { db } = require("./firebase")

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ======================================
// ROOT
// ======================================

app.get("/", (req, res) => {

  res.json({
    success: true,
    message: "MGS Ticket System Backend Running",
    status: "ONLINE"
  })

})

// ======================================
// HEALTH
// ======================================

app.get("/health", (req, res) => {

  res.json({
    success: true,
    status: "ONLINE",
    service: "MGS Backend"
  })

})

// ======================================
// EMAIL CONFIG
// ======================================

const transporter =
  nodemailer.createTransport({

    service: "gmail",

    auth: {

      user:
        process.env.GMAIL_USER,

      pass:
        process.env.GMAIL_PASS

    }

  })

// ======================================
// SEND TICKET
// ======================================

app.post(
  "/verify-payment",
  async (req, res) => {

    try {

      const ticket =
        req.body

      await transporter.sendMail({

        from:
          process.env.GMAIL_USER,

        to:
          ticket.email,

        subject:
          "MGS Event Ticket",

        html: `

        <h2>MGS EVENT TICKET</h2>

        <p>
        Dear ${ticket.fullName},
        </p>

        <p>
        Thank you for purchasing
        your ticket.
        </p>

        <p>
        Package:
        ${ticket.packageName}
        </p>

        <p>
        Quantity:
        ${ticket.quantity}
        </p>

        <p>
        Total:
        R${ticket.total}
        </p>

        <p>
        Ticket ID:
        ${ticket.id}
        </p>

        <br/>

        <img
          src="${ticket.qrCode}"
          width="250"
        />

        <br/>

        <strong>
        Present this QR Code
        at the entrance.
        </strong>

        `
      })

      return res.json({

        success: true,
        message:
          "Ticket Sent"

      })

    } catch (error) {

      console.log(error)

      return res.status(500).json({

        success: false,
        message:
          "Email Failed"

      })

    }

  }
)

// ======================================
// VALIDATE TICKET
// ======================================

app.post(
  "/validate-ticket",
  async (req, res) => {

    try {

      const { id } =
        req.body

      const doc =
        await db
        .collection("tickets")
        .doc(id)
        .get()

      if (!doc.exists) {

        return res.json({

          success: false,
          status: "INVALID"

        })

      }

      const ticket =
        doc.data()

      if (ticket.used) {

        return res.json({

          success: false,
          status: "USED",
          ticket

        })

      }

      await db
        .collection("tickets")
        .doc(id)
        .update({

          used: true,

          scannedAt:
            new Date()
            .toISOString()

        })

      return res.json({

        success: true,

        status: "VALID",

        ticket

      })

    } catch (error) {

      console.log(error)

      return res.status(500).json({

        success: false

      })

    }

  }
)

// ======================================
// GET ALL TICKETS
// ======================================

app.get(
  "/tickets",
  async (req, res) => {

    try {

      const snapshot =
        await db
          .collection(
            "tickets"
          )
          .get()

      const tickets = []

      snapshot.forEach(doc => {

        tickets.push({

          firestoreId:
            doc.id,

          ...doc.data()

        })

      })

      res.json(tickets)

    } catch (error) {

      console.log(error)

      res.status(500).json({

        success: false

      })

    }

  }
)

// ======================================
// ANALYTICS
// ======================================

app.get(
  "/analytics",
  async (req, res) => {

    try {

      const snapshot =
        await db
          .collection(
            "tickets"
          )
          .get()

      let revenue = 0
      let attendance = 0

      snapshot.forEach(doc => {

        const t =
          doc.data()

        revenue +=
          Number(
            t.total || 0
          )

        if (t.used)
          attendance++

      })

      res.json({

        success: true,

        revenue,

        attendance,

        totalTickets:
          snapshot.size

      })

    } catch (error) {

      console.log(error)

      res.status(500).json({

        success: false

      })

    }

  }
)

// ======================================
// START SERVER
// ======================================

const PORT =
  process.env.PORT || 5000

app.listen(
  PORT,
  () => {

    console.log(
      `MGS SERVER RUNNING ON ${PORT}`
    )

  }
)

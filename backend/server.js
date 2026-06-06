const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const axios = require("axios")
const QRCode = require("qrcode")
const crypto = require("crypto")
const { v4: uuidv4 } = require("uuid")
const nodemailer = require("nodemailer")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const { db } = require("./firebase")

dotenv.config()

const app = express()

// ========================================
// MIDDLEWARE
// ========================================

app.use(cors())

app.use(express.json())

app.use(
  express.urlencoded({
    extended: true
  })
)


// ========================================
// TEST ROUTE
// ========================================

app.get("/health", (req, res) => {

  res.json({

    success: true,

    status: "ONLINE",

    service: "MGS Backend"

  })

})


// ========================================
// JWT AUTH MIDDLEWARE
// ========================================

function verifyAdmin(req, res, next) {

  try {

    const token =
      req.headers.authorization?.split(" ")[1]

    if (!token) {

      return res.status(401).json({

        success: false,

        message: "NO TOKEN"

      })

    }

    jwt.verify(
      token,
      process.env.JWT_SECRET
    )

    next()

  }

  catch (error) {

    return res.status(401).json({

      success: false,

      message: "INVALID TOKEN"

    })

  }

}


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

    // QR CODE
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

    res.json({

      success: true,

      message:
        "Ticket Generated Successfully",

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

```
console.log("PAYFAST ITN RECEIVED")

const paymentData = req.body

if (paymentData.payment_status !== "COMPLETE") {

  return res
    .status(400)
    .send("PAYMENT NOT COMPLETE")

}

const verifyResponse = await axios.post(

  "https://www.payfast.co.za/eng/query/validate",

  new URLSearchParams(paymentData).toString(),

  {

    headers: {

      "Content-Type":
        "application/x-www-form-urlencoded"

    }

  }

)

if (
  !verifyResponse.data.includes("VALID")
) {

  console.log("PAYFAST VALIDATION FAILED")

  return res
    .status(400)
    .send("PAYFAST VALIDATION FAILED")

}

const existing = await db
  .collection("tickets")
  .where(
    "paymentId",
    "==",
    paymentData.pf_payment_id
  )
  .get()

if (!existing.empty) {

  return res.send("ALREADY PROCESSED")

}

const ticketId = uuidv4()

const ticket = {

  id: ticketId,

  fullName:
    paymentData.name_first || "Customer",

  email:
    paymentData.email_address || "",

  phone:
    paymentData.custom_str1 || "",

  ticketType:
    paymentData.item_name || "MGS Ticket",

  quantity: 1,

  total:
    Number(
      paymentData.amount_gross || 0
    ),

  paymentId:
    paymentData.pf_payment_id,

  paymentStatus: "PAID",

  used: false,

  status: "VALID",

  createdAt:
    new Date().toISOString()

}

const qrCode =
  await QRCode.toDataURL(ticketId)

ticket.qr = qrCode

await db
  .collection("tickets")
  .doc(ticketId)
  .set(ticket)

await sendTicketEmail(ticket)

console.log("TICKET CREATED")

return res.status(200)
  .send("ITN RECEIVED")
```

}

catch (error) {

```
console.log(error)

return res
  .status(500)
  .send(error.message)
```

}

})


// ========================================
// QR VALIDATION
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

        message:
          "TICKET ALREADY USED"

      })

    }

    // LOCK TICKET
    await ticketRef.update({

      used: true,

      usedAt:
        new Date().toISOString(),

      status: "USED"

    })

    // LOG SCAN
    await db
      .collection("scanLogs")
      .add({

        ticketId: ticket.id,

        fullName: ticket.fullName,

        scannedAt:
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

    const adminUser =
      process.env.ADMIN_USER

    const adminPass =
      process.env.ADMIN_PASS

    if (
      username !== adminUser ||
      password !== adminPass
    ) {

      return res.status(401).json({

        success: false,

        message:
          "INVALID CREDENTIALS"

      })

    }

    const token = jwt.sign(

      {

        admin: true,

        username

      },

      process.env.JWT_SECRET,

      {

        expiresIn: "7d"

      }

    )

    res.json({

      success: true,

      token

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
// GET ALL TICKETS
// ========================================

app.get(
  "/tickets",
  verifyAdmin,

  async (req, res) => {

    try {

      const snapshot =
        await db
          .collection("tickets")
          .orderBy(
            "createdAt",
            "desc"
          )
          .get()

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

  }

)


// ========================================
// ANALYTICS ROUTE
// ========================================

app.get(
  "/analytics",
  verifyAdmin,

  async (req, res) => {

    try {

      const snapshot =
        await db
          .collection("tickets")
          .get()

      const tickets = []

      snapshot.forEach((doc) => {

        tickets.push(doc.data())

      })

      const totalTickets =
        tickets.length

      const usedTickets =
        tickets.filter(
          t => t.used
        ).length

      const unusedTickets =
        tickets.filter(
          t => !t.used
        ).length

      const revenue =
        tickets.reduce(

          (sum, ticket) =>
            sum + Number(ticket.total),

          0

        )
       
      const fullTickets =
        tickets.filter(
          t =>
            String(t.ticketType)
              .toLowerCase()
              .includes("full")
        ).length

      const vibeTickets =
        tickets.filter(
         t =>
           String(t.ticketType)
             .toLowerCase()
             .includes("vibe")
       ).length

      res.json({

        totalTickets,

        usedTickets,

        unusedTickets,
        
        revenue,

        fullTickets,

        vibeTickets

      })

    }

    catch (error) {

      console.log(error)

      res.status(500).json({

        error: error.message

      })

    }

  }

)


// ========================================
// EMAIL FUNCTION
// ========================================

async function sendTicketEmail(ticket) {

  try {

    const transporter =
      nodemailer.createTransport({

        service: "gmail",

        auth: {

          user:
            process.env.EMAIL_USER,

          pass:
            process.env.EMAIL_PASS

        }

      })

    const whatsappLink =

      `https://wa.me/${ticket.phone}?text=` +

      encodeURIComponent(

        `Hello ${ticket.fullName},

Your MGS Event Ticket is ready.

Ticket ID:
${ticket.id}

Please present your QR code at the entrance.`

      )

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

        <div style="
          text-align:center;
          margin-top:25px;
        ">

          <a
            href="${whatsappLink}"

            style="
              background:red;
              color:white;
              padding:12px 25px;
              text-decoration:none;
              border-radius:10px;
              font-weight:bold;
            "
          >

            SEND TO WHATSAPP

          </a>

        </div>

      </div>

    `

    await transporter.sendMail({

      from:
        process.env.EMAIL_USER,

      to:
        ticket.email,

      subject:
        "MGS EVENT TICKET",

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
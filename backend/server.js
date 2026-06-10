const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.send("MGS Backend Running")
})

app.get("/health", (req, res) => {
  res.json({
    success: true,
    status: "ONLINE"
  })
})

// ========================================
// ROOT ROUTE
// ========================================

app.get("/", (req, res) => {

  res.json({

    success: true,

    message: "MGS Ticket System Backend Running",

    status: "ONLINE",

    endpoints: [

      "/health",

      "/verify-payment",

      "/payfast-itn",

      "/validate-ticket",

      "/admin-login",

      "/tickets",

      "/analytics"

    ]

  })

})


// ========================================
// HEALTH ROUTE
// ========================================

app.get("/health", (req, res) => {

  res.json({

    success: true,

    status: "ONLINE",

    service: "MGS Backend"

  })

})
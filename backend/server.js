const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")

dotenv.config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Root Route
app.get("/", (req, res) => {
res.json({
success: true,
message: "MGS Ticket System Backend Running",
status: "ONLINE",
endpoints: [
"/health"
]
})
})

// Health Check
app.get("/health", (req, res) => {
res.json({
success: true,
status: "ONLINE",
service: "MGS Backend"
})
})

// Server
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
console.log(`MGS SERVER RUNNING ON PORT ${PORT}`)
})
const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")

dotenv.config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Root Route
app.get("/", (req, res) => {
res.json({
success: true,
message: "MGS Ticket System Backend Running",
status: "ONLINE",
endpoints: [
"/health"
]
})
})

// Health Check
app.get("/health", (req, res) => {
res.json({
success: true,
status: "ONLINE",
service: "MGS Backend"
})
})

// Server
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
console.log(`MGS SERVER RUNNING ON PORT ${PORT}`)
})

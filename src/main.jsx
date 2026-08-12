import React from "react"
import { createRoot } from "react-dom/client"

import App from "./App.jsx"
import "./index.css"

// ==========================================
// MGS TICKET SYSTEM - MAIN ENTRY POINT
// ==========================================

const rootElement = document.getElementById("root")

if (!rootElement) {
  throw new Error(
    "MGS Ticket System Error: #root element was not found in index.html"
  )
}

const root = createRoot(rootElement)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
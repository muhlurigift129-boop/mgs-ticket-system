import { useEffect, useState } from "react"
import QRCode from "qrcode"
import { v4 as uuidv4 } from "uuid"

export default function Success() {

  const [ticket, setTicket] = useState(null)
  const [qr, setQr] = useState("")

  useEffect(() => {

    const customer = JSON.parse(localStorage.getItem("mgsCustomer"))

    const ticketId = uuidv4()

    const newTicket = {
      id: ticketId,
      name: customer.fullName,
      email: customer.email,
      phone: customer.phone,
      type: customer.ticketType,
      quantity: customer.quantity,
      total: customer.total,
      used: false
    }

    setTicket(newTicket)

    QRCode.toDataURL(ticketId).then(setQr)

  }, [])

  if (!ticket) return <h2 style={{color:"white"}}>Generating Ticket...</h2>

  return (

    <div style={{
      minHeight: "100vh",
      background: "black",
      color: "white",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>

      <div style={{
        background: "#111",
        padding: "30px",
        borderRadius: "20px",
        textAlign: "center",
        boxShadow: "0 0 20px red"
      }}>

        <h1 style={{color:"red"}}>PAYMENT SUCCESS</h1>

        <p>Name: {ticket.name}</p>
        <p>Ticket Type: {ticket.type}</p>
        <p>Quantity: {ticket.quantity}</p>

        <img src={qr} width="200" />

        <h3>Ticket ID:</h3>
        <p style={{color:"red"}}>{ticket.id}</p>

      </div>

    </div>

  )
}
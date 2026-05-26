import QRCode from "qrcode.react"

export default function TicketCard() {

  const customer = JSON.parse(localStorage.getItem("mgsCustomer"))

  if (!customer) return <div>No ticket found</div>

  // UNIQUE TICKET ID (simple version for now)
  const ticketId = "MGS-" + Date.now()

  const ticketData = {
    id: ticketId,
    name: customer.fullName,
    email: customer.email,
    phone: customer.phone,
    type: customer.ticketType,
    qty: customer.quantity,
    total: customer.total,
    status: "VALID"
  }

  return (

    <div style={{
      minHeight: "100vh",
      background: "black",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "white"
    }}>

      <div style={{
        background: "#111",
        padding: "30px",
        borderRadius: "20px",
        width: "350px",
        textAlign: "center",
        boxShadow: "0 0 30px red"
      }}>

        <h1 style={{ color: "red" }}>
          MGS TICKET
        </h1>

        <p>{customer.fullName}</p>
        <p>{customer.email}</p>

        <h2 style={{ color: "white" }}>
          R{customer.total}
        </h2>

        {/* QR CODE */}
        <div style={{ margin: "20px 0" }}>

          <QRCode
            value={JSON.stringify(ticketData)}
            size={200}
            bgColor="#ffffff"
            fgColor="#000000"
          />

        </div>

        <p style={{ color: "#aaa" }}>
          Scan for Entry Validation
        </p>

      </div>

    </div>

  )
}
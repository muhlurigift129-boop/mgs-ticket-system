export default function MyAccount() {

  const order =
    JSON.parse(
      localStorage.getItem("mgsCustomer")
    )

  if (!order) {

    return (
      <h2>No Orders Found</h2>
    )

  }

  return (

    <div
      style={{
        minHeight:"100vh",
        background:"#000",
        color:"white",
        padding:"30px"
      }}
    >

      <h1 style={{color:"red"}}>
        MY ACCOUNT
      </h1>

      <p>Name: {order.fullName}</p>
      <p>Email: {order.email}</p>
      <p>Phone: {order.phone}</p>
      <p>Ticket: {order.ticketName}</p>
      <p>Quantity: {order.quantity}</p>
      <p>Total: R{order.total}</p>

      <hr />

      <h2 style={{color:"red"}}>
        Contact Support
      </h2>

      <p>Email: muhlurigift129@gmail.com</p>

      <p>
        WhatsApp:
        076 XXX XXXX
      </p>

    </div>

  )
}

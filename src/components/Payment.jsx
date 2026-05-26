export default function Payment() {

  const order = JSON.parse(localStorage.getItem("mgsOrder"))

  if (!order) {
    return (
      <div style={{ color: "white", background: "black", padding: 40 }}>
        No order found
      </div>
    )
  }

  return (
    <div style={{
      background: "#000",
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "white"
    }}>

      <div style={{
        background: "#111",
        padding: "40px",
        borderRadius: "20px",
        width: "420px",
        boxShadow: "0 0 20px red"
      }}>

        <h1 style={{ color: "red", textAlign: "center" }}>
          PAYFAST CHECKOUT
        </h1>

        <h2 style={{ textAlign: "center" }}>
          Total: R{order.total}
        </h2>

        <form action="https://www.payfast.co.za/eng/process" method="POST">

          {/* PAYFAST REAL PRODUCTION FIELDS */}
          <input type="hidden" name="merchant_id" value="21640826" />
          <input type="hidden" name="merchant_key" value="lbwzjvmjwbsfj" />

          <input type="hidden" name="return_url" value="http://localhost:5173/success" />
          <input type="hidden" name="cancel_url" value="http://localhost:5173/cancel" />
          <input type="hidden" name="notify_url" value="http://localhost:5173/api/payfast-notify" />

          <input type="hidden" name="name_first" value={order.name} />
          <input type="hidden" name="email_address" value={order.email} />

          <input type="hidden" name="amount" value={order.total} />
          <input type="hidden" name="item_name" value={`MGS Ticket - ${order.ticketType}`} />

          <button style={{
            width: "100%",
            padding: "18px",
            background: "red",
            border: "none",
            borderRadius: "10px",
            color: "white",
            fontSize: "18px",
            cursor: "pointer",
            marginTop: "20px"
          }}>
            PAY NOW
          </button>

        </form>

      </div>

    </div>
  )
}
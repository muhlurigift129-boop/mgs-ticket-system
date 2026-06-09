export default function Payment() {
  const order = JSON.parse(
    localStorage.getItem("mgsCustomer")
  )

  if (!order) {
    return (
      <div
        style={{
          background: "#000",
          color: "#fff",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        No order found
      </div>
    )
  }

  return (
    <div
      style={{
        background: "#000",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        color: "white"
      }}
    >
      <div
        style={{
          width: "450px",
          background: "#111",
          padding: "40px",
          borderRadius: "20px",
          boxShadow: "0 0 25px red"
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "red"
          }}
        >
          PAYFAST CHECKOUT
        </h1>

        <div
          style={{
            background: "#1a1a1a",
            padding: "20px",
            borderRadius: "15px",
            marginTop: "20px",
            marginBottom: "25px"
          }}
        >
          <p>
            <strong>Name:</strong>{" "}
            {order.fullName}
          </p>

          <p>
            <strong>Package:</strong>{" "}
            {order.ticketName}
          </p>

          <p>
            <strong>Quantity:</strong>{" "}
            {order.quantity}
          </p>

          <p>
            <strong>Email:</strong>{" "}
            {order.email}
          </p>

          <h2
            style={{
              textAlign: "center",
              color: "red"
            }}
          >
            TOTAL: R{order.total}
          </h2>
        </div>

        <form
          action="https://www.payfast.co.za/eng/process"
          method="post"
        >
          {/* Merchant */}
          <input
            type="hidden"
            name="merchant_id"
            value="21640826"
          />

          <input
            type="hidden"
            name="merchant_key"
            value="lbwzjvmjwbsfj"
          />

          {/* Customer */}
          <input
            type="hidden"
            name="name_first"
            value={order.fullName}
          />

          <input
            type="hidden"
            name="email_address"
            value={order.email}
          />

          {/* Transaction */}
          <input
            type="hidden"
            name="m_payment_id"
            value={Date.now()}
          />

          <input
            type="hidden"
            name="amount"
            value={order.total}
          />

          <input
            type="hidden"
            name="item_name"
            value={order.ticketName}
          />

          <input
            type="hidden"
            name="item_description"
            value={`MGS Event Ticket - ${order.ticketName}`}
          />

          <input
            type="hidden"
            name="custom_str1"
            value={order.phone}
          />

          {/* URLs */}
          <input
            type="hidden"
            name="return_url"
            value="https://mgs-ticket-system-frontend.onrender.com/success"
          />

          <input
            type="hidden"
            name="cancel_url"
            value="https://mgs-ticket-system-frontend.onrender.com"
          />

          <input
            type="hidden"
            name="notify_url"
            value="https://mgs-ticket-system-backend.onrender.com/payfast-itn"
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "18px",
              background: "red",
              color: "white",
              border: "none",
              borderRadius: "12px",
              fontSize: "18px",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            PAY NOW
          </button>
        </form>
      </div>
    </div>
  )
}
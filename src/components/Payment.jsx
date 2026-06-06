export default function Payment() {

  const order = JSON.parse(
    localStorage.getItem("mgsCustomer")
  )

  if (!order) {
    return (
      <div
        style={{
          background: "black",
          color: "white",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "24px"
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
        color: "white",
        padding: "20px"
      }}
    >

      <div
        style={{
          background: "#111",
          padding: "40px",
          borderRadius: "20px",
          width: "450px",
          boxShadow: "0 0 25px red"
        }}
      >

        <h1
          style={{
            color: "red",
            textAlign: "center",
            marginBottom: "20px"
          }}
        >
          PAYFAST CHECKOUT
        </h1>

        <div
          style={{
            background: "#1a1a1a",
            padding: "20px",
            borderRadius: "15px",
            marginBottom: "25px"
          }}
        >

          <h3 style={{ color: "red" }}>
            ORDER SUMMARY
          </h3>

          <p>
            <strong>Name:</strong> {order.fullName}
          </p>

          <p>
            <strong>Package:</strong> {order.ticketName}
          </p>

          <p>
            <strong>Quantity:</strong> {order.quantity}
          </p>

          <p>
            <strong>Email:</strong> {order.email}
          </p>

          <p>
            <strong>Phone:</strong> {order.phone}
          </p>

          <h2
            style={{
              color: "red",
              textAlign: "center",
              marginTop: "15px"
            }}
          >
            TOTAL: R{order.total}
          </h2>

        </div>

        <form
          action="https://www.payfast.co.za/eng/process"
          method="POST"
        >

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

          {/* CHANGE THESE AFTER DEPLOYMENT */}
          <input
            type="hidden"
            name="return_url"
            value="http://localhost:5173/success"
          />

          <input
            type="hidden"
            name="cancel_url"
            value="http://localhost:5173"
          />

          <input
            type="hidden"
            name="notify_url"
            value="http://localhost:5173"
          />

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

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "18px",
              background: "red",
              border: "none",
              borderRadius: "12px",
              color: "white",
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
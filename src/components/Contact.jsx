export default function Contact() {

  const whatsappNumber = "27735306246"

  const whatsappMessage =
    encodeURIComponent(
      "Hello MGS Events Support, I need help with my ticket/order."
    )

  const whatsappLink =
    `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`


  return (

    <div
      style={{
        background: "#000",
        color: "white",
        minHeight: "100vh",
        padding: "100px 20px",
        boxSizing: "border-box"
      }}
    >

      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto"
        }}
      >

        <h1
          style={{
            color: "red",
            fontSize: "42px",
            marginBottom: "15px"
          }}
        >
          CONTACT US
        </h1>

        <p
          style={{
            color: "#aaa",
            marginBottom: "35px"
          }}
        >
          MGS Event Support
        </p>


        {/* ================================
            CONTACT INFORMATION
        ================================= */}

        <div
          style={{
            background: "#111",
            border: "1px solid #333",
            borderRadius: "18px",
            padding: "30px",
            boxShadow: "0 0 25px rgba(255,0,0,.2)"
          }}
        >

          {/* PRIMARY EMAIL */}

          <div style={contactItem}>

            <h3 style={heading}>
              📧 Email
            </h3>

            <a
              href="mailto:muhlurigift129@gmail.com"
              style={link}
            >
              muhlurigift129@gmail.com
            </a>

          </div>


          {/* SECOND EMAIL */}

          <div style={contactItem}>

            <h3 style={heading}>
              📧 Additional Email
            </h3>

            <a
              href="mailto:mashaoad@gmail.com"
              style={link}
            >
              mashaoad@gmail.com
            </a>

          </div>


          {/* EXISTING WHATSAPP */}

          <div style={contactItem}>

            <h3 style={heading}>
              📱 WhatsApp
            </h3>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              style={whatsappNumberLink}
            >
              +27 73 530 6246
            </a>

          </div>


          {/* NEW PHONE */}

          <div style={contactItem}>

            <h3 style={heading}>
              📞 Phone
            </h3>

            <a
              href="tel:+27647391463"
              style={link}
            >
              064 739 1463
            </a>

          </div>


          {/* SUPPORT */}

          <div
            style={{
              marginTop: "30px",
              paddingTop: "25px",
              borderTop: "1px solid #292929"
            }}
          >

            <h3
              style={{
                color: "red",
                marginBottom: "10px"
              }}
            >
              MGS EVENT SUPPORT
            </h3>

            <p
              style={{
                color: "#aaa",
                lineHeight: "1.7"
              }}
            >
              For ticket purchases, payments, orders,
              account problems or general event support,
              please contact us using the details above.
            </p>

          </div>

        </div>


        {/* ================================
            CONTACT BUTTONS
        ================================= */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(200px,1fr))",
            gap: "15px",
            marginTop: "25px"
          }}
        >

          {/* EMAIL */}

          <a
            href="mailto:mashaoad@gmail.com"
            style={button}
          >
            📧 EMAIL SUPPORT
          </a>


          {/* PHONE */}

          <a
            href="tel:+27647391463"
            style={button}
          >
            📞 CALL 064 739 1463
          </a>


          {/* WHATSAPP SHORTCUT */}

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            style={whatsappButton}
          >
            💬 WHATSAPP SUPPORT
          </a>

        </div>


        {/* ================================
            QUICK WHATSAPP BOX
        ================================= */}

        <div style={whatsappBox}>

          <div style={whatsappIcon}>
            💬
          </div>

          <div style={whatsappText}>

            <strong>
              Need help quickly?
            </strong>

            <span>
              Chat with MGS Event Support on WhatsApp.
            </span>

          </div>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            style={whatsappChatButton}
          >
            CHAT NOW
          </a>

        </div>


        {/* FOOTER */}

        <p
          style={{
            textAlign: "center",
            color: "#555",
            marginTop: "50px",
            fontSize: "13px"
          }}
        >
          © 2026 MGS EVENTS
        </p>

      </div>

    </div>

  )
}


/* ======================================
   STYLES
====================================== */

const contactItem = {

  marginBottom: "25px",

  paddingBottom: "20px",

  borderBottom: "1px solid #222"

}


const heading = {

  color: "white",

  fontSize: "17px",

  marginBottom: "8px"

}


const link = {

  color: "red",

  textDecoration: "none",

  fontSize: "16px",

  fontWeight: "bold"

}


/* ======================================
   WHATSAPP NUMBER LINK
====================================== */

const whatsappNumberLink = {

  color: "#25D366",

  textDecoration: "none",

  fontSize: "16px",

  fontWeight: "bold"

}


/* ======================================
   NORMAL BUTTON
====================================== */

const button = {

  display: "flex",

  justifyContent: "center",

  alignItems: "center",

  padding: "15px",

  background: "red",

  color: "white",

  textDecoration: "none",

  borderRadius: "10px",

  fontWeight: "bold",

  fontSize: "14px",

  minHeight: "50px",

  boxSizing: "border-box"

}


/* ======================================
   WHATSAPP BUTTON
====================================== */

const whatsappButton = {

  display: "flex",

  justifyContent: "center",

  alignItems: "center",

  padding: "15px",

  background: "#25D366",

  color: "white",

  textDecoration: "none",

  borderRadius: "10px",

  fontWeight: "bold",

  fontSize: "14px",

  minHeight: "50px",

  boxSizing: "border-box",

  boxShadow:
    "0 0 20px rgba(37,211,102,.25)"

}


/* ======================================
   WHATSAPP QUICK BOX
====================================== */

const whatsappBox = {

  marginTop: "25px",

  padding: "20px",

  background: "#0d1b12",

  border: "1px solid #25D366",

  borderRadius: "15px",

  display: "flex",

  alignItems: "center",

  gap: "15px",

  flexWrap: "wrap",

  boxSizing: "border-box"

}


const whatsappIcon = {

  width: "50px",

  height: "50px",

  borderRadius: "50%",

  background: "#25D366",

  display: "flex",

  justifyContent: "center",

  alignItems: "center",

  fontSize: "25px",

  flexShrink: 0

}


const whatsappText = {

  display: "flex",

  flexDirection: "column",

  gap: "5px",

  flex: "1",

  minWidth: "180px"

}


const whatsappChatButton = {

  background: "#25D366",

  color: "white",

  textDecoration: "none",

  padding: "12px 20px",

  borderRadius: "10px",

  fontWeight: "bold",

  fontSize: "13px",

  whiteSpace: "nowrap"

}
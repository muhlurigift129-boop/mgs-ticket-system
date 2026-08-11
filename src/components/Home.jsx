import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/config.jsx";

export default function Home() {
  const navigate = useNavigate();

  // ==========================================
  // MGS EVENT TICKET
  // ==========================================

  const ticket = {
    name: "MGS EVENT",
    packageName: "MGS EVENT",
    price: 420,
    quantity: "Unlimited",
    type: "unlimited",
    date: "12 September 2026",
    description:
      "Get unlimited access to the MGS Event on 12 September 2026.",
    features: [
      "Full Event Entrance",
      "Main Event Access",
      "Live Entertainment",
      "Music & Entertainment",
      "Full Event Experience",
    ],
  };

  // ==========================================
  // BUY TICKET
  // ==========================================

  function buyTicket() {
    // Save the selected ticket so Payment.jsx
    // can read it.

    localStorage.setItem(
      "selectedTicket",
      JSON.stringify(ticket)
    );

    // If user is logged in, go directly
    // to the existing protected payment route.

    if (auth.currentUser) {
      navigate("/register");
      return;
    }

    // If user is not logged in, create account first.

    navigate("/register-account");
  }

  return (
    <div style={page}>
      {/* ======================================
          HERO
      ====================================== */}

      <section style={hero}>
        <div style={heroOverlay}>
          <div style={eventBadge}>
            MGS EVENTS
          </div>

          <h1 style={mainTitle}>
            MGS EVENT
          </h1>

          <p style={heroText}>
            ONE EVENT. ONE EXPERIENCE.
          </p>

          <div style={dateBox}>
            <span style={dateLabel}>
              EVENT DATE
            </span>

            <strong style={dateValue}>
              12 SEPTEMBER 2026
            </strong>
          </div>
        </div>
      </section>

      {/* ======================================
          TICKETS SECTION
      ====================================== */}

      <section style={ticketSection}>
        <div style={sectionHeader}>
          <p style={sectionSmallTitle}>
            SECURE YOUR PLACE
          </p>

          <h2 style={sectionTitle}>
            GET YOUR MGS TICKET
          </h2>

          <p style={sectionDescription}>
            Only one ticket package is available.
            Tickets are unlimited and cost R420 each.
          </p>
        </div>

        {/* ====================================
            TICKET CARD
        ==================================== */}

        <div style={ticketWrapper}>
          <div style={ticketCard}>
            {/* POPULAR BADGE */}

            <div style={popularBadge}>
              UNLIMITED TICKETS
            </div>

            {/* TICKET TITLE */}

            <h2 style={ticketTitle}>
              {ticket.name}
            </h2>

            <p style={ticketDescription}>
              {ticket.description}
            </p>

            {/* PRICE */}

            <div style={priceContainer}>
              <span style={currency}>
                R
              </span>

              <span style={price}>
                {ticket.price}
              </span>
            </div>

            <p style={priceText}>
              PER TICKET
            </p>

            {/* DATE */}

            <div style={infoBox}>
              <div style={infoItem}>
                <span style={infoIcon}>
                  📅
                </span>

                <div>
                  <span style={infoLabel}>
                    DATE
                  </span>

                  <strong style={infoValue}>
                    {ticket.date}
                  </strong>
                </div>
              </div>

              <div style={divider} />

              <div style={infoItem}>
                <span style={infoIcon}>
                  🎟️
                </span>

                <div>
                  <span style={infoLabel}>
                    AVAILABILITY
                  </span>

                  <strong style={unlimited}>
                    UNLIMITED
                  </strong>
                </div>
              </div>
            </div>

            {/* FEATURES */}

            <div style={featuresBox}>
              <h3 style={featuresTitle}>
                TICKET INCLUDES
              </h3>

              {ticket.features.map(
                (feature, index) => (
                  <div
                    key={`${feature}-${index}`}
                    style={featureRow}
                  >
                    <span style={check}>
                      ✓
                    </span>

                    <span style={featureText}>
                      {feature}
                    </span>
                  </div>
                )
              )}
            </div>

            {/* BUY BUTTON */}

            <button
              type="button"
              onClick={buyTicket}
              style={buyButton}
            >
              BUY TICKET NOW
            </button>

            <p style={secureText}>
              🔒 Secure ticket registration
            </p>
          </div>
        </div>
      </section>

      {/* ======================================
          EVENT INFORMATION
      ====================================== */}

      <section style={eventSection}>
        <div style={eventContainer}>
          <h2 style={eventTitle}>
            MGS EVENT 2026
          </h2>

          <p style={eventDescription}>
            Join us on 12 September 2026 for the
            MGS Event experience.
          </p>

          <div style={eventDetails}>
            <div style={detailCard}>
              <div style={detailIcon}>
                📅
              </div>

              <h3 style={detailTitle}>
                DATE
              </h3>

              <p style={detailText}>
                12 September 2026
              </p>
            </div>

            <div style={detailCard}>
              <div style={detailIcon}>
                🎟️
              </div>

              <h3 style={detailTitle}>
                TICKET
              </h3>

              <p style={detailText}>
                R420
              </p>
            </div>

            <div style={detailCard}>
              <div style={detailIcon}>
                ♾️
              </div>

              <h3 style={detailTitle}>
                AVAILABILITY
              </h3>

              <p style={detailText}>
                Unlimited
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================
          FOOTER
      ====================================== */}

      <footer style={footer}>
        <h3 style={footerTitle}>
          MGS EVENTS
        </h3>

        <p style={footerText}>
          12 September 2026 • R420
        </p>

        <p style={copyright}>
          © 2026 MGS Events. All rights reserved.
        </p>
      </footer>
    </div>
  );
}


// ==========================================
// PAGE
// ==========================================

const page = {
  minHeight: "100vh",
  background:
    "linear-gradient(180deg, #000 0%, #080808 45%, #111 100%)",
  color: "#fff",
  paddingTop: "80px",
  overflowX: "hidden",
};


// ==========================================
// HERO
// ==========================================

const hero = {
  minHeight: "500px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  padding: "60px 20px",
  background:
    "radial-gradient(circle at center, #350000 0%, #080000 35%, #000 75%)",
  borderBottom: "1px solid #222",
};


const heroOverlay = {
  maxWidth: "900px",
  width: "100%",
};


const eventBadge = {
  display: "inline-block",
  padding: "8px 18px",
  border: "1px solid red",
  borderRadius: "30px",
  color: "#ff3333",
  fontSize: "13px",
  fontWeight: "800",
  letterSpacing: "3px",
  marginBottom: "20px",
};


const mainTitle = {
  margin: 0,
  color: "#fff",
  fontSize: "clamp(48px, 9vw, 100px)",
  fontWeight: "900",
  letterSpacing: "4px",
  textShadow:
    "0 0 30px rgba(255,0,0,0.5)",
};


const heroText = {
  color: "#aaa",
  fontSize: "18px",
  fontWeight: "700",
  letterSpacing: "5px",
  marginTop: "15px",
};


const dateBox = {
  margin: "35px auto 0",
  padding: "20px 35px",
  maxWidth: "420px",
  background:
    "rgba(255,0,0,0.08)",
  border:
    "1px solid rgba(255,0,0,0.5)",
  borderRadius: "16px",
};


const dateLabel = {
  display: "block",
  color: "#888",
  fontSize: "11px",
  letterSpacing: "3px",
  marginBottom: "8px",
};


const dateValue = {
  display: "block",
  color: "#fff",
  fontSize: "24px",
  letterSpacing: "1px",
};


// ==========================================
// TICKET SECTION
// ==========================================

const ticketSection = {
  padding: "80px 20px",
  maxWidth: "1200px",
  margin: "0 auto",
};


const sectionHeader = {
  textAlign: "center",
  marginBottom: "45px",
};


const sectionSmallTitle = {
  color: "red",
  fontSize: "13px",
  fontWeight: "800",
  letterSpacing: "4px",
  marginBottom: "10px",
};


const sectionTitle = {
  margin: 0,
  fontSize: "42px",
  fontWeight: "900",
};


const sectionDescription = {
  maxWidth: "650px",
  margin: "15px auto 0",
  color: "#999",
  lineHeight: 1.7,
};


const ticketWrapper = {
  display: "flex",
  justifyContent: "center",
};


const ticketCard = {
  width: "100%",
  maxWidth: "560px",
  background:
    "linear-gradient(145deg, #171717, #0d0d0d)",
  border: "2px solid red",
  borderRadius: "25px",
  padding: "35px",
  boxSizing: "border-box",
  boxShadow:
    "0 0 50px rgba(255,0,0,0.18)",
  textAlign: "center",
};


const popularBadge = {
  display: "inline-block",
  background: "red",
  color: "#fff",
  padding: "8px 18px",
  borderRadius: "30px",
  fontSize: "11px",
  fontWeight: "900",
  letterSpacing: "1px",
  marginBottom: "20px",
};


const ticketTitle = {
  margin: "5px 0 10px",
  color: "#fff",
  fontSize: "34px",
  fontWeight: "900",
};


const ticketDescription = {
  color: "#999",
  lineHeight: 1.6,
  margin: "0 auto 20px",
  maxWidth: "450px",
};


const priceContainer = {
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  marginTop: "20px",
};


const currency = {
  color: "red",
  fontSize: "28px",
  fontWeight: "900",
  marginTop: "10px",
};


const price = {
  color: "#fff",
  fontSize: "80px",
  lineHeight: 1,
  fontWeight: "900",
};


const priceText = {
  color: "#777",
  fontSize: "11px",
  letterSpacing: "3px",
  fontWeight: "700",
};


const infoBox = {
  marginTop: "30px",
  padding: "20px",
  background: "#090909",
  border: "1px solid #292929",
  borderRadius: "15px",
};


const infoItem = {
  display: "flex",
  alignItems: "center",
  textAlign: "left",
  gap: "15px",
};


const infoIcon = {
  fontSize: "27px",
  width: "40px",
  textAlign: "center",
};


const infoLabel = {
  display: "block",
  color: "#666",
  fontSize: "10px",
  fontWeight: "800",
  letterSpacing: "2px",
  marginBottom: "5px",
};


const infoValue = {
  display: "block",
  color: "#fff",
  fontSize: "16px",
};


const unlimited = {
  display: "block",
  color: "#20d66b",
  fontSize: "16px",
  fontWeight: "900",
};


const divider = {
  height: "1px",
  background: "#252525",
  margin: "18px 0",
};


const featuresBox = {
  marginTop: "30px",
  textAlign: "left",
};


const featuresTitle = {
  color: "#fff",
  fontSize: "14px",
  letterSpacing: "2px",
  marginBottom: "18px",
};


const featureRow = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "10px 0",
  borderBottom: "1px solid #202020",
};


const check = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "23px",
  height: "23px",
  background: "red",
  color: "#fff",
  borderRadius: "50%",
  fontSize: "13px",
  fontWeight: "900",
  flexShrink: 0,
};


const featureText = {
  color: "#ccc",
  fontSize: "14px",
};


const buyButton = {
  width: "100%",
  marginTop: "30px",
  padding: "18px",
  background:
    "linear-gradient(90deg, #d90000, #ff2020)",
  color: "#fff",
  border: "none",
  borderRadius: "12px",
  cursor: "pointer",
  fontWeight: "900",
  fontSize: "17px",
  letterSpacing: "1px",
  boxShadow:
    "0 10px 25px rgba(255,0,0,0.25)",
};


const secureText = {
  color: "#666",
  fontSize: "11px",
  marginTop: "15px",
};


// ==========================================
// EVENT INFORMATION
// ==========================================

const eventSection = {
  padding: "70px 20px",
  background: "#080808",
  borderTop: "1px solid #1b1b1b",
  borderBottom: "1px solid #1b1b1b",
};


const eventContainer = {
  maxWidth: "1100px",
  margin: "0 auto",
  textAlign: "center",
};


const eventTitle = {
  color: "#fff",
  fontSize: "35px",
  fontWeight: "900",
};


const eventDescription = {
  color: "#888",
  maxWidth: "600px",
  margin: "0 auto",
  lineHeight: 1.7,
};


const eventDetails = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "20px",
  marginTop: "40px",
};


const detailCard = {
  background: "#111",
  border: "1px solid #292929",
  borderRadius: "18px",
  padding: "25px",
};


const detailIcon = {
  fontSize: "32px",
  marginBottom: "10px",
};


const detailTitle = {
  color: "red",
  fontSize: "13px",
  letterSpacing: "2px",
};


const detailText = {
  color: "#ddd",
  fontWeight: "700",
};


// ==========================================
// FOOTER
// ==========================================

const footer = {
  padding: "50px 20px",
  textAlign: "center",
  background: "#000",
};


const footerTitle = {
  color: "red",
  fontSize: "24px",
  fontWeight: "900",
  letterSpacing: "3px",
};


const footerText = {
  color: "#aaa",
};


const copyright = {
  color: "#555",
  fontSize: "12px",
  marginTop: "20px",
};
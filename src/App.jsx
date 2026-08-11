import { useNavigate } from "react-router-dom";
import { auth } from "./firebase/config.jsx";

export default function Home() {
  const navigate = useNavigate();

  // ======================================
  // ONLY TICKET AVAILABLE
  // ======================================

  const ticket = {
    name: "UNLIMITED EVENT TICKET",
    price: 420,
    description:
      "Unlimited access to the MGS Braai & Get to Know Each Other event.",
    type: "unlimited",
    date: "12 September 2026",
    time: "12H00",
    location: "NTHABISEKO RESORT",

    features: [
      "Unlimited Event Access",
      "Entrance Included",
      "Meat Included",
      "Drinks Included",
      "Good Music",
      "Good Vibes",
      "Connect & Build Friendships",
      "Enjoy Great Food & Drinks",
    ],
  };

  // ======================================
  // BUY TICKET
  // ======================================

  function buyTicket() {
    // Save the selected ticket so Payment.jsx
    // can read it.
    localStorage.setItem(
      "selectedTicket",
      JSON.stringify(ticket)
    );

    // Check Firebase authentication.
    const user = auth.currentUser;

    if (user) {
      // ==================================
      // USER IS LOGGED IN
      // ==================================
      //
      // Go directly to the BUY/PAYMENT page.
      //
      // IMPORTANT:
      // Do NOT navigate to /orders here.
      //

      navigate("/register");
    } else {
      // ==================================
      // USER IS LOGGED OUT
      // ==================================
      //
      // They must create an account first.
      //

      navigate("/register-account");
    }
  }

  // ======================================
  // LOGIN
  // ======================================

  function login() {
    navigate("/login");
  }

  // ======================================
  // VIEW ACCOUNT
  // ======================================

  function account() {
    if (auth.currentUser) {
      navigate("/my-account");
    } else {
      navigate("/login");
    }
  }

  return (
    <div style={page}>

      {/* ==================================
          HERO
      ================================== */}

      <section style={hero}>

        <div style={heroOverlay}>

          <div style={heroContent}>

            <div style={logoCircle}>
              MGS
            </div>

            <h1 style={mainTitle}>
              MGS EVENT
            </h1>

            <h2 style={mainSubtitle}>
              BRAAI & GET TO KNOW EACH OTHER
            </h2>

            <p style={heroText}>
              COME • CONNECT • SHARE • GROW
            </p>

            <p style={heroDescription}>
              Join us for an unforgettable day of
              great food, drinks, music, friendship
              and good vibes.
            </p>

            <div style={heroButtons}>

              <button
                type="button"
                onClick={buyTicket}
                style={primaryButton}
              >
                🎫 BUY TICKET NOW
              </button>

              <button
                type="button"
                onClick={account}
                style={secondaryButton}
              >
                👤 MY ACCOUNT
              </button>

            </div>

          </div>

        </div>

      </section>

      {/* ==================================
          EVENT INFORMATION
      ================================== */}

      <section style={eventInfoSection}>

        <div style={infoGrid}>

          <div style={infoCard}>

            <div style={infoIcon}>
              📍
            </div>

            <h3 style={infoTitle}>
              PLACE
            </h3>

            <p style={infoText}>
              NTHABISEKO RESORT
            </p>

          </div>

          <div style={infoCard}>

            <div style={infoIcon}>
              📅
            </div>

            <h3 style={infoTitle}>
              DATE
            </h3>

            <p style={infoText}>
              12 SEPTEMBER
              <br />
              2026
            </p>

          </div>

          <div style={infoCard}>

            <div style={infoIcon}>
              🕛
            </div>

            <h3 style={infoTitle}>
              TIME
            </h3>

            <p style={infoText}>
              12H00
            </p>

          </div>

          <div style={infoCard}>

            <div style={infoIcon}>
              🎫
            </div>

            <h3 style={infoTitle}>
              PRICE
            </h3>

            <p style={priceText}>
              R420
            </p>

            <p style={smallText}>
              PER PERSON
            </p>

          </div>

        </div>

      </section>

      {/* ==================================
          EVENT DESCRIPTION
      ================================== */}

      <section style={contentSection}>

        <h2 style={sectionTitle}>
          GET TO KNOW EACH OTHER
        </h2>

        <p style={sectionDescription}>
          Come together with friends, family and
          new people for a day filled with good
          food, good music and great company.
        </p>

        <div style={featureGrid}>

          <div style={featureCard}>

            <div style={featureIcon}>
              👥
            </div>

            <h3>
              CONNECT
            </h3>

            <p>
              Build new friendships and meet
              amazing people.
            </p>

          </div>

          <div style={featureCard}>

            <div style={featureIcon}>
              🔥
            </div>

            <h3>
              ENJOY
            </h3>

            <p>
              Enjoy great food, drinks and
              entertainment.
            </p>

          </div>

          <div style={featureCard}>

            <div style={featureIcon}>
              ❤️
            </div>

            <h3>
              GROW
            </h3>

            <p>
              Grow together and create
              unforgettable memories.
            </p>

          </div>

          <div style={featureCard}>

            <div style={featureIcon}>
              🎵
            </div>

            <h3>
              GOOD VIBES
            </h3>

            <p>
              Music, laughter and good times
              throughout the event.
            </p>

          </div>

        </div>

      </section>

      {/* ==================================
          TICKET SECTION
      ================================== */}

      <section style={ticketSection}>

        <h2 style={sectionTitle}>
          YOUR TICKET
        </h2>

        <div style={ticketCard}>

          <div style={popularBadge}>
            UNLIMITED TICKET
          </div>

          <h2 style={ticketName}>
            {ticket.name}
          </h2>

          <div style={ticketPrice}>
            R{ticket.price}
          </div>

          <p style={perPerson}>
            PER PERSON
          </p>

          <p style={ticketDescription}>
            {ticket.description}
          </p>

          {/* Ticket information */}

          <div style={ticketDetails}>

            <div>
              📅{" "}
              <strong>
                {ticket.date}
              </strong>
            </div>

            <div>
              🕛{" "}
              <strong>
                {ticket.time}
              </strong>
            </div>

            <div>
              📍{" "}
              <strong>
                {ticket.location}
              </strong>
            </div>

          </div>

          {/* Features */}

          <div style={featuresBox}>

            {ticket.features.map(
              (feature, index) => (

                <div
                  key={index}
                  style={featureRow}
                >
                  <span style={check}>
                    ✓
                  </span>

                  <span>
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
            style={bigBuyButton}
          >
            🎫 BUY TICKET NOW
          </button>

          <p style={loginHint}>
            {auth.currentUser
              ? "You are logged in. Continue directly to payment."
              : "Already have an account? Login before purchasing."}
          </p>

          {!auth.currentUser && (

            <button
              type="button"
              onClick={login}
              style={loginButton}
            >
              LOGIN
            </button>

          )}

        </div>

      </section>

      {/* ==================================
          FINAL CALL TO ACTION
      ================================== */}

      <section style={ctaSection}>

        <h2 style={ctaTitle}>
          DON'T MISS OUT!
        </h2>

        <p style={ctaText}>
          BRING YOUR FRIENDS &
          LET'S MAKE MEMORIES!
        </p>

        <button
          type="button"
          onClick={buyTicket}
          style={ctaButton}
        >
          GET YOUR TICKET — R420
        </button>

      </section>

      {/* ==================================
          FOOTER
      ================================== */}

      <footer style={footer}>

        <p style={footerTitle}>
          MGS EVENTS
        </p>

        <p style={footerText}>
          COME • CONNECT • SHARE • GROW
        </p>

        <p style={footerCopyright}>
          © 2026 MGS Events. All rights reserved.
        </p>

      </footer>

    </div>
  );
}

/* =========================================
   PAGE
========================================= */

const page = {
  minHeight: "100vh",
  background:
    "linear-gradient(180deg, #000 0%, #090909 50%, #111 100%)",
  color: "#fff",
  fontFamily:
    "Arial, Helvetica, sans-serif",
  overflowX: "hidden",
};

/* =========================================
   HERO
========================================= */

const hero = {
  minHeight: "620px",
  background:
    "radial-gradient(circle at center, #321000 0%, #090909 45%, #000 100%)",
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
};

const heroOverlay = {
  width: "100%",
  minHeight: "620px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "40px 20px",
  boxSizing: "border-box",
  background:
    "linear-gradient(180deg, rgba(0,0,0,.25), rgba(0,0,0,.85))",
};

const heroContent = {
  maxWidth: "900px",
  width: "100%",
};

const logoCircle = {
  width: "90px",
  height: "90px",
  borderRadius: "50%",
  background:
    "linear-gradient(135deg, #ff1e1e, #ff8a00)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto 25px",
  fontSize: "30px",
  fontWeight: "900",
  boxShadow:
    "0 0 35px rgba(255,50,0,.65)",
};

const mainTitle = {
  margin: 0,
  color: "#fff",
  fontSize: "clamp(42px, 8vw, 80px)",
  fontWeight: "900",
  letterSpacing: "4px",
};

const mainSubtitle = {
  color: "#ff9800",
  fontSize: "clamp(20px, 4vw, 38px)",
  margin: "10px 0",
  fontWeight: "900",
};

const heroText = {
  color: "#fff",
  fontSize: "18px",
  fontWeight: "700",
  letterSpacing: "3px",
  marginTop: "25px",
};

const heroDescription = {
  color: "#ccc",
  maxWidth: "650px",
  margin: "20px auto",
  fontSize: "17px",
  lineHeight: 1.7,
};

const heroButtons = {
  display: "flex",
  justifyContent: "center",
  gap: "15px",
  flexWrap: "wrap",
  marginTop: "30px",
};

/* =========================================
   BUTTONS
========================================= */

const primaryButton = {
  padding: "17px 30px",
  background:
    "linear-gradient(135deg, #ff1616, #ff4500)",
  color: "#fff",
  border: "none",
  borderRadius: "12px",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "900",
  boxShadow:
    "0 0 25px rgba(255,30,0,.45)",
};

const secondaryButton = {
  padding: "17px 30px",
  background: "#111",
  color: "#fff",
  border: "1px solid #ff2b1a",
  borderRadius: "12px",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "800",
};

/* =========================================
   EVENT INFO
========================================= */

const eventInfoSection = {
  padding: "50px 20px",
  background: "#080808",
};

const infoGrid = {
  maxWidth: "1200px",
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "18px",
};

const infoCard = {
  background:
    "linear-gradient(145deg, #151515, #0a0a0a)",
  border: "1px solid #333",
  borderRadius: "18px",
  padding: "28px 20px",
  textAlign: "center",
};

const infoIcon = {
  fontSize: "35px",
  marginBottom: "10px",
};

const infoTitle = {
  color: "#ff3b1f",
  margin: "8px 0",
  fontSize: "14px",
  letterSpacing: "2px",
};

const infoText = {
  color: "#fff",
  fontWeight: "800",
  lineHeight: 1.5,
};

const priceText = {
  color: "#ff9800",
  fontSize: "35px",
  fontWeight: "900",
  margin: "8px 0 0",
};

const smallText = {
  color: "#aaa",
  fontSize: "12px",
};

/* =========================================
   CONTENT
========================================= */

const contentSection = {
  padding: "70px 20px",
  textAlign: "center",
  maxWidth: "1200px",
  margin: "0 auto",
};

const sectionTitle = {
  color: "#ff3b1f",
  fontSize: "32px",
  fontWeight: "900",
  marginBottom: "15px",
};

const sectionDescription = {
  maxWidth: "700px",
  margin: "0 auto 40px",
  color: "#aaa",
  lineHeight: 1.7,
};

const featureGrid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "20px",
};

const featureCard = {
  background: "#111",
  border: "1px solid #292929",
  borderRadius: "18px",
  padding: "30px 20px",
};

const featureIcon = {
  fontSize: "38px",
  marginBottom: "12px",
};

/* =========================================
   TICKET
========================================= */

const ticketSection = {
  padding: "70px 20px",
  background:
    "linear-gradient(180deg, #0a0a0a, #151515)",
  textAlign: "center",
};

const ticketCard = {
  maxWidth: "650px",
  margin: "30px auto 0",
  padding: "35px",
  background:
    "linear-gradient(145deg, #171717, #090909)",
  border: "2px solid #ff2b1a",
  borderRadius: "25px",
  boxShadow:
    "0 0 45px rgba(255,30,0,.18)",
  boxSizing: "border-box",
};

const popularBadge = {
  display: "inline-block",
  background:
    "linear-gradient(135deg, #ff1e1e, #ff8a00)",
  color: "#fff",
  padding: "8px 16px",
  borderRadius: "30px",
  fontSize: "12px",
  fontWeight: "900",
  letterSpacing: "1px",
};

const ticketName = {
  color: "#fff",
  fontSize: "28px",
  marginTop: "20px",
};

const ticketPrice = {
  color: "#ff9800",
  fontSize: "65px",
  fontWeight: "900",
  marginTop: "15px",
};

const perPerson = {
  color: "#aaa",
  marginTop: "-5px",
  fontSize: "13px",
};

const ticketDescription = {
  color: "#bbb",
  lineHeight: 1.6,
  margin: "25px auto",
};

const ticketDetails = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(180px, 1fr))",
  gap: "12px",
  padding: "20px 0",
  borderTop: "1px solid #333",
  borderBottom: "1px solid #333",
  lineHeight: 1.7,
  color: "#ddd",
};

const featuresBox = {
  textAlign: "left",
  marginTop: "25px",
};

const featureRow = {
  display: "flex",
  gap: "10px",
  padding: "9px 0",
  color: "#ddd",
};

const check = {
  color: "#ff3b1f",
  fontWeight: "900",
};

const bigBuyButton = {
  width: "100%",
  marginTop: "30px",
  padding: "18px",
  background:
    "linear-gradient(135deg, #ff1717, #ff6200)",
  color: "#fff",
  border: "none",
  borderRadius: "12px",
  cursor: "pointer",
  fontSize: "17px",
  fontWeight: "900",
  boxShadow:
    "0 0 25px rgba(255,40,0,.35)",
};

const loginHint = {
  color: "#888",
  fontSize: "13px",
  marginTop: "18px",
};

const loginButton = {
  padding: "12px 25px",
  background: "#111",
  color: "#fff",
  border: "1px solid #ff3b1f",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "700",
};

/* =========================================
   CTA
========================================= */

const ctaSection = {
  padding: "70px 20px",
  textAlign: "center",
  background:
    "radial-gradient(circle, #260a00, #000)",
};

const ctaTitle = {
  color: "#fff",
  fontSize: "42px",
  fontWeight: "900",
};

const ctaText = {
  color: "#ff9800",
  fontSize: "20px",
  fontWeight: "900",
};

const ctaButton = {
  marginTop: "20px",
  padding: "17px 35px",
  background: "#ff2415",
  color: "#fff",
  border: "none",
  borderRadius: "12px",
  cursor: "pointer",
  fontWeight: "900",
  fontSize: "16px",
};

/* =========================================
   FOOTER
========================================= */

const footer = {
  padding: "40px 20px",
  textAlign: "center",
  background: "#000",
  borderTop: "1px solid #222",
};

const footerTitle = {
  color: "#ff2b1a",
  fontWeight: "900",
  fontSize: "20px",
};

const footerText = {
  color: "#aaa",
  letterSpacing: "2px",
};

const footerCopyright = {
  color: "#555",
  fontSize: "12px",
  marginTop: "20px",
};

import { useNavigate } from "react-router-dom"

export default function Home() {

  const navigate = useNavigate()

  return (

    <div style={{
      background: "#000",
      minHeight: "100vh",
      color: "white",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      padding: "30px"
    }}>

      <h1 style={{ color: "red", fontSize: "70px" }}>
        MGS
      </h1>

      <h2>JULY 31 - AUGUST 01</h2>

      <p style={{ maxWidth: "600px", color: "#ccc", marginTop: "20px" }}>
        Experience music, games, food and unforgettable vibes.
      </p>

      <div style={{ marginTop: "40px" }}>

        <button
          onClick={() => navigate("/register")}
          style={{
            padding: "18px 50px",
            background: "red",
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontSize: "20px",
            cursor: "pointer"
          }}
        >
          GET TICKETS
        </button>

      </div>

    </div>
  )
}
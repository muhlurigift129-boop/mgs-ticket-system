import { useNavigate } from "react-router-dom"

export default function Home() {

  const navigate = useNavigate()

  return (

    <div
      style={{
        minHeight: "100vh",
        background: "#000",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >

      <button
        onClick={() => navigate("/login")}
      >
        TEST HOME
      </button>

    </div>

  )

}

import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Login() {

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  function login(e) {

    e.preventDefault()

    const user =
      JSON.parse(
        localStorage.getItem("mgsUser")
      )

    if (
      user &&
      user.email === email &&
      user.password === password
    ) {

      localStorage.setItem(
        "mgs_logged_in",
        "true"
      )

      navigate("/my-account")

    } else {

      alert("Invalid Login")

    }

  }

  return (

    <div style={{
      minHeight:"100vh",
      background:"#000",
      display:"flex",
      justifyContent:"center",
      alignItems:"center"
    }}>

      <form
        onSubmit={login}
        style={{
          width:"400px",
          background:"#111",
          padding:"30px",
          borderRadius:"20px",
          color:"white"
        }}
      >

        <h1 style={{color:"red"}}>
          CUSTOMER LOGIN
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          style={inputStyle}
        />

        <button
          type="submit"
          style={{
            width:"100%",
            padding:"15px",
            background:"red",
            color:"white",
            border:"none"
          }}
        >
          LOGIN
        </button>

      </form>

    </div>

  )
}

const inputStyle = {
  width:"100%",
  padding:"15px",
  marginBottom:"15px"
}

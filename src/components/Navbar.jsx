import { useNavigate } from "react-router-dom"
import { auth } from "../firebase/config"
import { signOut } from "firebase/auth"
import { useEffect, useState } from "react"

export default function Navbar() {

  const navigate = useNavigate()

  const [user, setUser] = useState(null)

  useEffect(() => {

    const unsubscribe =
      auth.onAuthStateChanged((currentUser) => {

        setUser(currentUser)

      })

    return () => unsubscribe()

  }, [])

  async function logout() {

    await signOut(auth)

    navigate("/")

  }

  return (

   <div
     style={{
       background: "#000",
       borderBottom: "2px solid red",
       padding: "15px 25px",
       display: "flex",
       justifyContent: "space-between",
       alignItems: "center",
       position: "sticky",
       top: 0,
       zIndex: 999
     }}
   >

     {/* LOGO */}

     <button
       onClick={() => navigate("/")}
       style={{
         background: "transparent",
         border: "none",
         color: "red",
         fontSize: "28px",
         cursor: "pointer",
         fontWeight: "bold"
       }}
     >
       MGS
     </button>

     {/* LOGIN / REGISTER ONLY WHEN LOGGED OUT */}

     {!user && (

       <div
         style={{
           display: "flex",
           gap: "10px"
         }}
       >

         <button
           onClick={() => navigate("/login")}
           style={buttonStyle}
         >
           LOGIN
         </button>

         <button
           onClick={() => navigate("/register-account")}
           style={{
             ...buttonStyle,
             background: "#111",
             border: "1px solid red"
           }}
         >
           REGISTER
         </button>

       </div>

     )}

   </div>

 )

}

const buttonStyle = {

  background: "red",

  color: "white",

  border: "none",

  padding: "10px 18px",

  borderRadius: "10px",

  cursor: "pointer",

  fontWeight: "bold"

}

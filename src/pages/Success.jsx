import { useEffect, useState } from "react"

export default function Success(){

  const [ticket,setTicket] = useState(null)

  useEffect(()=>{

    const data = localStorage.getItem("mgs_ticket")

    if(data){
      setTicket(JSON.parse(data))
    }

  },[])

  return(

    <div style={{
      background:"#000",
      minHeight:"100vh",
      color:"white",
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      flexDirection:"column",
      textAlign:"center"
    }}>

      <h1 style={{color:"red"}}>PAYMENT SUCCESS</h1>

      {ticket && (
        <div style={{
          background:"#111",
          padding:"30px",
          borderRadius:"15px",
          marginTop:"20px"
        }}>

          <h2>{ticket.name}</h2>
          <p>{ticket.email}</p>
          <p>{ticket.ticketType}</p>
          <p style={{color:"lime"}}>STATUS: PAID</p>

        </div>
      )}

    </div>

  )

}
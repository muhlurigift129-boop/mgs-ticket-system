import { useEffect, useState } from "react"
import { Html5QrcodeScanner } from "html5-qrcode"
import axios from "axios"

export default function Scanner(){

  const [status,setStatus] = useState("Scanning...")

  useEffect(()=>{

    const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: 250 }
    )

    scanner.render(success,error)

    async function success(decodedText){

      try{

        const data = JSON.parse(decodedText)

        const res = await axios.post(
          "http://localhost:5000/api/scan/validate-ticket",
          {
            ticketId: data.ticketId
          }
        )

        setStatus(res.data.status)

        scanner.clear()

      }catch(err){

        setStatus("ERROR")

      }

    }

    function error(err){
      console.log(err)
    }

  },[])

  return(

    <div style={{
      background:"#000",
      minHeight:"100vh",
      color:"white",
      textAlign:"center",
      padding:"20px"
    }}>

      <h1 style={{color:"red"}}>MGS SCANNER</h1>

      <div id="reader"></div>

      <h2>{status}</h2>

    </div>

  )

}
import { useEffect, useRef, useState } from "react"
import { auth } from "../firebase/config"
import responses from "./aiResponses"

export default function MgsAI() {

  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [typing, setTyping] = useState(false)

  const [chat, setChat] = useState([])

  const bottomRef = useRef()

  useEffect(() => {

    const name =
      auth.currentUser?.displayName ||
      auth.currentUser?.email ||
      "there"

    setChat([
      {
        sender: "bot",
        text:
`👋 Hello ${name}

I'm MGS AI.

I can help you with:

🎫 Tickets

💳 Payments

📅 Event information

👤 Your account

☎ Contact

Just ask me anything.`
      }
    ])

  }, [])

  useEffect(() => {

    bottomRef.current?.scrollIntoView({
      behavior:"smooth"
    })

  },[chat])

  function botReply(reply){

    setTyping(true)

    setTimeout(()=>{

      setTyping(false)

      setChat(prev=>[
        ...prev,
        {
          sender:"bot",
          text:reply
        }
      ])

    },1200)

  }

  function sendMessage(){

    if(!message.trim()) return

    const text = message.toLowerCase()

    setChat(prev=>[
      ...prev,
      {
        sender:"user",
        text:message
      }
    ])

    setMessage("")

    if(
      text.includes("ticket")||
      text.includes("price")||
      text.includes("buy")
    ){

      return botReply(responses.tickets)

    }

    if(
      text.includes("payment")||
      text.includes("pay")
    ){

      return botReply(responses.payment)

    }

    if(
      text.includes("event")||
      text.includes("date")||
      text.includes("where")
    ){

      return botReply(responses.event)

    }

    if(
      text.includes("account")||
      text.includes("login")||
      text.includes("register")
    ){

      return botReply(responses.account)

    }

    if(
      text.includes("contact")||
      text.includes("phone")||
      text.includes("email")
    ){

      return botReply(responses.contact)

    }

    botReply(responses.default)

  }

  function quick(text){

    setMessage(text)

    setTimeout(()=>{
      sendMessage()
    },100)

  }

  return(

    <>

      <button
      style={robot}
      onClick={()=>setOpen(!open)}
      >

      🤖

      </button>

      {open && (

      <div style={box}>

      <div style={header}>

      🤖 MGS AI Assistant

      </div>

      <div style={quickBar}>

      <button onClick={()=>quick("tickets")}>
      🎫 Tickets
      </button>

      <button onClick={()=>quick("payment")}>
      💳 Pay
      </button>

      <button onClick={()=>quick("event")}>
      📅 Event
      </button>

      </div>

      <div style={messages}>

      {chat.map((msg,i)=>(

      <div

      key={i}

      style={{
      ...bubble,
      alignSelf:
      msg.sender==="user"
      ?"flex-end"
      :"flex-start",

      background:
      msg.sender==="user"
      ?"red"
      :"#1d1d1d"
      }}

      >

      {msg.text}

      </div>

      ))}

      {typing &&

      <div style={typingBubble}>

      MGS AI is typing...

      </div>

      }

      <div ref={bottomRef}></div>

      </div>

      <div style={inputArea}>

      <input

      value={message}

      placeholder="Ask anything..."

      onChange={(e)=>setMessage(e.target.value)}

      onKeyDown={(e)=>{

      if(e.key==="Enter"){

      sendMessage()

      }

      }}

      style={input}

      />

      <button
      style={send}
      onClick={sendMessage}
      >

      ➜

      </button>

      </div>

      </div>

      )}

    </>

  )

}

const robot={
position:"fixed",
bottom:25,
right:25,
width:70,
height:70,
borderRadius:"50%",
background:"red",
color:"white",
fontSize:32,
border:"none",
cursor:"pointer",
zIndex:99999
}

const box={
position:"fixed",
bottom:110,
right:25,
width:380,
height:560,
background:"#111",
border:"2px solid red",
borderRadius:20,
display:"flex",
flexDirection:"column",
overflow:"hidden",
zIndex:99999
}

const header={
padding:18,
background:"red",
color:"white",
fontWeight:"bold",
textAlign:"center"
}

const quickBar={
display:"flex",
justifyContent:"space-around",
padding:10,
background:"#181818"
}

const messages={
flex:1,
padding:15,
overflowY:"auto",
display:"flex",
flexDirection:"column",
gap:10,
color:"white"
}

const bubble={
padding:12,
borderRadius:15,
maxWidth:"85%",
whiteSpace:"pre-line"
}

const typingBubble={
background:"#222",
padding:12,
borderRadius:12,
width:"fit-content"
}

const inputArea={
display:"flex"
}

const input={
flex:1,
background:"#1b1b1b",
color:"white",
border:"none",
padding:15,
outline:"none"
}

const send={
width:70,
background:"red",
border:"none",
color:"white",
cursor:"pointer",
fontSize:22
}

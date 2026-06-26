import { useState } from "react"
import responses from "./aiResponses"

export default function MgsAI() {

  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [chat, setChat] = useState([
    {
      sender: "bot",
      text: responses.hello
    }
  ])

  function sendMessage() {

    if (!message.trim()) return

    const userMessage = {
      sender: "user",
      text: message
    }

    let reply = responses.default

    const text = message.toLowerCase()

    if (
      text.includes("ticket") ||
      text.includes("price") ||
      text.includes("full event") ||
      text.includes("vibe")
    ) {
      reply = responses.tickets
    }

    else if (
      text.includes("payment") ||
      text.includes("pay")
    ) {
      reply = responses.payment
    }

    else if (
      text.includes("login") ||
      text.includes("sign in")
    ) {
      reply = responses.login
    }

    else if (
      text.includes("register") ||
      text.includes("create account")
    ) {
      reply = responses.register
    }

    else if (
      text.includes("contact") ||
      text.includes("phone") ||
      text.includes("email")
    ) {
      reply = responses.contact
    }

    setChat(prev => [
      ...prev,
      userMessage,
      {
        sender: "bot",
        text: reply
      }
    ])

    setMessage("")
  }

  return (

    <>

      {/* Floating Button */}

      <button
        onClick={() => setOpen(!open)}
        style={robotButton}
      >
        🤖
      </button>

      {open && (

        <div style={chatBox}>

          <div style={header}>
            🤖 MGS AI Assistant
          </div>

          <div style={messages}>

            {chat.map((msg, index) => (

              <div
                key={index}
                style={{
                  ...bubble,
                  alignSelf:
                    msg.sender === "user"
                      ? "flex-end"
                      : "flex-start",
                  background:
                    msg.sender === "user"
                      ? "red"
                      : "#222"
                }}
              >

                {msg.text}

              </div>

            ))}

          </div>

          <div style={inputArea}>

            <input
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
              onKeyDown={(e)=>{
                if(e.key==="Enter"){
                  sendMessage()
                }
              }}
              placeholder="Ask me anything..."
              style={input}
            />

            <button
              onClick={sendMessage}
              style={sendButton}
            >
              ➤
            </button>

          </div>

        </div>

      )}

    </>

  )

}

const robotButton = {

  position:"fixed",

  bottom:"25px",

  right:"25px",

  width:"70px",

  height:"70px",

  borderRadius:"50%",

  border:"none",

  background:"red",

  color:"white",

  fontSize:"34px",

  cursor:"pointer",

  boxShadow:"0 0 20px rgba(255,0,0,.6)",

  zIndex:99999

}

const chatBox = {

  position:"fixed",

  bottom:"110px",

  right:"25px",

  width:"360px",

  height:"500px",

  background:"#111",

  border:"2px solid red",

  borderRadius:"20px",

  display:"flex",

  flexDirection:"column",

  overflow:"hidden",

  zIndex:99999

}

const header = {

  background:"red",

  color:"white",

  padding:"18px",

  fontWeight:"bold",

  textAlign:"center",

  fontSize:"18px"

}

const messages = {

  flex:1,

  display:"flex",

  flexDirection:"column",

  gap:"12px",

  padding:"15px",

  overflowY:"auto",

  color:"white"

}

const bubble = {

  maxWidth:"85%",

  padding:"12px",

  borderRadius:"12px",

  whiteSpace:"pre-line"

}

const inputArea = {

  display:"flex",

  borderTop:"1px solid #333"

}

const input = {

  flex:1,

  background:"#1b1b1b",

  color:"white",

  border:"none",

  padding:"15px",

  outline:"none"

}

const sendButton = {

  width:"70px",

  border:"none",

  background:"red",

  color:"white",

  cursor:"pointer",

  fontSize:"22px"

}

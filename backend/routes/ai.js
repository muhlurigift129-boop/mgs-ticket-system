import express from "express"
import OpenAI from "openai"

const router = express.Router()

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

router.post("/", async (req, res) => {

  try {

    const { message } = req.body

    const completion =
      await client.chat.completions.create({

        model: "gpt-4.1-mini",

        messages: [

          {
            role: "system",
            content: `
You are MGS AI.

You work for MGS Events.

Your only job is helping customers.

Ticket Prices

Full Event
R300

Vibe Only
R100

Vibe + Drinks
R200

Vibe + Food
R200

Users receive a QR ticket after payment.

Always be friendly.

Always encourage customers to buy tickets.

If asked unrelated questions politely refuse.
`
          },

          {
            role: "user",
            content: message
          }

        ]

      })

    res.json({

      success: true,

      reply:
        completion.choices[0].message.content

    })

  }

  catch (err) {

    console.log(err)

    res.status(500).json({

      success: false,

      reply:
        "Sorry, I'm having trouble answering right now."

    })

  }

})

export default router

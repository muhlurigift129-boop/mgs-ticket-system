// ========================================
// ROOT ROUTE
// ========================================

app.get("/", (req, res) => {

  res.json({

    success: true,

    message: "MGS Ticket System Backend Running",

    status: "ONLINE",

    endpoints: [

      "/health",

      "/verify-payment",

      "/payfast-itn",

      "/validate-ticket",

      "/admin-login",

      "/tickets",

      "/analytics"

    ]

  })

})


// ========================================
// HEALTH ROUTE
// ========================================

app.get("/health", (req, res) => {

  res.json({

    success: true,

    status: "ONLINE",

    service: "MGS Backend"

  })

})
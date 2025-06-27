const express = require("express")
const path = require("path")

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use(express.static(path.join(__dirname, "public")))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Sample data
let domains = [
  {
    id: 1,
    name: "example.com",
    registrar: "GoDaddy",
    category: "Tech",
    purchaseDate: "2023-01-15",
    expirationDate: "2023-12-15",
    status: "Active",
    purchasePrice: 12.99,
    evaluations: [{ tool: "GoDaddy", date: "2023-02-01", value: 150 }],
  },
  {
    id: 2,
    name: "mybusiness.net",
    registrar: "Namecheap",
    category: "Business",
    purchaseDate: "2023-03-10",
    expirationDate: "2024-02-10",
    status: "For Sale",
    purchasePrice: 15.99,
    evaluations: [{ tool: "Atom", date: "2023-04-01", value: 200 }],
  },
  {
    id: 3,
    name: "techstartup.io",
    registrar: "Cloudflare",
    category: "Tech",
    purchaseDate: "2023-05-20",
    expirationDate: "2024-04-20",
    status: "Active",
    purchasePrice: 25.0,
    evaluations: [{ tool: "DNRater", date: "2023-06-01", value: 300 }],
  },
]

const sales = [
  {
    id: 1,
    domainName: "sold-domain.com",
    saleDate: "2023-06-15",
    salePrice: 500,
    buyer: "John Doe",
    purchasePrice: 12.99,
  },
  {
    id: 2,
    domainName: "premium-name.org",
    saleDate: "2023-08-22",
    salePrice: 1200,
    buyer: "Tech Corp",
    purchasePrice: 18.99,
  },
]

const settings = {
  registrars: ["GoDaddy", "Namecheap", "Google Domains", "Cloudflare", "Porkbun", "Dynadot"],
  categories: ["Tech", "Business", "E-commerce", "Blog", "Portfolio", "Finance", "Health", "Education"],
  evaluationTools: ["Atom", "DNRater", "GoDaddy", "Estibot", "NameBio", "Other"],
}

// Helper functions
function calculateStats() {
  const totalDomains = domains.length
  const soldDomains = sales.length
  const totalInvestment = domains.reduce((sum, d) => sum + (d.purchasePrice || 0), 0)
  const totalSales = sales.reduce((sum, s) => sum + s.salePrice, 0)
  const totalValue = domains.reduce((sum, d) => {
    const latestEval =
      d.evaluations && d.evaluations.length > 0 ? d.evaluations[d.evaluations.length - 1].value : d.purchasePrice || 0
    return sum + latestEval
  }, 0)

  const roi = totalInvestment > 0 ? ((totalSales - totalInvestment) / totalInvestment) * 100 : 0

  return {
    totalDomains,
    soldDomains,
    totalValue: totalValue.toFixed(2),
    roi: roi.toFixed(2),
    totalInvestment: totalInvestment.toFixed(2),
    totalSales: totalSales.toFixed(2),
  }
}

function calculateExpirationDate(purchaseDate) {
  const date = new Date(purchaseDate)
  date.setMonth(date.getMonth() + 11)
  return date.toISOString().split("T")[0]
}

// Routes
app.get("/", (req, res) => {
  try {
    const stats = calculateStats()
    res.render("dashboard", {
      domains,
      sales,
      settings,
      stats,
      page: "dashboard",
    })
  } catch (error) {
    console.error("Dashboard error:", error)
    res.status(500).send("Error loading dashboard")
  }
})

app.get("/domains", (req, res) => {
  try {
    res.render("domains", {
      domains,
      settings,
      page: "domains",
    })
  } catch (error) {
    console.error("Domains error:", error)
    res.status(500).send("Error loading domains page")
  }
})

app.get("/evaluation", (req, res) => {
  try {
    res.render("evaluation", {
      domains,
      settings,
      page: "evaluation",
    })
  } catch (error) {
    console.error("Evaluation error:", error)
    res.status(500).send("Error loading evaluation page")
  }
})

app.get("/statistics", (req, res) => {
  try {
    const stats = calculateStats()
    res.render("statistics", {
      stats,
      domains,
      sales,
      page: "statistics",
    })
  } catch (error) {
    console.error("Statistics error:", error)
    res.status(500).send("Error loading statistics page")
  }
})

app.get("/sales", (req, res) => {
  try {
    res.render("sales", {
      sales,
      page: "sales",
    })
  } catch (error) {
    console.error("Sales error:", error)
    res.status(500).send("Error loading sales page")
  }
})

app.get("/settings", (req, res) => {
  try {
    res.render("settings", {
      settings,
      page: "settings",
    })
  } catch (error) {
    console.error("Settings error:", error)
    res.status(500).send("Error loading settings page")
  }
})

// API Routes
app.post("/api/domains", (req, res) => {
  try {
    const newDomain = {
      id: Date.now(),
      ...req.body,
      purchasePrice: Number.parseFloat(req.body.purchasePrice),
      expirationDate: calculateExpirationDate(req.body.purchaseDate),
      evaluations: [],
    }
    domains.push(newDomain)
    res.json({ success: true, domain: newDomain })
  } catch (error) {
    console.error("Add domain error:", error)
    res.status(500).json({ success: false, message: "Error adding domain" })
  }
})

app.post("/api/domains/bulk", (req, res) => {
  try {
    const { domains: newDomains } = req.body
    const addedDomains = []

    newDomains.forEach((domainData) => {
      const newDomain = {
        id: Date.now() + Math.random(),
        ...domainData,
        purchasePrice: Number.parseFloat(domainData.purchasePrice),
        expirationDate: calculateExpirationDate(domainData.purchaseDate),
        evaluations: [],
      }
      domains.push(newDomain)
      addedDomains.push(newDomain)
    })

    res.json({ success: true, domains: addedDomains, count: addedDomains.length })
  } catch (error) {
    console.error("Bulk add domains error:", error)
    res.status(500).json({ success: false, message: "Error adding domains in bulk" })
  }
})

app.put("/api/domains/:id", (req, res) => {
  try {
    const id = Number.parseInt(req.params.id)
    const index = domains.findIndex((d) => d.id === id)
    if (index !== -1) {
      domains[index] = {
        ...domains[index],
        ...req.body,
        purchasePrice: Number.parseFloat(req.body.purchasePrice),
        expirationDate: calculateExpirationDate(req.body.purchaseDate),
      }
      res.json({ success: true, domain: domains[index] })
    } else {
      res.status(404).json({ success: false, message: "Domain not found" })
    }
  } catch (error) {
    console.error("Update domain error:", error)
    res.status(500).json({ success: false, message: "Error updating domain" })
  }
})

app.delete("/api/domains/:id", (req, res) => {
  try {
    const id = Number.parseInt(req.params.id)
    domains = domains.filter((d) => d.id !== id)
    res.json({ success: true })
  } catch (error) {
    console.error("Delete domain error:", error)
    res.status(500).json({ success: false, message: "Error deleting domain" })
  }
})

app.post("/api/evaluations", (req, res) => {
  try {
    const { domainId, tool, date, value } = req.body
    const domain = domains.find((d) => d.id === Number.parseInt(domainId))
    if (domain) {
      if (!domain.evaluations) domain.evaluations = []
      domain.evaluations.push({ tool, date, value: Number.parseFloat(value) })
      res.json({ success: true })
    } else {
      res.status(404).json({ success: false, message: "Domain not found" })
    }
  } catch (error) {
    console.error("Add evaluation error:", error)
    res.status(500).json({ success: false, message: "Error adding evaluation" })
  }
})

app.post("/api/sales", (req, res) => {
  try {
    const newSale = {
      id: Date.now(),
      ...req.body,
      salePrice: Number.parseFloat(req.body.salePrice),
      purchasePrice: Number.parseFloat(req.body.purchasePrice) || 0,
    }
    sales.push(newSale)
    res.json({ success: true, sale: newSale })
  } catch (error) {
    console.error("Add sale error:", error)
    res.status(500).json({ success: false, message: "Error adding sale" })
  }
})

app.post("/api/settings", (req, res) => {
  try {
    const { type, value } = req.body
    if (settings[type] && !settings[type].includes(value)) {
      settings[type].push(value)
    }
    res.json({ success: true, settings })
  } catch (error) {
    console.error("Add setting error:", error)
    res.status(500).json({ success: false, message: "Error adding setting" })
  }
})

app.post("/api/settings/remove", (req, res) => {
  try {
    const { type, value } = req.body
    if (settings[type]) {
      settings[type] = settings[type].filter((item) => item !== value)
    }
    res.json({ success: true, settings })
  } catch (error) {
    console.error("Remove setting error:", error)
    res.status(500).json({ success: false, message: "Error removing setting" })
  }
})

// Health check endpoint for Vercel
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() })
})

// Error handling
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.stack)
  res.status(500).send(`
    <h1>Server Error</h1>
    <p>Something went wrong. Check the console for details.</p>
    <a href="/">Go back to Dashboard</a>
  `)
})

// 404 handler
app.use((req, res) => {
  res.status(404).send(`
    <h1>Page Not Found</h1>
    <p>The page you're looking for doesn't exist.</p>
    <a href="/">Go back to Dashboard</a>
  `)
})

// Export for Vercel
module.exports = app

// Start server only if not in Vercel environment
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`)
    console.log(`📁 Views: ${path.join(__dirname, "views")}`)
    console.log(`📁 Public: ${path.join(__dirname, "public")}`)
    console.log(`✅ Domains Portfolio ready for deployment!`)
  })
}

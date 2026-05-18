import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Newsletter
  app.post("/api/newsletter", (req, res) => {
    const { email } = req.body;
    
    if (!email || !email.includes("@")) {
      return res.status(400).json({ error: "Invalid email" });
    }

    console.log(`Newsletter subscription received: ${email}`);
    
    // In a real app, you'd save this to a database or call a service like Mailchimp/SendGrid.
    // We'll simulate a successful response.
    res.json({ message: "Successfully subscribed" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

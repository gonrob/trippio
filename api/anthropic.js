// api/anthropic.js — Vercel serverless function
// Proxies requests to Anthropic API, keeps API key server-side

export default async function handler(req, res) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error("ANTHROPIC_API_KEY not set");
    return res.status(500).json({ error: "API key not configured" });
  }

  try {
    const body = req.body;

    // Validate required fields
    if (!body.messages || !Array.isArray(body.messages)) {
      return res.status(400).json({ error: "messages array required" });
    }

    // Ensure model is always valid — never use user-supplied model string
    const ALLOWED_MODELS = [
      "claude-sonnet-4-5",
      "claude-haiku-4-5",
      "claude-opus-4-5",
    ];
    const model = ALLOWED_MODELS.includes(body.model) ? body.model : "claude-haiku-4-5";

    const payload = {
      model,
      max_tokens: Math.min(body.max_tokens || 1024, 8000), // cap at 8k
      messages: body.messages,
    };
    if (body.system) payload.system = body.system;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Anthropic error:", response.status, data);
      return res.status(response.status).json(data);
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("Proxy error:", error);
    return res.status(500).json({ error: "Internal server error", detail: error.message });
  }
}

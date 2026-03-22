export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const apiKey = process.env.ANTHROPIC_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "ANTHROPIC_KEY not configured in Vercel" });
  }

  try {
    const body = req.body;
    if (!body?.messages || !Array.isArray(body.messages)) {
      return res.status(400).json({ error: "messages array required" });
    }

    // Use claude-sonnet-4-5 for main plan, haiku for chat
    const ALLOWED = ["claude-sonnet-4-5", "claude-haiku-4-5", "claude-opus-4-5"];
    const model = ALLOWED.includes(body.model) ? body.model : "claude-sonnet-4-5";

    const payload = {
      model,
      max_tokens: Math.min(body.max_tokens || 1024, 8000),
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

    const text = await response.text();
    let data;
    try { data = JSON.parse(text); } catch { data = { error: text }; }

    if (!response.ok) {
      console.error("Anthropic error:", response.status, data);
      return res.status(response.status).json(data);
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("Proxy error:", error);
    return res.status(500).json({ error: error.message });
  }
}

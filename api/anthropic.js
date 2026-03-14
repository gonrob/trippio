export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const stream = req.body.stream === true;

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify(req.body),
  });

  if (stream) {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    response.body.pipeTo(new WritableStream({
      write(chunk) { res.write(chunk); },
      close() { res.end(); }
    }));
  } else {
    const data = await response.json();
    res.status(response.status).json(data);
  }
}

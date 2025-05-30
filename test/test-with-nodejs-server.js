
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;


// Enable CORS for all origins (or specify your frontend origin)
app.use(cors({
  origin: 'http://localhost:5173'
}));


app.get('/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const sendEvent = () => {
    const data = {
      message: 'Hello from server!',
      timestamp: new Date().toISOString()
    };
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };

  const interval = setInterval(sendEvent, 2000); // Send every 2 seconds

  req.on('close', () => {
    clearInterval(interval);
    res.end();
  });
});

app.listen(PORT, () => {
  console.log(`SSE server running at http://localhost:${PORT}`);
});

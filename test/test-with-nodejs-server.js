
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

  let toggle = true; // This flag will switch between true and false

  const sendEvent = () => {
    //const data = {
    //  message: toggle ? 'Hello from server!' : 'Bye from server!',
    //  timestamp: new Date().toISOString()
    //};
    
    const data = toggle
        ? { key: 'ryu', message: 'Hello from the left!' }
        : { key: 'ken', message: 'Hello from the right!' };

    res.write(`data: ${JSON.stringify(data)}\n\n`);
    toggle = !toggle; // Flip the flag

  };

  const interval = setInterval(sendEvent, 2000); // Send time interval 1000 = 1 second

  req.on('close', () => {
    clearInterval(interval);
    res.end();
  });
});

app.listen(PORT, () => {
  console.log(`SSE server running at http://localhost:${PORT}`);
});

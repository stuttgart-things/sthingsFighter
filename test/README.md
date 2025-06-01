## Testing with node server as sse

### REQUIREMENTS

#### env vars
```bash
cat <<EOF > .env
VITE_TOKEN=''
VITE_ENDPOINT=''
VITE_HOST=''
VITE_SSE_PROXY=''
VITE_GENERIC_PROXY=''
EOF
```

#### download packages

```bash
npm install cors
npm install express
npm install ts-node
npm install dotenv
```

### START

```bash
# start node server
node /test/test-with-nodejs-server.js
```

```bash
# start game and open developer console in browser
npm run dev
```


implementable how-to "attack" k8s resources:

npm install @kubernetes/client-node

(Change test-with-nodejs-sever.js)

```js
import express from 'express';
import cors from 'cors';
import { KubeConfig, CoreV1Api } from '@kubernetes/client-node';

const app = express();
const PORT = 3000;

// Enable CORS for your frontend
app.use(cors({
  origin: 'http://localhost:5173'
}));

// SSE endpoint
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

  const interval = setInterval(sendEvent, 2000);

  req.on('close', () => {
    clearInterval(interval);
    res.end();
  });
});

// Kubernetes API setup
const kc = new KubeConfig();
kc.loadFromDefault(); // or kc.loadFromFile('/path/to/kubeconfig')
const k8sApi = kc.makeApiClient(CoreV1Api);

// New endpoint to list pods
app async (req, res) => {
  try {
    const response = await k8sApi.listNamespacedPod('default');
    const podNames = response.body.items.map(pod => pod.metadata.name);
    res.json(podNames);
  } catch (err) {
    console.error('Error fetching pods:', err);
    res.status(500).json({ error: 'Failed to fetch pods' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

```

(call from frontend)

```js

const fetchPods = async () => {
  const res = await fetch('http://localhost:3000/api/pods');
  const pods = await res.json();
  console.log('Pods:', pods);
};

```

Tips
Make sure your Node.js server has access to a valid kubeconfig (usually in ~/.kube/config).
You can add more endpoints like /api/deployments, /api/nodes, etc., using other Kubernetes API clients.
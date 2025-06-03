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

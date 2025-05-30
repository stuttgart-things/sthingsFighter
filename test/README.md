## Testing with node server

### REQUIREMENTS

```bash
# Change in BattleScene.js url of startSSE() function
startSSE(http://localhost:3000/events)

# download node server packages if not present
npm install cors
npm install express
npm install ts-node
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
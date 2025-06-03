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


curl https://dl.min.io/client/mc/release/linux-amd64/mc \
  --create-dirs \
  -o $HOME/minio-binaries/mc

chmod +x $HOME/minio-binaries/mc
export PATH=$PATH:$HOME/minio-binaries/

mkdir -p ~/.mc/
cat << EOF> ~/.mc/config.json
{
  "version": "10",
  "aliases": {
    "play": {
      "url": "https://play.min.io",
      "accessKey": "minioadmin",
      "secretKey": "minioadmin",
      "api": "s3v4",
      "path": "auto"
    }
  }
}
EOF
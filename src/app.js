const express = require('express');
const ngrok = require('ngrok');
const app = express();
const port = 3000;

app.use(express.json());

const requests = [];

app.post('/', (req, res) => {
  req.body.time = new Date().toLocaleString('pt-BR');
  requests.unshift(req.body);

  res.json({ message: 'ok' });
});

app.get('/', (req, res) => {
  res.json({ requests });
});

app.listen(port, async () => {
  const url = await ngrok.connect({
    addr: port,
    authtoken: process.env.NGROK_TOKEN,
    region: 'sa',
  });

  console.log(`Local url: http://localhost:${port} \nPublic url: ${url}`);
});

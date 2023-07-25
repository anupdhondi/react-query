const express = require('express');

const app = express();
const PORT = 3002;

const langs = ['html', 'css', 'javascript'];

app.use(express.json());

app.get('/getLangs', (req, res) => {
  res.json({ favLangs: langs });
});

app.post('/addLang', (req, res) => {
  const record = req.body.record;
  langs.push(record);
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log('server Listening on ', PORT);
});

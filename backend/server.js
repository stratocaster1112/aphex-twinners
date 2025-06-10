const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

app.post('/cadastro', (req, res) => {
  const newUser = req.body;

  const filePath = path.join(__dirname, 'data.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    let json = [];

    if (!err && data) {
      try {
        json = JSON.parse(data);
      } catch (e) {
        console.error('Erro ao converter JSON:', e);
      }
    }

    json.push(newUser);

    fs.writeFile(filePath, JSON.stringify(json, null, 2), err => {
      if (err) {
        console.error('Erro ao salvar:', err);
        return res.status(500).send('Erro ao salvar os dados');
      }

      res.send('Dados salvos com sucesso!');
    });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

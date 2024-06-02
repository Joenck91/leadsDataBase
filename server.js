const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Luis@1991', // substitua pelo seu password
  database: 'filedata' // substitua pelo nome do seu banco de dados
});

connection.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao MySQL: ', err);
    return;
  }
  console.log('Conectado ao MySQL.');
});

app.get('/tabelas', (req, res) => {
  const query = 'SHOW TABLES';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao recuperar os dados da tabela: ', err);
      res.status(500).send('Erro ao recuperar os dados da tabela.');
      return;
    }
    const tableNames = results.map(row => Object.values(row)[0]);
    res.json(tableNames);
  });
});

app.get('/tabelas/:tableName', (req, res) => {
  const tableName = req.params.tableName;
  connection.query(`SELECT * FROM ??`, [tableName], (error, results) => {
    if (error) {
      console.error('Erro ao recuperar dados da tabela: ', error);
      res.status(500).send('Erro ao recuperar dados da tabela.');
      return;
    }
    res.json(results);
  });
});

app.post('/update-cell', (req, res) => {
  const { tableName, id, key, value } = req.body;
  console.log(`Atualizando ${tableName} set ${key} = ${value} where id = ${id}`);
  const query = `UPDATE ?? SET ?? = ? WHERE id = ?`;
  connection.query(query, [tableName, key, value, id], (error, results) => {
    if (error) {
      console.error('Erro ao atualizar a célula: ', error);
      res.status(500).send('Erro ao atualizar a célula.');
      return;
    }
    console.log('Resultados da atualização:', results);
    res.json({ message: 'Célula atualizada com sucesso', results });
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

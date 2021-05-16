const fs = require('fs')
const path = require('path')
const express = require('express')
const app = express()

app.use(express.static('pub'))
app.listen(3000, () => {
console.log('Escuchando en: http://localhost:3000');
});
app.get('/', (request, response) => {
response.sendFile(path.resolve(__dirname, 'index.html'))
})

app.get('/showFilesList', (request, response) => {
  fs.readdir(path.resolve(__dirname, 'priv/'), 'utf8', (err, files) => {
    if (err) {
      onError(err);
      return;
    }
    console.log(files);
    response.json(files);
  })
})
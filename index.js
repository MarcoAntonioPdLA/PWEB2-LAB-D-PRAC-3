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
    response.json(files);
  })
})

app.get('/create', (request, response) => {
	fs.readFile(path.resolve(__dirname, 'create.html'), 'utf8',
		(err, data) => {
			if (err) {
				console.error(err)
				response.status(500).json({
					error: 'message'
				})
				return
			}
			response.json({
				text: data
			})
		})
})

app.get('/view', (request, response) => {
	fs.readFile(path.resolve(__dirname, 'view.html'), 'utf8',
		(err, data) => {
			if (err) {
				console.error(err)
				response.status(500).json({
					error: 'message'
				})
				return
			}
			response.json({
				text: data
			})
		})
})
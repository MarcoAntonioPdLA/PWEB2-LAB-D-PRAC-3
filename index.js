const fs = require('fs')
const path = require('path')
const express = require('express')
const bp = require('body-parser')
const MarkdownIt = require('markdown-it'), md = new MarkdownIt();
const app = express()

app.use(express.static('pub'))
app.listen(3000, () => {
console.log('Escuchando en: http://localhost:3000');
});
app.use(bp.json())
app.use(bp.urlencoded({
extended: true
}))
app.get('/', (request, response) => {
response.sendFile(path.resolve(__dirname, 'index.html'))
})

//Función para devolver la lista de los archivos
app.get('/showFilesList', (request, response) => {
  fs.readdir(path.resolve(__dirname, 'priv/'), 'utf8', (err, files) => {
    if (err) {
      console.log('Algo anda mal. D:')
			console.log(err)
      return;
    }
    response.json(files);
  })
})

//Función para devolver la lectura de un archivo
app.post('/readFile', (request,response) =>{
	let fileName = request.body.title;
	fs.readFile(path.resolve(__dirname, 'priv/'+ fileName), 'utf8', (err, file) => {
		if (err) {
			console.log('Algo anda mal. D:')
			console.log(err)
			return;
		}
		response.setHeader("Content.-Type","application/json");
    response.end(
      JSON.stringify({
				originalText: file,
        htmlText: md.render(file),
      })
    );
	});
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
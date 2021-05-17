//Con estos 2 métodos se enlistan los archivos
//Método que hace la consulta al servidor
function showFilesList() {
  const url = 'http://localhost:3000/showFilesList';
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      document.querySelector('#result').innerHTML = getMdFiles(data);
    }
  );
}
//Método que estructura la forma en que se verán los archivos
function getMdFiles(data) {
  let content = '\n<h2>Archivos</h2>\n';
  content += '<ul>\n';
  for (let i = 0; i < data.length; i++){
    content += '  <li onclick = "readFile(this.innerHTML)">' + data[i] + '</li>\n';
  } 
  content += "</ul>\n";

  console.log(content);
  return content;
}

function readFile(file) {
  console.log(file);
}

function nuevoArchivo(){//esta funcion muestra el formulario
//formulario
console.log(html);
document.querySelector('#paginaCrear').innerHTML=html;//cuando hacemos click en el menu  para crear un nuevo archivo nos manda al formulario para llenarlo
sentInformation();
}

function sentInformation(){//sacar la informacion del formulario qeu enviaron del cliente
    
  const nombreFile=document.querySelector('#nombreArchivo')//guarda el nombre del archivo
  const textoFile =document.querySelector('#textoDelMarkdown')//guarda el contenido del textarea
  document.querySelector('#formulario').onsubmit=()=>{//luego de hacer submit en el formulario nos envia a la funcion guardar
      console.log(textoFile.value)
      console.log(nombreFile.value)
      save(textoFile,value,nombreFile.value)//this funcion
      return false;
  }
}
function save(text,nombreArchivo){
  const link='http://localhost:3000/guardarServidor'//la apliacion del servidor se debe llamar;

  const data={
    texto:text,
    nomb:nombreArchivo
      }
  console.log(data)
  const request={
      method:'POST',
      headers:{
          'Content-Type':'aplication/json',
      },
      body: JSON.stringify(data),
  }
  fetch(link,request)
  explorar();
}

//Esta función va al final
document.addEventListener("DOMContentLoaded", function() {
  showFilesList();
})
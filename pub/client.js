function showFilesList() {
  const url = 'http://localhost:3000/showFilesList';
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      document.querySelector('#files').innerHTML = getMdFiles(data);
    }
  );
}

function getMdFiles(data) {
  let content = '<h2>Archivos</h2>\n';
  content += '<ul>\n';
  for (let i = 0; i < data.length; i++){
    content += '  <li>' + data[i] + "</li>\n";
  } 
  content += "</ul>\n";

  console.log(content);
  return content;
}

document.addEventListener("DOMContentLoaded", function() {
  showFilesList();
})
    


function enviarInformacion(){
    
  const nombre=document.querySelector('#nombreArchivo')
  const texto =document.querySelector('#textoDelMarkdown')
  document.querySelector('#form').onsubmit=()=>{
      console.log(texto.value)
      console.log(nombre.value)
      guardar(texto,value,nombre.value)
      return false;
  }
}

function guardar(text,nombreArchivo){
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
      body:JSON.stringify(data),
  }
  fetch(url,request)
  explorar();
}



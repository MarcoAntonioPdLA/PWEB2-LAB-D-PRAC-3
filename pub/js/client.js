//Función para hacer responsivo el sitio web. Oculta el menú de acuerdo al tamaño de la ventana.
function hiddenMenu(){
    var x = document.getElementById("myMenu");
    if (x.className === "menu") {
        x.className += " responsive";
    } else {
        x.className = "menu";
    }
}  

//Con estas 2 funciones se enlistan los archivos
//Función que hace la consulta al servidor
function showFilesList() {
    const url = 'http://localhost:3000/showFilesList';
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        document.querySelector('#result').innerHTML = getMdFiles(data);
      }
    );
}
//Función que estructura la forma en que se verán los archivos
function getMdFiles(data) {
    let formats = {'md':'md_100x100.png', 'txt': 'txt_100x100.png', 'unknown':'unknown_100x100.png'}
    let content = '';

    for (let i = 0; i < data.length; i++){
        let dataSplit = data[i].split('.');
        let format = dataSplit[dataSplit.length - 1];
        let imagePath = formats[format];
        if(imagePath === undefined) imagePath = formats['unknown'];
        content += '<div onclick="javascript:readFile(this.innerHTML);"><img src="/img/' + imagePath + '"/><p>' + data[i] + '</p></div>\n';
    } 
    return content;
}

//Con estas dos funciones se crea el formulario para crear un nuevo archivo y se guarda
//Función que muestra el formulario
function createNewFile(){
    //Formulario
    let form = '<form id = "fileForm">' + 
                    'Nombre del Archivo: <input type="text" id="fileName" name="title" > <br>' + 
                    'Contenido: <br> <textarea id = "fileContent" rows="7" cols="50"></textarea> <br>' + 
                    '<input type="submit" value="Guardar"> ' + 
                '</form>';
    document.querySelector('#result').innerHTML = form;//cuando hacemos click en el menu  para crear un nuevo archivo nos manda al formulario para llenarlo
    sendInformation();
    }
    
function sendInformation(){//sacar la informacion del formulario qeu enviaron del cliente
    const fileName=document.querySelector('#fileName')//guarda el nombre del archivo
    const fileContent =document.querySelector('#fileContent')//guarda el contenido del textarea
    document.querySelector('#fileForm').onsubmit=()=>{//luego de hacer submit en el formulario nos envia a la funcion guardar
    console.log(fileName.value)
    console.log(fileContent.value)
    save(textoFile,value,fileName.value)//this funcion
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
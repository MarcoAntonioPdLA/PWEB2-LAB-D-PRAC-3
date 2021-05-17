//Función para hacer responsivo el sitio web. Oculta el menú de acuerdo al tamaño de la ventana.
function hiddenMenu(){
    var x = document.getElementById("myMenu");
    if (x.className === "menu") {
        x.className += " responsive";
    } else {
        x.className = "menu";
    }
}  

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
    let content = '';
    //content += '<ul>\n';
    for (let i = 0; i < data.length; i++){
        content += '<div onclick="javascript:readFile(this.innerHTML);"><img src="/img/mdown_150x150.png"/><p>' + data[i] + '</p></div>\n';
    } 
    //content += "</ul>\n";

    console.log(content);
    return content;
}

//Función de prueba
function readFile(file) {
    console.log(file);
}

function newFile(){ //esta funcion muestra el formulario
//formulario

    var html = '<form id = "formulario">' + 
                    'Nombre del Archivo: <input type="text" id="nombreArchivo" name="title" > <br>' + 
                    'Texto: <br> <textarea id = "textoDelMarkdown" rows="7" cols="50"></textarea> <br>' + 
                    '<input type="submit" value="Guardar"> ' + 
                '</form>';

    console.log(html);

    document.querySelector('#result').innerHTML=html;//cuando hacemos click en el menu  para crear un nuevo archivo nos manda al formulario para llenarlo
    sentInformation();
}

function sendInformation(){//sacar la informacion del formulario qeu enviaron del cliente
    
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


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
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
    
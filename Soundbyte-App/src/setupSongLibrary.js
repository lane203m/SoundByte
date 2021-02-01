const fs = require('electron').remote.require('fs');

const form = document.querySelector("form");
const fileInput = document.querySelector("#song-library");
const fileCustom = document.querySelector(".file-custom"); 

let pathName = "";
let tempFileName ="";

fileInput.addEventListener('input', (e) => {  
  
  //fileCustom.innerHTML = fileInput.webkitRelativePath;

  Array.from(e.target.files).forEach(file => {
    pathName = file.path;
  });
  
  if(process.platform === 'win32') { // windows
    tempFileName = pathName.replace(/^.*[\///]/, '');
    fileCustom.innerText = pathName.replace(tempFileName, '').match(/.*\\([^\\]+)\\/)[1];

  } else { // Linux, Unix, Mac, etc
    tempFileName = pathName.replace(/^.*[\\\/]/, '');
    fileCustom.innerText = pathName.replace(tempFileName, '').match(/.*\/([^\/]+)\//)[1];

    //console.log(tempFileName);
    //console.log(pathName.replace(tempFileName, '').match(/.*\/([^\/]+)\//)[1]);

  }

});

form.addEventListener('submit', (e) => {
  e.preventDefault(); 

  const libraryPath = './Libraries/songLibrary/';
  const filename = fileInput.value;
  
 // without giving songLibrary file
  let configPath = {
    path: libraryPath + "library.json",
  };

  let data = JSON.stringify(configPath);

  if(filename != "") {
    configPath.path = pathName.replace(tempFileName, '');
    data = JSON.stringify(configPath);

  }
  
  //console.log(pathName.replace(tempFileName, ''));
  console.log(data);
  fs.writeFileSync('./setup/init.json', data);

  //console.log("the form has been submitted");
});

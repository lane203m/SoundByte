const fs = require('electron').remote.require('fs');
const ipcRenderer = require('electron').ipcRenderer;

const form = document.querySelector("form");
const fileInput = document.querySelector("#song-library");
const fileCustom = document.querySelector(".file-custom"); 

fileInput.addEventListener('input', (e) => {  
  let pathName = "";
  //fileCustom.innerHTML = fileInput.webkitRelativePath;

  Array.from(e.target.files).forEach(file => {
    pathName = file.path;
  });

  console.log(pathName);
});


form.addEventListener('submit', (e) => {
  e.preventDefault(); 

  const libraryPath = './Libraries/songLibrary/';
  const filename = fileInput.value;
  
  if(filename == ""){ // without giving songLibrary file
    let configPath = {
      path: libraryPath + "library.json",
    };

    let data = JSON.stringify(configPath);

  } else {
    // with songLibrary file(json)
      // Step 1. get the file from user input and copy it under setup directory
    console.log(e.target.song-library.files);



    // Step 2. make init.json with "path": "json file name"
    let configPath = {
      path: `${fileInput.value.replace(/^.*[\\\/]/, '') }`,
    };

    let data = JSON.stringify(configPath);
    
    fs.writeFileSync('init.json', data);
  }
 
  console.log("the form has been submitted");
});

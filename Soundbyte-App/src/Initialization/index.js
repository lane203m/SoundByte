const fs = require('electron').remote.require('fs');

const form = document.querySelector("form");
const fileInput = document.querySelector("#song-library");
const fileCustom = document.querySelector(".file-custom"); 

const move = (url) => {
  location.replace(url)
}

let currentPathName = "";
let filename ="";

fileInput.addEventListener('input', (e) => { 
  // description: 
  // this function retrieves and returns directory name(absolute path) 
  // the user choose in the form input box 
  const target = e.target;

  if(target.files.length > 0 ){
    const node = target.files[0];
    if(process.platform === 'win32') {
      currentPathName = node.path.split(node.webkitRelativePath)[0] + node.webkitRelativePath.match(/([^\/]+)/)[0] + '\\';
    } else {
      currentPathName = node.path.split(node.webkitRelativePath)[0] + node.webkitRelativePath.match(/([^\/]+)/)[0] + '/';
    }

    fileCustom.innerText = node.webkitRelativePath.match(/([^\/]+)/)[0] + '/';
    //console.log(currentPathName);
    //console.log(node.path.split(node.webkitRelativePath)[0] + node.webkitRelativePath.match(/([^\/]+)/)[0] + '/');
  } else {
    console.log(error, "error :");
  }

});

form.addEventListener('submit', (e) => {
  // Description:
  //  this function write init.json or library.json file to initialize the app
  //  1. library path status: No currentPathName( empty string ) / custom directory (currentPathName is not empty )
  //  2. Platform/OS status: windows(win32) / linux like OSs 
  e.preventDefault(); 

    // without giving songLibrary file
  const configPath = {
    path: './Libraries/songLibrary/library.json',
  };

  //console.log(currentPathName);
  //return;

  if(currentPathName != '') { // this means if a user gives a library path or the configPath will be used as it was.
    configPath.path = currentPathName;
  }
  
  let data = JSON.stringify(configPath);
  
  //console.log(configPath);
  //console.log(data);
  let writePath = __dirname + '/init.json';
  if(process.platform === 'win32') {
    writePath = __dirname + '\\init.json';
  }

  //console.log(writePath);
  //return;

  fs.writeFileSync(writePath, data);

  move("../index.html");
  //console.log("the form has been submitted");
  //console.log(configPath);  
  return;
});

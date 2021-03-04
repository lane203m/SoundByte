const fs = require('electron').remote.require('fs');
const {LibraryBuilder} = require("../buildJSON/LibraryBuilder");
const form = document.querySelector("form");
const fileInput = document.querySelector("#song-library");
const fileCustom = document.querySelector(".file-custom"); 
path = require('path')

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
      
      //ensures only paths are being saved - not files. 
      var onlyPath = require('path').dirname(currentPathName);
      currentPathName = onlyPath;
    } else {
      currentPathName = node.path.split(node.webkitRelativePath)[0] + node.webkitRelativePath.match(/([^\/]+)/)[0] + '/';
    }

    fileCustom.innerText = node.webkitRelativePath.match(/([^\/]+)/)[0] + '/';

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

  if(currentPathName != '') { // this means if a user gives a library path or the configPath will be used as it was.
    configPath.path = currentPathName;
  }


  if(process.platform === 'win32') {
    configPath.path = path.join(configPath.path , '\\');
  }
  else{
    configPath.path = path.join(configPath.path , '/');
  }
  
  let data = JSON.stringify(configPath);
  
  let writePath = path.join(__dirname , '/..','/init.json');
  if(process.platform === 'win32') {
    writePath = path.join(__dirname , '\\..','\\init.json');
  }

 fs.writeFileSync(writePath, data);   //write directory to our init file

  let libraryJSON = path.join(__dirname , '/../../Libraries/songLibrary/library.json');       //library json. where we save song data. implemented so that user may select their own in the future
  if(process.platform === 'win32') {
    libraryJSON = path.join(__dirname , '\\..\\..\\Libraries\\songLibrary\\library.json');
  }

  writeLibrary(writePath, libraryJSON, configPath.path, openIndex);   //get data, write to json, return to index.

  return;
});

async function writeLibrary(writePath, libraryJSON, filePath, callback){
  libraryBuilder = new LibraryBuilder(writePath, libraryJSON, filePath);  //build the library builder class with paths to use
  var outcome = await libraryBuilder.buildLibrary().then(()=>{                  //build the library
    console.log("done");                                                  
  });
  callback(outcome);                                                      //once finished, handle callback
}

function openIndex(out){                                                  //log status, wait 4000, restart (will enter song menu if correct)
  console.log(out);
  move("../../index.html");
  //setTimeout(() => {  move("../../index.html"); }, 1000);
  
}
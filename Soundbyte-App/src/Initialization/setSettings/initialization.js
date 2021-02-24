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

//var seekInit = '../init.json';
//var seekLibrary = '../../Libraries/songLibrary/library.json';
//if( fs.existsSync(seekInit) && fs.existsSync(seekLibrary)){
//  move("../../index.html");
//}



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


  if(process.platform === 'win32') {
    configPath.path = path.join(configPath.path , '\\');
  }
  else{
    configPath.path = path.join(configPath.path , '/');
  }
  
  let data = JSON.stringify(configPath);
  
  //console.log(configPath);
  //console.log(data);
  let writePath = path.join(__dirname , '/..','/init.json');
  if(process.platform === 'win32') {
    writePath = path.join(__dirname , '\\..','\\init.json');
  }

  //console.log(writePath);
  //return;

  fs.writeFileSync(writePath, data);

  let libraryJSON = path.join(__dirname , '/../../Libraries/songLibrary/library.json');
  if(process.platform === 'win32') {
    libraryJSON = path.join(__dirname , '\\..\\..\\Libraries\\songLibrary\\library.json');
  }


  //let myPromise = new Promise(function(myResolve, myReject) {
    // "Producing Code" (May take some time)

      //while (outcome != 0) {

     // }
      //if (outcome == 0) myResolve(); // when successful
      //else myReject();  // when error
    //});

    //myPromise.then(
      //function(value) {  move("../../index.html") },
      //function(error) {  move("./initialization.html") }
    //);
  writeLibrary(writePath, libraryJSON, configPath.path, openIndex);

  //move("../../index.html")
  //console.log("the form has been submitted");
  //console.log(configPath);  
  return;
});

function writeLibrary(writePath, libraryJSON, filePath, callback){
  libraryBuilder = new LibraryBuilder(writePath, libraryJSON, filePath);
  var outcome = libraryBuilder.buildLibrary().then(()=>{
    console.log("done");
  });
  callback(outcome);
}

function openIndex(out){
  console.log(out);
  setTimeout(() => {  move("../../index.html"); }, 4000);
  
}
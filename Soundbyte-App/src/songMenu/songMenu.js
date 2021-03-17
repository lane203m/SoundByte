const {LibraryData} = require("../Types/LibraryData");
const fs = require('electron').remote.require('fs');
const {Song} = require("../Types/Song");
const {Feature} = require("../Types/Feature"); 
const {SuggestionWSong, SuggestionWRandom} = require("../Suggestion/suggestions")
const contentTarget = document.querySelector(".item-wraper");
const fileCustom = document.querySelector(".file-custom");
const playback = document.querySelector(".time-control")
const path = require('path');


// get Initial library and the song path in the library
// caution for the current directory ./ is equivalent to src/ directory
const libraryPath = path.resolve("./Initialization/init.json"); 
if(libraryPath == undefined || libraryPath == null){
  console.log(libraryPath);
  console.log(fs.existsSync(libraryPath.path));
  console.log(libraryPath.path);
  fs.unlinkSync('./initialization/init.json');
  alert("No Initialization File Found");
  location.replace('../index.html');
}
const songLibraryJSON = JSON.parse(fs.readFileSync(libraryPath));

var songPath = songLibraryJSON.path;
if(songPath == undefined || songPath == null || songPath == "" || !fs.existsSync(songPath)){
  fs.unlinkSync('./initialization/init.json');
  alert("Invalid Folder in ini");
  location.replace('../index.html');
}

var songLibrary = new LibraryData();


if(songLibrary == undefined || songLibrary == null || songLibrary.songs == null || songLibrary.songs == undefined || songLibrary.songs.length <=0){
  fs.unlinkSync('./initialization/init.json');
  alert("No songs in library");
  location.replace('../index.html');
}


var filteredLibrary = songLibrary;
var selectedSong = "-1";

//songLength helper function
function convertMinSec(miliSec){
  return (Math.floor(miliSec/60) + ":" +Math.floor(miliSec % 60));
}

//Playback functions by Bian on Feb 24, 2021
// Change the player status each
const changeState = (state) => {
  if(state.getAttribute("data-isPlay") == 0) {
    state.setAttribute("data-isPlay", 1);
  } else {
    state.setAttribute("data-isPlay", 0);
  }
}

const addPlayback = (target) => {
  const playerTarget = document.querySelector(".player");
  let player = playback.cloneNode(true);
  let playerUrl = "";
  
  //console.log(player.style.visibility);
  target.childNodes.forEach(childNode => {    
    childNode.firstChild.addEventListener('click', () => {
      //console.log(childNode.getAttribute("data-isPlay"));

      //other play buttons change to stop
      target.childNodes.forEach(subChild => {        
        subChild.firstChild.src = "../img/play-button.png";
        if(subChild != childNode) subChild.setAttribute("data-isPlay", 0);
      });
      
      changeState(childNode);

      if(childNode.getAttribute("data-isPlay") == 0) {
        childNode.firstChild.src = "../img/play-button.png";
        childNode.nextSibling.style.visibility='hidden';
      } else {
        // console.log(songPath + childNode.getAttribute("data-filename"));
        childNode.firstChild.src = "../img/stop-button.png";
        childNode.parentNode.insertBefore(player, childNode.nextSibling);
        childNode.nextSibling.style.visibility='visible';
        
        playerUrl = songPath + childNode.getAttribute("data-filename");
        //playerTarget.src = playerUrl.match(/(\/[^\/].*?\/)((?:[^\/]|\\\/)+?)(?:(?<!\\)\s|$)/gm)[0];
        //console.log(playerUrl.match(/(\/[^\/].*?\/)((?:[^\/]|\\\/)+?)(?:(<!\\)\s|$)/gm)[0]);
        //playerTarget.src = playerUrl.match(/(\/[^\/].*?\/)((?:[^\/]|\\\/)+?)(?:(<!\\)\s|$)/gm)[0];
        //playerTarget.play();
        
        console.log(playerUrl);
        const audio = new Audio(playerUrl);
        audio.play();
      }

    });
  });
}
//Playback functions: End


// no longer use of the function : comment out by Brian Feb 27, 2021
/* function showSongs() {
    let songLibrary = new LibraryData();
    //songLibrary.songs.forEach((i,song) => console.log(songLibrary.songs.indexOf(i)));
    for (let i = 0; i<songLibrary.songs.length; i++){
        let node = document.createElement("BUTTON");
        let textnode = document.createTextNode(songLibrary.songs[i].features.bpm);
        node.appendChild(textnode);
        document.getElementById("songList").appendChild(node);
    }
    
} */

//Added by Brian
const listupSongs = (library, isSuggestion) => {   

    //let library = new LibraryData();
    //console.log(library.songs);
    //console.log(library);

    library.songs.forEach((i, m, song) => {
        //console.log(song[m]);
    let node = document.createElement("div");
    let img = new Image();  
    let sname = document.createElement("h3");
    let detailDiv = document.createElement("div");
    let detailSpan = document.createElement("h4");
    let durationDiv = document.createElement("div");
    let checksDiv = document.createElement("div");
    let checkInput = document.createElement("input");

    //console.log(song[m].songFile);

    sname.innerText = song[m].songName;
    node.setAttribute("data-filename", song[m].songFile);
    img.src = "../img/play-button.png";
    detailSpan.innerText = Math.floor(song[m].features.bpm) + " bpm / " + song[m].features.key + " key / " + song[m].features.scale + " scale";
    durationDiv.innerText = convertMinSec(song[m].songLength);

    node.classList.add("item");
    node.setAttribute("data-isPlay", 0);
    detailDiv.classList.add("song-detail");
    durationDiv.classList.add("duration");
    
    if(!isSuggestion) {
      checkInput.setAttribute("type", "checkbox");
      checkInput.setAttribute("value", m);
      checkInput.setAttribute("id", m);
      checkInput.setAttribute("onClick", "buttonSelected(this.id)");
      checksDiv.appendChild(checkInput);
    }
    
    node.appendChild(img);    
        
    detailDiv.appendChild(sname);
    detailDiv.appendChild(detailSpan);
    
    node.appendChild(detailDiv);
    node.appendChild(durationDiv);
    node.appendChild(checksDiv);

    contentTarget.appendChild(node);
    });

    addPlayback(contentTarget);
}

listupSongs(filteredLibrary, false);


// Users pick a song from fiel input
const customSongTarget = document.querySelector("#song-library");
customSongTarget.addEventListener('input', (e) => {
    const targetDiv = document.querySelector(".user-song");
    fileCustom.innerText = e.target.value.replace(/^.*[\\\/]/, '');
    //console.log(e.target.value.replace(/^.*[\\\/]/, ''));

    let node = document.createElement("div");
    let img = new Image();  
    let sname = document.createElement("h3");
    let detailDiv = document.createElement("div");
    let detailSpan = document.createElement("h4");
    let durationDiv = document.createElement("div");
    let checksDiv = document.createElement("div");
    let checkInput = document.createElement("input");

    sname.innerText = fileCustom.innerText;
    img.src = "../img/play-button.png";
    detailSpan.innerText = " bpm / key / scale";
    durationDiv.innerText = "2:32";

    node.classList.add("item");
    detailDiv.classList.add("song-detail");
    durationDiv.classList.add("duration");
    checkInput.setAttribute("type", "checkbox");
    checkInput.setAttribute("value", 1);
    
    checksDiv.appendChild(checkInput);
    node.appendChild(img);
    
    detailDiv.appendChild(sname);
    detailDiv.appendChild(detailSpan);
    
    node.appendChild(detailDiv);
    node.appendChild(durationDiv);
    node.appendChild(checksDiv);

    targetDiv.appendChild(node);

    addPlayback(contentTarget);
});


function buttonSelected(selectedID){
  if(selectedSong != -1){
    
    deselectExisting(selectedSong);
  }
  if(selectedSong == selectedID){
    document.getElementById('startButton').innerHTML = "Auto";
    selectedSong = -1;
  }
  else{
    document.getElementById('startButton').innerHTML = "Start";
    selectedSong = selectedID;
    document.getElementById(selectedSong).checked = true;
  }
}

function deselectExisting(deselectedID){
  document.getElementById(deselectedID).checked = false;
}

function buttonDeselected(){

}

async function sendSelected(callback){
  if(selectedSong == -1){
    console.log("doing random");
    suggestion = new SuggestionWRandom(filteredLibrary);
    await suggestion.beginSuggestion();
    console.log(suggestion);
    callback();
    //let songLibraryPath = path.resolve("./Libraries/songLibraries");
    // console.log(songPath);

    document.querySelector(".item-title.item-library").innerHTML = "Suggestions";
    document.querySelector(".button").removeChild(document.querySelector(".button").firstChild);
    while(contentTarget.firstChild) {
      contentTarget.removeChild(contentTarget.firstChild);
    }

    listupSongs(suggestion.results, true);
  }
  else if(selectedSong != -1){
    let song = filteredLibrary.songs[selectedSong];
    suggestion = new SuggestionWSong(song);
    await suggestion.beginSuggestion();
    // console.log(suggestion);
    console.log(suggestion);
    callback();
    
    // console.log(suggestion);
    // console.log(suggestion.results);

    // song path has to be changed according to the context(in this case, it should be suggestion library)
    // again the relative direcotry './' means 'src/' please notice this
    // songPath = getLibraryPath("./Libraries/songLibrary/library.json");
    //songLibraryPath = path.resolve("./Libraries/songLibraries");
    // console.log(songPath);

    document.querySelector(".item-title.item-library").innerHTML = "Suggestions";
    document.querySelector(".button").removeChild(document.querySelector(".button").firstChild);
    while(contentTarget.firstChild) {
      contentTarget.removeChild(contentTarget.firstChild);
    }

    listupSongs(suggestion.results, true);
  }
}

function timeOutCallback(){
  setTimeout(() => { console.log("calling back"); }, 3000);
}



//Navigation
document.querySelectorAll(".navButton")[0].addEventListener('click', () => {
  location.replace('./songMenu.html');
});

// configuration nav
document.querySelector(".setup-button").addEventListener('click', () => {
  location.replace('../initialization/setSettings/config.html');
});





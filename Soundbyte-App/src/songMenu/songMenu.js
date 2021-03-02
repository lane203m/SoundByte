const {LibraryData} = require("../Types/LibraryData");
const fs = require('electron').remote.require('fs');
const {Song} = require("../Types/Song");
const {Feature} = require("../Types/Feature"); 
const {SuggestionWSong} = require("../Suggestion/suggestions")
const contentTarget = document.querySelector(".item-wraper");
const fileCustom = document.querySelector(".file-custom");
const playback = document.querySelector(".time-control")
const path = require('path');


// get Initial library and the song path in the library
// caution for the current directory ./ is equivalent to src/ directory

const libraryPath = path.resolve("./Initialization/init.json"); 
const songLibraryJSON = JSON.parse(fs.readFileSync(libraryPath));
var songPath = songLibraryJSON.path;

var songLibrary = new LibraryData();
var filteredLibrary = songLibrary;
var selectedSong = "-1";

//songLength helper function
const convertMinSec = (miliSec) => {
  return Math.floor(miliSec/60) + ":" +Math.floor(miliSec % 60);
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

      //console.log(childNode.getAttribute("data-isPlay"));
      //console.log(childNode.getAttribute("data-isPlay"));
      if(childNode.getAttribute("data-isPlay") == 0) {
        childNode.firstChild.src = "../img/play-button.png";
        childNode.nextSibling.style.visibility='hidden';
      } else {
        // console.log(songPath + childNode.getAttribute("data-filename"));
        childNode.firstChild.src = "../img/stop-button.png";
        childNode.parentNode.insertBefore(player, childNode.nextSibling);
        childNode.nextSibling.style.visibility='visible';
        
        playerTarget.src = songPath + childNode.getAttribute("data-filename");
        playerTarget.play();
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

    let songLength = convertMinSec(song[m].songLength);

    //console.log(song[m].songFile);

    sname.innerText = song[m].songName;
    node.setAttribute("data-filename", song[m].songFile);
    img.src = "../img/play-button.png";

    detailSpan.innerText = song[m].features.bpm + " bpm / " + song[m].features.key + " key / " + song[m].features.scale + " scale";
    var time = calculateTime(song[m].songLength);
    durationDiv.innerText = time[0]+":"+time[1];


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

        /*
        //return (`
        //<div class="item">
         //   <img src="../img/play-botton.png" alt="sound play button">
          //      <div class="song-detail">
        //        <h3>${song.songName}</h3>
        //        <span>${song.bpm} / ${song.key} / ${song.scale}</span>
        //        </div>
        //        <div class="duration">
        //        </div>
        //        <div class="checks"><input type="checkbox"></div>        
        //</div>
        //`);
        */
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
    selectedSong = -1;
  }
  else{
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
  if(selectedSong != -1){
    let song = filteredLibrary.songs[selectedSong];
    suggestion = new SuggestionWSong(song);
    await suggestion.beginSuggestion();
    // console.log(suggestion);
    console.log(suggestion.results);
    callback();
    
    // console.log(suggestion);
    // console.log(suggestion.results);

    // song path has to be changed according to the context(in this case, it should be suggestion library)
    // again the relative direcotry './' means 'src/' please notice this
    // songPath = getLibraryPath("./Libraries/songLibrary/library.json");
    songPath = path.resolve("./Libraries/songLibraries");
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

function calculateTime(time){
  var minutes = Math.floor(time / 60);
  var seconds = Math.floor(time - (minutes*60));
  console.log(minutes);
  console.log(seconds);
  return [minutes, seconds];
}


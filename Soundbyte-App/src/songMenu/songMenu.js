const {LibraryData} = require("../Types/LibraryData");
const fs = require('electron').remote.require('fs');
const {Song} = require("../Types/Song");
const {Feature} = require("../Types/Feature"); 
const {SuggestionWSong} = require("../Suggestion/suggestions")
const contentTarget = document.querySelector(".item-wraper");
const fileCustom = document.querySelector(".file-custom");

var songLibrary = new LibraryData();
var filteredLibrary = songLibrary;
var selectedSong = "-1";

//Playback function by Bian on Feb 24, 2021
const addPlayback = (target) => {
  target.childNodes.forEach(childNode => {
    childNode.addEventListener('click', () => {
      // temporary returns: need to be completed with real working code
      console.log(childNode.firstChild.nextSibling.firstChild.innerText);
    });
  });
}

console.log(songLibrary);


function showSongs() {
    let songLibrary = new LibraryData();
    //songLibrary.songs.forEach((i,song) => console.log(songLibrary.songs.indexOf(i)));
    for (let i = 0; i<songLibrary.songs.length; i++){
        let node = document.createElement("BUTTON");
        let textnode = document.createTextNode(songLibrary.songs[i].features.bpm);
        node.appendChild(textnode);
        document.getElementById("songList").appendChild(node);
    }
    
}


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

    sname.innerText = song[m].songName;
    img.src = "../img/play-button.png";

    detailSpan.innerText = Math.floor(song[m].features.bpm) + " bpm / " + song[m].features.key + " key / " + song[m].features.scale + " scale";
    durationDiv.innerText = song[m].songLength;


    node.classList.add("item");
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


//Added by brian
const suggestSongs = () => {

}

// Users pick a song from fiel input
const customSongTarget = document.querySelector("#song-library");
customSongTarget.addEventListener('input', (e) => {
    const targetDiv = document.querySelector(".user-song");
    fileCustom.innerText = e.target.value.replace(/^.*[\\\/]/, '');
    console.log(e.target.value.replace(/^.*[\\\/]/, ''));

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
    console.log(suggestion);
    console.log(suggestion.results);
    callback();
    
    //console.log(suggestion);
    //console.log(suggestion.results);
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




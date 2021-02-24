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

console.log(songLibrary);

function showSongs() {
    let songLibrary = new LibraryData();
    //songLibrary.songs.forEach((i,song) => console.log(songLibrary.songs.indexOf(i)));
    //console.log(songLibrary.songs);
    for (let i = 0; i<songLibrary.songs.length; i++){
        let node = document.createElement("BUTTON");
        let textnode = document.createTextNode(songLibrary.songs[i].features.bpm);
        node.appendChild(textnode);
        document.getElementById("songList").appendChild(node);
    }
    
}


//Added by Brian
const listupSongs = () => {   

    //let library = new LibraryData();
    //console.log(library.songs);

    filteredLibrary.songs.forEach((i, m, song) => {
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
    detailSpan.innerText = song[m].features.bpm + " / " + song[m].features.key + " / " + song[m].features.scale;
    durationDiv.innerText = "2:32";

    node.classList.add("item");
    detailDiv.classList.add("song-detail");
    durationDiv.classList.add("duration");
    checkInput.setAttribute("type", "checkbox");
    checkInput.setAttribute("value", m);
    checkInput.setAttribute("id", m);
    checkInput.setAttribute("onClick", "buttonSelected(this.id)");
    checksDiv.appendChild(checkInput);
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
}

listupSongs();

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


function sendSelected(callback){
  if(selectedSong != -1){
    var song = filteredLibrary.songs[selectedSong];
    suggestion = new SuggestionWSong(song);
    suggestion.beginSuggestion();
    console.log(suggestion);
    callback();
  }
}

function timeOutCallback(){
  setTimeout(() => { console.log("calling back"); }, 3000);
}
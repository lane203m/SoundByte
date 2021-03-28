const fs = require('electron').remote.require('fs');
const path = require('path');
const contentTarget = document.querySelector(".item-wraper");
const resultsPath = path.resolve("./Libraries/savedResults/libraryResults.json");
let libraryResults = JSON.parse(fs.readFileSync(resultsPath));

//songLength helper function
function convertMinSec(miliSec) {
  if(miliSec % 60 < 10){
    return (Math.floor(miliSec/60) + ":0" +Math.floor(miliSec % 60));
  }
  else{
    return (Math.floor(miliSec/60) + ":" +Math.floor(miliSec % 60));
  }  
}

// Playback functions by Bian on Feb 24, 2021
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
  
  // console.log(player.style.visibility);
  target.childNodes.forEach(childNode => {    
    childNode.firstChild.addEventListener('click', () => {
      // console.log(childNode.getAttribute("data-isPlay"));

      // other play buttons change to stop
      target.childNodes.forEach(subChild => {        
        subChild.firstChild.src = "../img/play-button.png";
        if(subChild != childNode) subChild.setAttribute("data-isPlay", 0);
      });
      
      changeState(childNode);

      if(childNode.getAttribute("data-isPlay") == 0) {
        childNode.firstChild.src = "../img/play-button.png";
        childNode.nextSibling.style.visibility='hidden';
        audio.pause();
      } else {
        audio.pause();
        // console.log(songPath + childNode.getAttribute("data-filename"));
        childNode.firstChild.src = "../img/stop-button.png";
        childNode.parentNode.insertBefore(player, childNode.nextSibling);
        childNode.nextSibling.style.visibility='visible';
        
        playerUrl = songPath + childNode.getAttribute("data-filename");

        // console.log(playerUrl);
        audio = new Audio(playerUrl);
        audio.play();
      }

    });
  });
}
// Playback functions: End
const deleteJson = (library, index) => {
  for (let i = 0; i < library.length; i++) {
    if(index == i) {
      library.splice(i, 1);
    }
  }
}

const deleteLibrary = () => {
  const target = document.querySelector(".item-wraper");
  let checked = 0;

  target.childNodes.forEach((item) => {
    if(item.childNodes[3].firstChild.checked) {
      checked ++;
    }
  });

  if( checked > 0) {
    for(let i = 0; i < target.childNodes.length; i++) {
      if(target.childNodes[i].childNodes[3].firstChild.checked) {
        target.childNodes[i].remove();
        deleteJson(libraryResults.songs, i);
        // libraryResults.songs.remove(i);
        // removeFromLibrary(item)
      }
    }
    console.log(libraryResults);
    fs.writeFileSync(resultsPath, JSON.stringify(libraryResults));

  } else {
    alert("No song(s) selected..");
  }
  
}

if (libraryResults.songs.length > 0) {
  let target = document.querySelector(".buttons");
  const deleteButton = document.createElement("button");
  deleteButton.setAttribute("type", "button");
  deleteButton.setAttribute("onClick", "deleteLibrary()");
  deleteButton.innerText = "Delete";
  target.appendChild(deleteButton);

  libraryResults.songs.forEach((i, m, song) => {
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
    
    checkInput.setAttribute("type", "checkbox");
    checkInput.setAttribute("value", m);
    checkInput.setAttribute("id", m);
    checkInput.setAttribute("class", "select-for-delete");

    checksDiv.appendChild(checkInput);

    node.appendChild(img);        
    detailDiv.appendChild(sname);
    detailDiv.appendChild(detailSpan);
    
    node.appendChild(detailDiv);
    node.appendChild(durationDiv);
    node.appendChild(checksDiv);

    contentTarget.appendChild(node);

  });
}

// console.log(libraryResults);


//Navigation - calibration the url ( the other navigation defined on /src/index.js )
document.querySelectorAll(".navButton")[1].addEventListener('click', () => {
  location.replace('./index.html');
});

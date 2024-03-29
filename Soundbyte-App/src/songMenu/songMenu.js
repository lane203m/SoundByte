const { LibraryData } = require("../Types/LibraryData");
const fs = require('electron').remote.require('fs');
const { Song } = require("../Types/Song");
const { Feature } = require("../Types/Feature");
const { SuggestionWSong, SuggestionWFeature, SuggestionWRandom } = require("../Suggestion/suggestions")
const contentTarget = document.querySelector(".item-wraper");
const fileCustom = document.querySelector(".file-custom");
const playback = document.querySelector(".time-control")
const path = require('path');
let audio = new Audio();
let suggestion;

// get Initial library and the song path in the library
// caution for the current directory ./ is equivalent to src/ directory
const libraryPath = path.resolve(__dirname, "../", "./Initialization/init.json");
if (!fs.existsSync(libraryPath)) {
  alert("No Initialization File Found");
  location.replace('../index.html');
}
if (libraryPath == undefined || libraryPath == null) {
  fs.unlinkSync(libraryPath);
  alert("No Initialization File Found");
  location.replace('../index.html');
}
const songLibraryJSON = JSON.parse(fs.readFileSync(libraryPath));

var songPath = songLibraryJSON.path;
if (songPath == undefined || songPath == null || songPath == "" || !fs.existsSync(songPath)) {
  fs.unlinkSync(libraryPath);
  alert("Invalid Folder in ini");
  location.replace('../index.html');
}

var songLibrary = new LibraryData();


if (songLibrary == undefined || songLibrary == null || songLibrary.songs == null || songLibrary.songs == undefined || songLibrary.songs.length <= 0) {
  fs.unlinkSync(libraryPath);
  alert("No songs in library");
  location.replace('../index.html');
}


var filteredLibrary = songLibrary;
var selectedSong = "-1";

//for the checkbox
const lastCheckbox = document.querySelector(".checkbox");
var lastCountM = 0;

//songLength helper function
function convertMinSec(miliSec) {
  if (miliSec % 60 < 10) {
    return (Math.floor(miliSec / 60) + ":0" + Math.floor(miliSec % 60));
  }
  else {
    return (Math.floor(miliSec / 60) + ":" + Math.floor(miliSec % 60));
  }

}

// Playback functions by Bian on Feb 24, 2021
// Change the player status each
const changeState = (state) => {
  if (state.getAttribute("data-isPlay") == 0) {
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
        if (subChild != childNode) subChild.setAttribute("data-isPlay", 0);
      });

      changeState(childNode);

      if (childNode.getAttribute("data-isPlay") == 0) {
        childNode.firstChild.src = "../img/play-button.png";
        childNode.nextSibling.style.visibility = 'hidden';
        audio.pause();
      } else {
        audio.pause();
        // console.log(songPath + childNode.getAttribute("data-filename"));
        childNode.firstChild.src = "../img/stop-button.png";
        childNode.parentNode.insertBefore(player, childNode.nextSibling);
        //childNode.nextSibling.style.visibility = 'visible';

        playerUrl = songPath + childNode.getAttribute("data-filename");


        console.log(playerUrl);
        audio = new Audio(playerUrl);
        audio.play();
      }

      if(target.id != "spacer" && document.getElementById("libState").value != 0){
        let inputSong = document.getElementById("spacer");
        inputSong.childNodes.forEach(subChild => {
          subChild.firstChild.src = "../img/play-button.png";
          subChild.setAttribute("data-isPlay", 0);
          
        });
      }
      else if (document.getElementById("libState").value != 0){
        let resultsSong = document.getElementById("item-wraper");
        resultsSong.childNodes.forEach(subChild => {
          subChild.firstChild.src = "../img/play-button.png";
          subChild.setAttribute("data-isPlay", 0);
        });
      }

    });
  });
}
// Playback functions: End

// Added by Brian
const listupSongs = (library, isSuggestion, inputType) => {

  // initialize the count for 0 in order to get eligible id for criteria checkbox
  lastCountM = 0;

  library.songs.forEach((i, m, song) => {
    //console.log(song[m]);
    let node = document.createElement("div");
    let img = new Image();
    let sname = document.createElement("h3");
    let detailDiv = document.createElement("div");
    let detailSpan = document.createElement("h4");
    let durationDiv = document.createElement("div");
    let scoreDiv = document.createElement("div");
    let checksDiv = document.createElement("div");
    let checkInput = document.createElement("input");

    //console.log(song[m].songFile);
    sname.innerText = song[m].songName;
    node.setAttribute("data-filename", song[m].songFile);
    img.src = "../img/play-button.png";
    detailSpan.innerText = Math.floor(song[m].features.bpm) + " bpm / " + song[m].features.key + " key / " + song[m].features.scale + " scale";
    durationDiv.innerText = convertMinSec(song[m].songLength);

    scoreDiv.innerText = "Score: " + song[m].score.toFixed(3);;

    node.classList.add("item");
    node.setAttribute("data-isPlay", 0);
    detailDiv.classList.add("song-detail");
    durationDiv.classList.add("duration");

    if (!isSuggestion) {
      checkInput.setAttribute("type", "checkbox");
      checkInput.setAttribute("value", m);
      checkInput.setAttribute("id", m);
      checkInput.setAttribute("onClick", "buttonSelected(this.id)");
      checksDiv.appendChild(checkInput);
      lastCountM += 1;
    }

    node.appendChild(img);

    detailDiv.appendChild(sname);
    detailDiv.appendChild(detailSpan);

    node.appendChild(detailDiv);
    node.appendChild(durationDiv);
    if (isSuggestion) {
      node.appendChild(scoreDiv);
    }


    node.appendChild(checksDiv);

    contentTarget.appendChild(node);
  });

  if (lastCountM > 0) {
    lastCheckbox.firstElementChild.value = -2;
    lastCheckbox.firstElementChild.id = -2;
  }

  addPlayback(contentTarget);

  document.getElementById("libState").value = inputType

  if (isSuggestion) {
    if (document.getElementById("score") == null || document.getElementById("score") == undefined) {
      const filter = document.getElementById("filterType");
      filter.innerHTML = filter.innerHTML + "Similarity <input type='image' id='score' src='../img/sort-down.png' value='1' onclick='sortByScore(this)'></button>";
      document.getElementById("filterType").innerHTML = filter.innerHTML;
    }
    // When the list is for suggestion, get rid of custom input(criteria search)
    const title = document.querySelector("#sub-title");
    title.innerHTML = "Input";
    const inputs = document.querySelector(".criteria-wrapper");
    const spacer = document.querySelector("#spacer");

    let inputNode = document.createElement("div");
    let inputImg = new Image();
    let inputName = document.createElement("h3");
    let inputDetailDiv = document.createElement("div");
    let inputDetailSpan = document.createElement("h4");
    let inputDurationDiv = document.createElement("div");
    let inputScore = document.createElement("div");


    if (inputType == 1) {
      inputName.innerText = suggestion.input.songName;
      inputNode.setAttribute("data-filename", suggestion.input.songFile);
      inputImg.src = "../img/play-button.png";
      inputDetailSpan.innerText = Math.floor(suggestion.input.features.bpm) + " bpm / " + suggestion.input.features.key + " key / " + suggestion.input.features.scale + " scale";
      inputDurationDiv.innerText = convertMinSec(suggestion.input.songLength);

      inputNode.classList.add("item");
      inputNode.setAttribute("data-isPlay", 0);
      inputDetailDiv.classList.add("song-detail");
      inputDurationDiv.classList.add("duration");

      inputNode.appendChild(inputImg);

      inputDetailDiv.appendChild(inputName);
      inputDetailDiv.appendChild(inputDetailSpan);

      inputNode.appendChild(inputDetailDiv);
      inputNode.appendChild(inputDurationDiv);

      spacer.innerHTML = "";
      spacer.appendChild(inputNode);
      addPlayback(spacer);
    } else if (inputType == 2) {
      inputDetailSpan = document.createElement("div");
      inputDetailSpan.innerText = Math.floor(suggestion.input.bpm) + " bpm / " + suggestion.input.key + " key / " + suggestion.input.scale + " scale";

      inputNode.classList.add("item");
      inputDetailDiv.classList.add("song-detail");

      inputDetailDiv.appendChild(inputDetailSpan);

      inputNode.appendChild(inputDetailDiv);
      inputNode.appendChild(inputDurationDiv);

      spacer.innerHTML = "";
      spacer.appendChild(inputNode);
    }

    //const newTitle = document.querySelector("#libState");

    //spacer?.remove();
    //title?.remove();
    inputs?.remove();

    //newTitle.classList.remove("item-library");
    //let scoreButton = document.createElement("BUTTON");
    //scoreButton.innerHTML = "TEST";
    //document.getElementById("filterType").append(scoreButton);
  }
}

listupSongs(filteredLibrary, false, 0);
sortByName(document.getElementById("name"));

//Button selection handling - Mason Lane
function buttonSelected(selectedID) {
  if (selectedSong != -1) {

    deselectExisting(selectedSong);
  }
  if (selectedSong == selectedID) {
    document.getElementById('startButton').innerHTML = "Auto";
    selectedSong = -1;
  }
  else {
    console.log(selectedID);
    document.getElementById('startButton').innerHTML = "Start";
    selectedSong = selectedID;
    document.getElementById(selectedSong).checked = true;
  }
}

function deselectExisting(deselectedID) {
  document.getElementById(deselectedID).checked = false;
}

function buttonDeselected() {

}

//Selected action handling - Mason Lane
async function sendSelected(callback) {
  audio.pause();
  if (selectedSong == -1) {
    console.log("doing random");
    suggestion = new SuggestionWRandom(filteredLibrary);
    await suggestion.beginSuggestion();
    console.log(suggestion);
    callback();
    // console.log(songPath);

    document.querySelector(".item-title.item-library").innerHTML = "Suggestions";
    document.querySelector(".button").removeChild(document.querySelector(".button").firstChild);
    while (contentTarget.firstChild) {
      contentTarget.removeChild(contentTarget.firstChild);
    }

    listupSongs(suggestion.results, true, 1);
    sortByScore(document.getElementById("name"));
  }
  else if (selectedSong == -2) {
    let features = new Feature();
    features.setBpm(parseFloat(document.getElementById("bpmIn").value));
    features.setKey(document.getElementById("keyIn").value);
    features.setScale(document.getElementById("scaleIn").value);
    console.log(features);
    suggestion = new SuggestionWFeature(features);
    await suggestion.beginSuggestion();
    console.log(suggestion);
    callback();

    document.querySelector(".item-title.item-library").innerHTML = "Suggestions";
    document.querySelector(".button").removeChild(document.querySelector(".button").firstChild);
    while (contentTarget.firstChild) {
      contentTarget.removeChild(contentTarget.firstChild);
    }

    listupSongs(suggestion.results, true, 2);
    sortByScore(document.getElementById("name"));
  }
  else if (selectedSong >= 0) {
    let song = filteredLibrary.songs[selectedSong];
    suggestion = new SuggestionWSong(song);
    await suggestion.beginSuggestion();
    // console.log(suggestion);
    console.log(suggestion);
    callback();

    document.querySelector(".item-title.item-library").innerHTML = "Suggestions";
    document.querySelector(".button").removeChild(document.querySelector(".button").firstChild);
    while (contentTarget.firstChild) {
      contentTarget.removeChild(contentTarget.firstChild);
    }

    listupSongs(suggestion.results, true, 1);
    sortByScore(document.getElementById("name"));
  }
}

function timeOutCallback() {
  setTimeout(() => { console.log("calling back"); }, 3000);
}



//Navigation
document.querySelectorAll(".navButton")[0].addEventListener('click', () => {
  location.replace('./songMenu.html');
});

// configuration nav


lastCheckbox.firstElementChild.value = -2;
lastCheckbox.firstElementChild.id = -2;
//console.log(lastCheckbox.firstElementChild);

//Library sorting logic - Mason Lane
function toggleImage(value) {
  let sortImg = new Image();
  if (value == 1) {
    return "../img/sort-up.png";
  }
  else {
    return "../img/sort-down.png";
  }
}


function sortByBpm(element) {
  var ascending = element.value;
  console.log(document.getElementById("libState").value);
  if (document.getElementById("libState").value == 0) {
    prepareSortedLib()
    filteredLibrary.songs.sort((a, b) => (a.features.bpm > b.features.bpm) ? ascending : ascending * -1);
    listupSongs(filteredLibrary, false, 0);
  }
  else {
    prepareSortedResults()
    suggestion.results.songs.sort((a, b) => (a.features.bpm > b.features.bpm) ? ascending : ascending * -1);
    listupSongs(suggestion.results, true, document.getElementById("libState").value)
  }


  element.src = toggleImage(element.value);
  element.value = element.value * -1;

}

function sortByKey(element) {
  var ascending = element.value;
  if (document.getElementById("libState").value == 0) {
    prepareSortedLib()
    filteredLibrary.songs.sort((a, b) => (a.features.key > b.features.key) ? ascending : ascending * -1);
    listupSongs(filteredLibrary, false, 0);
  }
  else {
    prepareSortedResults()
    suggestion.results.songs.sort((a, b) => (a.features.key > b.features.key) ? ascending : ascending * -1);
    listupSongs(suggestion.results, true, document.getElementById("libState").value)
  }
  element.src = toggleImage(element.value);
  element.value = element.value * -1;
}

function sortByScale(element) {
  var ascending = element.value;
  if (document.getElementById("libState").value == 0) {
    prepareSortedLib()
    filteredLibrary.songs.sort((a, b) => (a.features.scale > b.features.scale) ? ascending : ascending * -1);
    listupSongs(filteredLibrary, false, 0);
  }
  else {
    prepareSortedResults()
    suggestion.results.songs.sort((a, b) => (a.features.scale > b.features.scale) ? ascending : ascending * -1);
    listupSongs(suggestion.results, true, document.getElementById("libState").value)
  }
  element.src = toggleImage(element.value);
  element.value = element.value * -1;
}

function sortByTime(element) {
  var ascending = element.value;
  if (document.getElementById("libState").value == 0) {
    prepareSortedLib()
    filteredLibrary.songs.sort((a, b) => (a.songLength > b.songLength) ? ascending : ascending * -1);
    listupSongs(filteredLibrary, false, 0);
  }
  else {
    prepareSortedResults()
    suggestion.results.songs.sort((a, b) => (a.songLength > b.songLength) ? ascending : ascending * -1);
    listupSongs(suggestion.results, true, document.getElementById("libState").value)
  }
  element.src = toggleImage(element.value);
  element.value = element.value * -1;
}

function sortByName(element) {
  var ascending = element.value;
  if (document.getElementById("libState").value == 0) {
    prepareSortedLib()
    filteredLibrary.songs.sort((a, b) => (a.songName > b.songName) ? ascending : ascending * -1);
    listupSongs(filteredLibrary, false, 0);
  }
  else {
    prepareSortedResults()
    suggestion.results.songs.sort((a, b) => (a.songName > b.songName) ? ascending : ascending * -1);
    listupSongs(suggestion.results, true, document.getElementById("libState").value)
  }
  element.src = toggleImage(element.value);
  element.value = element.value * -1;
}

function sortByScore(element) {
  var ascending = element.value;
  if (document.getElementById("libState").value == 0) {
    prepareSortedLib()
    filteredLibrary.songs.sort((a, b) => (a.score > b.score) ? ascending : ascending * -1);
    listupSongs(filteredLibrary, false, 0);
  }
  else {
    prepareSortedResults()
    suggestion.results.songs.sort((a, b) => (a.score > b.score) ? ascending : ascending * -1);
    listupSongs(suggestion.results, true, document.getElementById("libState").value)
  }
  element.src = toggleImage(element.value);
  element.value = element.value * -1;
}

function prepareSortedLib() {
  document.querySelector(".item-title.item-library").innerHTML = "Song Library";
  //document.querySelector(".button").removeChild(document.querySelector(".button").firstChild);
  while (contentTarget.firstChild) {
    contentTarget.removeChild(contentTarget.firstChild);
  }
}

function prepareSortedResults() {
  document.querySelector(".item-title").innerHTML = "Suggestions";
  //document.querySelector(".button").removeChild(document.querySelector(".button").firstChild);
  while (contentTarget.firstChild) {
    contentTarget.removeChild(contentTarget.firstChild);
  }
}

//End of sorting logic 
const {LibraryData} = require("../Types/LibraryData");
const {Song} = require("../Types/Song");
const {Feature} = require("../Types/Feature");


function showSongs() {
    var songLibrary = new LibraryData();
    console.log(songLibrary);
    for (var i = 0; i<songLibrary.songs.length; i++){
        var node = document.createElement("BUTTON");
        
        var div = document.createElement("div");
        div.classList.add("songContainer");
        makeHeaderElement(div, "", songLibrary.songs[i].songName);
        makeHeaderElement(div, "By: ", songLibrary.songs[i].author);
        node.appendChild(div);

        var div = document.createElement("div");
        div.classList.add("songContainer");
        makeBodyElement(div, "Bpm: ", songLibrary.songs[i].features.bpm);
        makeBodyElement(div, "Key: ", songLibrary.songs[i].features.key);
        makeBodyElement(div, "Scale: ", songLibrary.songs[i].features.scale);
        node.appendChild(div);

        document.getElementById("songList").appendChild(node);
    }
    
  }

  function makeHeaderElement(div, type, value) {
    var h1 = document.createElement("h1");
    h1.classList.add("songContainer");
    div.appendChild(h1);
    var textnode = document.createTextNode(type+value);
    div.appendChild(textnode);
  }

  function makeBodyElement(div, type, value) {
    var p = document.createElement("p");
    p.classList.add("songContainer");
    div.appendChild(p);
    var textnode = document.createTextNode(type+value);
    div.appendChild(textnode);
  }
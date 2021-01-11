const {LibraryData} = require("../Types/LibraryData");
const {Song} = require("../Types/Song");
const {Feature} = require("../Types/Feature");


function showSongs() {
    var songLibrary = new LibraryData();
    console.log(songLibrary);
    for (var i = 0; i<songLibrary.songs.length; i++){
        var node = document.createElement("LI");
        var textnode = document.createTextNode(songLibrary.songs[i].songName);
        node.appendChild(textnode);
        document.getElementById("songList").appendChild(node);
    }
    
    
  }
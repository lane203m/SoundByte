const {LibraryData} = require("../Types/LibraryData");
const {Song} = require("../Types/Song");
const {Feature} = require("../Types/Feature");


function showSongs() {
    var songLibrary = new LibraryData();
    console.log(songLibrary);
    for (var i = 0; i<songLibrary.songs.length; i++){
      var listingDiv = document.createElement("div");
      listingDiv.classList.add("listing");


      var node = document.createElement("BUTTON");  
      var dataDiv = document.createElement("div");
      dataDiv.classList.add("metaDataDiv");
          var div = document.createElement("div");
          div.classList.add("songNameContainer");
          makeHeaderElement(div, ""+ songLibrary.songs[i].songName);
          dataDiv.appendChild(div);



          var div = document.createElement("div");
          div.classList.add("songBPMContainer");
          makeBodyElement(div, "Bpm: "+ songLibrary.songs[i].features.bpm);
          dataDiv.appendChild(div);

          var div = document.createElement("div");
          div.classList.add("songAuthorContainer");
          makeHeaderElement(div, "By: "+ songLibrary.songs[i].author);
          dataDiv.appendChild(div);

          var div = document.createElement("div");
          div.classList.add("songKeyContainer");
          makeBodyElement(div, "Key: "+ songLibrary.songs[i].features.key + " " + songLibrary.songs[i].features.scale);
          dataDiv.appendChild(div);


          node.appendChild(dataDiv);

          listingDiv.appendChild(node);



          var node2 = document.createElement("BUTTON");
          node2.classList.add("PlayButton");
          var div = document.createElement("div");
          div.innerHTML = '&#9658'
          node2.appendChild(div);
          listingDiv.appendChild(node2);

          document.getElementById("songList").appendChild(listingDiv);
    }
    
  }

  function makeHeaderElement(div, value) {
    var h1 = document.createElement("h1");
    h1.classList.add("songContainer");
    div.appendChild(h1);
    var textnode = document.createTextNode(value);
    div.appendChild(textnode);
  }

  function makeBodyElement(div, value) {
    var p = document.createElement("p");
    p.classList.add("songContainer");
    div.appendChild(p);
    var textnode = document.createTextNode(value);
    div.appendChild(textnode);
  }
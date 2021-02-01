const {LibraryData} = require("../Types/LibraryData");
const {Song} = require("../Types/Song");
const {Feature} = require("../Types/Feature"); 
const {SuggestionWSong} = require("../Suggestion/suggestions")
var songLibrary = new LibraryData();
var filteredLibrary = songLibrary;
var selectedSong = "-1";
//
function showSongs() {


 
  var form = document.createElement("FORM");

  for (var i = 0; i<filteredLibrary.songs.length; i++){
    form.appendChild(makeListing(i));
  }
    

      var inputSubmit = document.createElement("div");
      inputSubmit.classList.add("listing");
          var node = document.createElement("BUTTON");  
          node.setAttribute("onClick", "sendSelected()");
          node.setAttribute("type", "button");
          node.setAttribute("name", "submit");
          node.setAttribute("id", "submit");
          node.setAttribute("value", "Submit");
              var dataDiv = document.createElement("div");
              dataDiv.classList.add("metaDataDiv");
                  var div = document.createElement("div");
                  div.classList.add("songNameContainer");
                  makeElement("submitInput", ""+ "submit");
              dataDiv.appendChild(div);
          node.appendChild(dataDiv);
      inputSubmit.appendChild(node);
  form.appendChild(inputSubmit)
  document.getElementById("songList").appendChild(form);
}



function makePlayButton(){
    var node2 = document.createElement("BUTTON");
    node2.classList.add("PlayButton");

        var div = document.createElement("div");
        div.innerHTML = '&#9658'

    node2.appendChild(div);

    return node2;
}

function makeElement(className, value) {
    var div = document.createElement("div");
    div.classList.add(className);

        var p = document.createElement("p");
        p.classList.add("songContainer");

    div.appendChild(p);

        var textnode = document.createTextNode(value);

    div.appendChild(textnode);

    return div;
}

function makeListing(indexValue){
  var listingDiv = document.createElement("div");
  listingDiv.classList.add("listing");

      var node = document.createElement("BUTTON"); 
      node.setAttribute("type", "button"); 
      node.setAttribute("name", "inputValue");
      node.setAttribute("id", indexValue);
      node.setAttribute("value", indexValue);
      node.setAttribute("onClick", "buttonSelected(this.value)");
          
          var dataDiv = document.createElement("div");
          dataDiv.classList.add("metaDataDiv");
          
              div = makeElement("songNameContainer", ""+ filteredLibrary.songs[indexValue].songName);
              dataDiv.appendChild(div);

              div = makeElement( "songBPMContainer", "Bpm: "+ filteredLibrary.songs[indexValue].features.bpm);
              dataDiv.appendChild(div);

              div = makeElement("songAuthorContainer", "By: "+ filteredLibrary.songs[indexValue].author);
              dataDiv.appendChild(div);

              div = makeElement("songKeyContainer", "Key: "+ filteredLibrary.songs[indexValue].features.key + " " + filteredLibrary.songs[indexValue].features.scale);
              dataDiv.appendChild(div);

      node.appendChild(dataDiv);
  listingDiv.appendChild(node);

      node2 = makePlayButton();
  listingDiv.appendChild(node2);

  return listingDiv
}



function showSongs() {


 
  var form = document.createElement("FORM");

  for (var i = 0; i<filteredLibrary.songs.length; i++){
    form.appendChild(makeListing(i));
  }
    

      var inputSubmit = document.createElement("div");
      inputSubmit.classList.add("listing");
          var node = document.createElement("BUTTON");  
          node.setAttribute("onClick", "sendSelected()");
          node.setAttribute("type", "button");
          node.setAttribute("name", "submit");
          node.setAttribute("id", "submit");
          node.setAttribute("value", "Submit");
              var dataDiv = document.createElement("div");
              dataDiv.classList.add("metaDataDiv");
                  var div = document.createElement("div");
                  div.classList.add("songNameContainer");
                  makeElement("submitInput", ""+ "submit");
              dataDiv.appendChild(div);
          node.appendChild(dataDiv);
      inputSubmit.appendChild(node);
  form.appendChild(inputSubmit)
  document.getElementById("songList").appendChild(form);
}



function makePlayButton(){
    var node2 = document.createElement("BUTTON");
    node2.classList.add("PlayButton");

        var div = document.createElement("div");
        div.innerHTML = '&#9658'

    node2.appendChild(div);

    return node2;
}

function makeElement(className, value) {
    var div = document.createElement("div");
    div.classList.add(className);

        var p = document.createElement("p");
        p.classList.add("songContainer");

    div.appendChild(p);

        var textnode = document.createTextNode(value);

    div.appendChild(textnode);

    return div;
}

function makeListing(indexValue){
  var listingDiv = document.createElement("div");
  listingDiv.classList.add("listing");

      var node = document.createElement("BUTTON"); 
      node.setAttribute("type", "button"); 
      node.setAttribute("name", "inputValue");
      node.setAttribute("id", indexValue);
      node.setAttribute("value", indexValue);
      node.setAttribute("onClick", "buttonSelected(this.value)");
          
          var dataDiv = document.createElement("div");
          dataDiv.classList.add("metaDataDiv");
          
              div = makeElement("songNameContainer", ""+ filteredLibrary.songs[indexValue].songName);
              dataDiv.appendChild(div);

              div = makeElement( "songBPMContainer", "Bpm: "+ filteredLibrary.songs[indexValue].features.bpm);
              dataDiv.appendChild(div);

              div = makeElement("songAuthorContainer", "By: "+ filteredLibrary.songs[indexValue].author);
              dataDiv.appendChild(div);

              div = makeElement("songKeyContainer", "Key: "+ filteredLibrary.songs[indexValue].features.key + " " + filteredLibrary.songs[indexValue].features.scale);
              dataDiv.appendChild(div);

      node.appendChild(dataDiv);
  listingDiv.appendChild(node);

      node2 = makePlayButton();
  listingDiv.appendChild(node2);

  return listingDiv
}




function buttonSelected(selectedID){
  if(selectedSong != -1){
    deselectExisting(selectedSong);
  }

  if(selectedSong == selectedID){
    selectedSong = -1;
  }
  else{
    selectedSong = selectedID;
    document.getElementById(selectedSong).classList.add("selected");
  }

  

}

function deselectExisting(deselectedID){
  document.getElementById(deselectedID).classList.remove("selected");
}

function buttonDeselected(){

}

function sendSelected(){
  if(selectedSong != -1){
    var song = filteredLibrary.songs[selectedSong];
    suggestion = new SuggestionWSong(song);
    console.log(suggestion);
    suggestion.beginSuggestion();
    console.log(suggestion);
  }
}


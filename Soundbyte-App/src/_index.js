/* 
** app setup sequence by Brian 
*/

const fs = require('electron').remote.require('fs');

const exist = fs.existsSync(`init.json`);

const move = (url) => {
  location.replace(url)
}

if(!exist) { // When init.json file does not exist, move to setup page
  move(`./setupSongLibrary.html`);
} else {
  move(`./songMenu/songMenu.html`);
}
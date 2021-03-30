/* 
** app setup sequence by Brian 
*/
const path = require('path');
const fs = require('electron').remote.require('fs');

const initPath = path.resolve(__dirname, "./Initialization/init.json");
const exist = fs.existsSync(initPath);

const move = (url) => {
  location.replace(url)
}

if (!exist) { // When init.json file does not exist, move to setup page
  move(`./initialization/setSettings/initialization.html`);
  //console.log("./setup/init.json does not exist!");
} else {
  move(`./songMenu/songMenu.html`);
  //console.log("You have ./setup/init.json !");
}
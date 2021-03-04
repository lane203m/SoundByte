const fs = require('electron').remote.require('fs');
const path = require('path');
const contentTarget = document.querySelector(".item-wraper");
const resultTarget = document.querySelector(".item-title.item-library");


//initialize the pairing results div
resultTarget.style.visibility = 'hidden';


//Navigation - calibration the url
document.querySelectorAll(".navButton")[1].addEventListener('click', () => {
  location.replace('./index.html');
});

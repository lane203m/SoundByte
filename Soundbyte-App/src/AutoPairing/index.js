const fs = require('electron').remote.require('fs');
const path = require('path');
const contentTarget = document.querySelector(".item-wraper");
const resultTarget = document.querySelector(".item-title.item-library");


//initialize the pairing results div
resultTarget.style.visibility = 'hidden';

//Navigation-calibration
document.querySelectorAll(".navButton")[2].addEventListener('click', () => {
  location.replace('./index.html');
});
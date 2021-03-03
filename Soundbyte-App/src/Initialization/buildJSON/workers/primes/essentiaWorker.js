//var essentia = require('../../essentia/essentia-wasm.web.js');
//var EssentiaWASM = require('../../essentia/essentia.js-core.js');

//importScripts("../../essentia/essentia-wasm.web.js");
//importScripts("../../essentia/essentia.js-core.js");
//let essentia = new Essentia(EssentiaWASM);

//console.log(essentia.version);
//import { expose } from "comlink";
//import Essentia from '../../essentia/essentia.js-core.js';
//import {EssentiaWASM} from '../../essentia/essentia-wasm.web.js';
//const essentia = new Essentia(EssentiaWASM);
//import {test} from './test.js';
/*var i;
*/

const essentia = require('essentia.js');

addEventListener('message', e => {
  console.log(e.data);
  console.log(essentia.version);
  let audio = e.data.channelData[0];
  let inputSignalVector = essentia.arrayToVector(audio);
  let key = essentia.KeyExtractor(inputSignalVector);
  let bpm = essentia.RhythmExtractor(inputSignalVector);
  

  let data = {
      bpm : bpm.bpm, 
      key : key.key,
      scale : key.scale
    }
  console.log("working");
  console.log(data);

  postMessage(data);

});
/*
function timedCount() {

    //var essentia = new Essentia(EssentiaWASM);
    console.log(essentia.verison);
  i = {
      bpm: 25,
      key: "A",
      scale: "Major"
  }
  console.log(i);
  //setTimeout(() => {  move("../../index.html"); }, 4000);
  postMessage(i);
  //setTimeout("timedCount()",500);
}

timedCount();*/
/*
const sum = async (a, b) =>
  new Promise(async resolve => {
    essentia = new Essentia(EssentiaWASM);

    resolve((a+b));
  });

expose(sum);*/
//import { sayHello } from './greet.js';
/*addEventListener('message', e => {
  console.log("workerTest");
  postMessage("test");
  
});*/


//var essentia = require('../../essentia/essentia-wasm.web.js');
//var EssentiaWASM = require('../../essentia/essentia.js-core.js');

//importScripts("../../essentia/essentia-wasm.web.js");
//importScripts("../../essentia/essentia.js-core.js");
//let essentia = new Essentia(EssentiaWASM);

//console.log(essentia.version);
import { expose } from "comlink";
import Essentia from '../../essentia/essentia-wasm.web.js';
import {EssentiaWASM} from '../../essentia/essentia.js-core.js';
//import {test} from './test.js';
/*var i;

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

const sum = async (a, b) =>
  new Promise(async resolve => {
    essentia = new Essentia(EssentiaWASM);

    resolve((a+b));
  });

expose(sum);
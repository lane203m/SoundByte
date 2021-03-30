//Essentia worker
//Mason Lane
//2021-03-03
//since we use electron, workers may import node modules
//we use the essentiaJS node module to extract features
//from a given decoded audioData

const essentia = require('essentia.js');


addEventListener('message', e => {
  let audio = e.data.channelData[0];                      //make essentia readable (js does not have vectors, 
  let inputSignalVector = essentia.arrayToVector(audio);  //but c++ does. essentia needs vector)                                                     

  let key = essentia.KeyExtractor(inputSignalVector);
  let bpm = essentia.RhythmExtractor(inputSignalVector);

  //our object (same format as feature object)
  let data = {
    bpm: bpm.bpm,
    key: key.key,
    scale: key.scale
  }

  postMessage(data);
});

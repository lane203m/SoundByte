//Library Builder, generates JSON data for each song. 
//By: Mason Lane
//2021-03-03
//from a given init directory, we read every wav file
//each wav file has its length read for duration
//each wav file has its metadata read
//each wav file's audio buffer is read into a web worker
//the web worker returns bpm/key/scale leveraging essentia
//once all songs are prepared, we write to our JSON file 

import { Feature } from "../../Types/Feature";        //types
import {Song} from "../../Types/Song";
import * as musicDataExtractor from 'music-metadata'; //reading metadata. works for wav/mp3/etc
const fs = require('fs');
var path = require('path');
const { getAudioDurationInSeconds } = require('get-audio-duration'); //used incase metadata does not have duration
const WavDecoder = require("wav-decoder");            //used to decode audio buffer of a wav. Will need mp3 equiv. mp3 is harder


export class LibraryBuilder{
  iniDirectory: String;                               //our ini, reading and writing directories. 
  writingDirectory: String;
  fileDirectory:String;
  constructor(iniPath: String, writePath: String, filePath: String){
    this.iniDirectory = iniPath;
    this.writingDirectory = writePath;
    this.fileDirectory = filePath;
  }

  //Write a library object to JSON after building said library with getSongs.
  public async buildLibrary(){                      
    var writeTo = this.writingDirectory;

    await this.getSongs().then((library) => {
      fs.writeFileSync(writeTo, JSON.stringify(library, null, 2));
    }); 

    return 1;
  }

  //Read all files in a directory, run extraction only for .wav files.
  public async getSongs(){
    var fileDir = this.fileDirectory;
    var songs: Song[] = [];
    var files = await fs.readdirSync(fileDir);                  //get all files
    var library;
    var filePath
    
    for (var i = 0; i< files.length; i++){                      //for each file
      filePath=path.join(fileDir,files[i]); 
      
      if (filePath.indexOf('wav')>=0) {                         //if the file is a wav, run and push the song to songs
        songs.push(await this.buildSong(filePath)); 
      }
    }

    library = {songs};
    alert("Reading Done, songs read: " + library.songs.length); //inform of completion. To be replaced with loading popup

    return library;                                 
  }

  //Get all required data from a song given a file name with path
  public async buildSong(filePath: string){
    var song: Song;
    song = new Song(null,null,null,null, null);                //new Song object

    song = await this.readMetadata(song, filePath);            //get tag data
    song = await this.extractSongFeatures(song, filePath);     //run essentia for features
    song = await this.getAudioDuration(song,filePath);         //get song length

    return song;
  } 

  //Read a songs tag metadata using node module
  public async readMetadata(song:Song, filePath){
    const metadata = await musicDataExtractor.parseFile(filePath); //get tags from song
        
    metadata.common.artist? //set artist if any
        song.setAuthor(metadata.common.artist): 
        song.setAuthor("N/A");
    metadata.common.title? //set title, else file
        song.setSongName(metadata.common.title): 
        song.setSongName(path.basename(filePath));
  
    song.setSongFile(path.basename(filePath)); //set file name
    
    return song;
  }
  
  //gets the duration of a song using node module
  public async getAudioDuration(song: Song,filePath){
    await getAudioDurationInSeconds(filePath).then((result) => {
      song.setLength(result);//read file & get length. return result.
    });
    
    return song;
  };

  //get feature data using essentia and worker
  public async extractSongFeatures(song:Song, filePath){

    //readfile gets a buffer for essentia to analyse. 
    const readFile = (filepath) => {
      return new Promise((resolve, reject) => {
        fs.readFile(filepath, (err, buffer) => {
          if (err) {
            return reject(err);
          }
          return resolve(buffer);
        });
      });
    };
  
  
    let buffer = await readFile(filePath);                //our buffer
    let audioData = await WavDecoder.decode(buffer);      //decode audio buffer for essentia (consider moving to worker?)

    return new Promise<Song>(function(resolve) {
      const worker = new Worker('../buildJSON/workers/primes/essentiaWorker.js', { 
        type: 'module' 
      }); 
      
      worker.postMessage(audioData);                      //send audioData to our worker
      worker.onmessage = function(event){           
          song.setFeatures(event.data);                   //upon finishing, set features
          resolve(song);                            
      };
    });
  }

}

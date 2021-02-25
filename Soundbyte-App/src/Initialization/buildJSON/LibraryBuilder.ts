//Library Builder, generates JSON data for each song. By: Mason Lane
import { Feature } from "../../Types/Feature";
import {Song} from "../../Types/Song";
const fs = require('fs');
var path = require('path');
//const essentia = require("essentia.js");
//const fooWorker = new essentia();
//const essentiaWorker = new Worker("essentia.js");
//WebAssembly.compileStreaming(fetch('simple.wasm'))
//.then(mod =>
//  essentiaWorker.postMessage(mod)
//);

//const Foo = require("worker!./essentiaWorker.js");
//const fooWorker = new Worker("essentiaWorker.js", { type: "module" });
//import { Essentia, EssentiaWASM } from 'essentia.js'
//const decode = require('audio-decode');
//const essentia = require('essentia.js');
const { getAudioDurationInSeconds } = require('get-audio-duration');
//const buffer = require('audio-lena/mp3');
//console.log(fooWorker);
const WavDecoder = require("wav-decoder");

//const primes = require('./workers/primes');
//primes.getPrimes(100).then(primes => {
//  console.log('The first 100 prime numbers are:');
 // console.log(JSON.parse(primes));
//});


export class LibraryBuilder{
  iniDirectory: String;
  writingDirectory: String;
  fileDirectory:String;
  constructor(iniPath: String, writePath: String, filePath: String){
    this.iniDirectory = iniPath;
    this.writingDirectory = writePath;
    this.fileDirectory = filePath;
    console.log(filePath);
  }

    
  //Get all required data from a song given a file name with path
  public async buildSong(fileName: string){
    var writeTo = this.writingDirectory;
    var iniDir = this.iniDirectory;
    var fileDir = this.fileDirectory;
    var song: Song;
    return new Promise(async function(resolve, reject) {
      setTimeout(() => resolve(song), 1000);
    }).then(async function(song: Song) {
      song = new Song(null,null,null,null, null); //new Song object
      return song;

    }).then(async function(song) {                // Read ID3 tags for author  
      song.setAuthor("author_placeholder");
      return song;

    }).then(async function(song) {                // Read ID3 tags for song name 
        song.setSongName("name_placeholder");     
        return song;

    }).then(async function(song) {                // Get file name
      song.setSongFile(path.basename(fileName));  
      return song;

    }). then(async function(song) {               // Get features from essentia

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

      //get buffer and then extract features
      readFile(fileName).then(async (buffer) => {
        return WavDecoder.decode(buffer);
      }).then(async function(audioData) {
        var worker = new Worker('../buildJSON/workers/primes/essentiaWorker.js', { type : 'module' });
        worker.onmessage = function(event){
          console.log(event.data);
        }
        //worker function to be called here, with audioData passed as input
        console.log(audioData);
        console.log("working1");
        var features: Feature = new Feature();
        features.bpm = 50;
        features.scale = "Major";
        features.key = "B"
        song.setFeatures(features);
      });
      return song;

    }).then(async function(song) {                // Get song length using get-audio-duration
      await getAudioDurationInSeconds(fileName).then((result) => {
        song.setLength(result);
      });
      return song;
    
    }).then(function(song) {                      //return final object
      console.log(song);
      return song;
    });
  } 

    //Write a library object to JSON after building said library with getSongs.
  public async buildLibrary(){                      
    var writeTo = this.writingDirectory;
    await this.getSongs().then((library) => {
      fs.writeFileSync(writeTo, JSON.stringify(library));
      console.log(library);
    }); 
    return 1;
  }

    //Read all files in a directory, run extraction only for .wav files.
    public async getSongs(){
      var fileDir = this.fileDirectory;
      var songs: Song[] = [];
      var files= await fs.readdirSync(fileDir); //get all files
      
      for (var i = 0; i< files.length; i++){    //for each file
        var fileName=path.join(this.fileDirectory,files[i]);
        console.log(fileName);
        if (fileName.indexOf('wav')>=0) {       //if the file is a wav, run and push to songs
          songs.push(await this.buildSong(fileName)); 
        }
      }
      var library = {songs};
      alert("Reading Done, songs read: " + library.songs.length); //inform of completion
      return library;
    }


      /*
    public async readSongs(directory){
        var songs: Song[];
        console.log(this.fileDirectory);
        await this.openSongs(this.fileDirectory, "wav").then(result =>{
          console.log(JSON.stringify(result));
          fs.writeFileSync(this.writingDirectory, JSON.stringify(result)) 
        }); 
        
        return 1;
      
    }

    public getDuration(filename){
      return getAudioDurationInSeconds(filename);
    }

    public async openSongs(directory, filter): Promise<Song[]>{
      var songs: Song[] = [];
      var files=fs.readdirSync(directory);
      fs.readdir(this.fileDirectory, (err, files) => {
        files.forEach(file => {
            var filename=path.join(this.fileDirectory,file);
            console.log(filename);
            if (filename.indexOf(filter)>=0) {
              console.log('-- found: ',filename);
              var song;
              var name = file;
              //var stream = fs.createReadStream(filename);
              var length = this.getDuration(filename);
              songs.push(new Song(name,"",null,length));
              readFile(filename).then((buffer) => {
                return WavDecoder.decode(buffer);
              }).then(function(audioData) {
                console.log(audioData);
              });
            }
        });
      });

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
      console.log("songs");
      console.log(songs);
      return songs;
      /*for(var i=0;i<files.length;i++){
        var filename=path.join(directory,files[i]);
        var stat = fs.lstatSync(filename);
        if (stat.isDirectory()){
            this.openSongs(filename, filter); //recurse
        }
        else if (filename.indexOf(filter)>=0) {
            console.log('-- found: ',filename);
        };
      }
    } 


    public async buildLibrary(){
      var output = await this.readSongs(this.iniDirectory);
      console.log(output);
      return 0;
    }   

*/

}
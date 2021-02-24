import { Feature } from "../../Types/Feature";
import {Song} from "../../Types/Song";
const fs = require('fs');
var path = require('path');
//var pyshell =  require('python-shell');
//const essentia = require('essentia.js');
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

    

    public async buildSong(fileName: string){
      var writeTo = this.writingDirectory;
      var iniDir = this.iniDirectory;
      var fileDir = this.fileDirectory;
      var song: Song;
      return new Promise(async function(resolve, reject) {

        setTimeout(() => resolve(song), 1000); // (*)
      
      }).then(async function(song: Song) { // (**)
        song = new Song(null,null,null,null, null);
        //alert(song); // 1
        return song;
      
      }).then(async function(song) { // (***)
        song.setAuthor("author_placeholder");
        //alert(song.author); // 2
        return song;
      
      }).then(async function(song) { // (***)
        song.setSongName("name_placeholder");
        //alert(song.songName); // 2
        return song;
      
      }).then(async function(song) { // (***)
        song.setSongFile(path.basename(fileName));
        //alert(song.songFile); // 2
        return song;
      
      }).then(async function(song) { // (***)
        
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
        //var fileName=path.join(this.fileDir,files[i]);
        readFile(fileName).then(async (buffer) => {
          return WavDecoder.decode(buffer);
        }).then(async function(audioData) {
          console.log(audioData);
          console.log("working1");
          var features: Feature = new Feature();
          features.bpm = 50;
          features.scale = "Major";
          features.key = "B"
          song.setFeatures(features);
        });

        
        //alert(song.features); // 2
        return song;
      
      }).then(async function(song) { // (***)

        await getAudioDurationInSeconds(fileName).then((result) => {
          song.setLength(result);
        });
        //alert(song.songLength); // 2
        return song;
      
      }).then(function(song) {
      
        //alert(song); // 4
        //fs.writeFileSync(writeTo, JSON.stringify(song)) 
        console.log(song);
        return song;
        
      });
      //var output = await this.readSongs(this.iniDirectory);
      //console.log(output);
    } 
    
    public async buildLibrary(){
      var writeTo = this.writingDirectory;
      await this.getSongs().then((library) => {
        fs.writeFileSync(writeTo, JSON.stringify(library));
        console.log(library);
      }); 
      
      return 1;
    }

    public async getSongs(){
      var fileDir = this.fileDirectory;
      var songs: Song[] = [];
      var files= await fs.readdirSync(fileDir);
      //var files = await fs.readdir(this.fileDirectory);
      
      for (var i = 0; i< files.length; i++){
        var fileName=path.join(this.fileDirectory,files[i]);
        console.log(fileName);
        if (fileName.indexOf('wav')>=0) {
          songs.push(await this.buildSong(fileName)); 
        }
      }
      var library = {songs};
      alert(library.songs[1].songLength); // 4
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
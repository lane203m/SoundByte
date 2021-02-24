import {Feature} from "./Feature"

export class Song {
  songName: string;
  author: string;
  songFile: string;
  songLength: number;
  features: Feature;

  constructor(songName: string, author: string, songFile: string, features: Feature, songLength: number){
    this.songName = songName;
    this.author = author;
    this.songFile = songFile;
    this.features = features;
    this.songLength = songLength;

  }

  getSongName(){
    return this.songName;
  }

  getAuthor(){
    return this.author;
  }

  getSongFile(){
    return this.songFile;
  }

  getFeatures(){
    return this.features;
  }

  setSongName(songName: string){
    this.songName = songName;
  }

  setAuthor(author: string){
    this.author = author;
  }

  setSongFile(songFile: string){
    this.songFile = songFile;
  }

  setFeatures(features: Feature){
    this.features = features;
  }

  setLength(songLength: number){
    this.songLength = songLength;
  }

}
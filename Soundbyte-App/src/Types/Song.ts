//Song object - Mason Lane

import {Feature} from "./Feature"

//Song object. Contains song information and feature object.
export class Song {
  songName: string;
  author: string;
  songFile: string;
  songLength: number;
  features: Feature;
  score: number;

  constructor(songName: string, author: string, songFile: string, features: Feature, songLength: number){
    this.songName = songName;
    this.author = author;
    this.songFile = songFile;
    this.features = features;
    this.songLength = songLength;
    this.score = 0;

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

  getDuration(){
    return this.songLength;
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

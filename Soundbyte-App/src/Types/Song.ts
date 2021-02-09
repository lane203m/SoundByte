import {Feature} from "./Feature"

export class Song {
  songName: string;
  author: string;
  songFile: string;
  features: Feature;

  constructor(songName: string, author: string, songFile: string, features: Feature){
    this.songName = songName;
    this.author = author;
    this.songFile = songFile;
    this.features = features;

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

}
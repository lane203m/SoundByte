import {Feature} from "./Feature"

export class Song {
  songName: string;
  author: string;
  songFile: string;
  features: Feature;

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
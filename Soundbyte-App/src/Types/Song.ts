import {Feature} from "./Feature"

export class Song {
  songName: string;
  author: string;
  features: Feature;

  getFeatures(n: number){
    return this.features;
  }
    
}
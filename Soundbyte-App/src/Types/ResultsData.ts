import {Song} from "./Song"
import * as data from "../Libraries/songLibrary/library.json"

export class ResultsData {
  songs: Song[];

  constructor(songs){
    this.songs = songs;
  }

  getSong(n: number){
    return this.songs[n];
  }



}



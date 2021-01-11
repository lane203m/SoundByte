import {Feature} from "./Feature"
import {Song} from "./Song"
import * as data from "../Libraries/songLibrary/library.json"

export class LibraryData {
  songs: Song[];

  constructor(){
    this.songs = (<any>data).songs;
  }

  getSong(n: number){
    return this.songs[n];
  }



}



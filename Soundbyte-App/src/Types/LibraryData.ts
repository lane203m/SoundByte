//Library Object - Mason Lane

import {Song} from "./Song"
import * as data from "../Libraries/songLibrary/library.json"

//library data. stores all songs. reads from JSON.
export class LibraryData {
  songs: Song[];

  constructor(){
    this.songs = (<any>data).songs;
  }

  getSong(n: number){
    return this.songs[n];
  }



}



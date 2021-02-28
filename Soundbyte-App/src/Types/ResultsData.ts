//Results Object - Mason Lane

import {Song} from "./Song"
import * as data from "../Libraries/songLibrary/library.json"

//results data. Will be used to store results. Unique but similar to library data.
export class ResultsData {
  songs: Song[];

  constructor(songs){
    this.songs = songs;
  }

  getSong(n: number){
    return this.songs[n];
  }
}

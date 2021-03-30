//Library Object - Mason Lane

import { Song } from "./Song";
const fs = require('electron').remote.require('fs');
const path = require('path');
//import * as data from "../Libraries/songLibrary/library.json"

//library data. stores all songs. reads from JSON.
export class LibraryData {
  songs: Song[];

  constructor() {

    try {
      let libraryPath = path.resolve(__dirname, '../Libraries/songLibrary/library.json');
      let data = fs.readFileSync(libraryPath);
      data = JSON.parse(data);
      this.songs = (<any>data).songs;
    } catch {
      this.songs = null;
    }
  }

  getSong(n: number) {
    return this.songs[n];
  }



}



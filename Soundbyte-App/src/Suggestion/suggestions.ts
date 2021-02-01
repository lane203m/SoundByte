import {Feature} from "../Types/Feature"
import {Song} from "../Types/Song"
import {LibraryData} from "../Types/LibraryData"

export class Suggestion{
    results: Song[];
    constructor(){
      }    
}


export class SuggestionWSong extends Suggestion{
    input: Song;
    constructor(song: Song){
        super();
        this.input = song;
      }    

}


export class SuggestionWFeature extends Suggestion{
    input: Feature;
    constructor(features: Feature){
        super();
        this.input = features;
      }    

}


export class SuggestionWRandom extends SuggestionWSong{
    constructor(libraryData: LibraryData){
        super(libraryData.getSong(Math.random()));
      }    

}



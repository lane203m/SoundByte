import {Feature} from "../Types/Feature";
import {Song} from "../Types/Song";
import {LibraryData} from "../Types/LibraryData";
import {ResultsData} from "../Types/ResultsData";

var pyshell =  require('python-shell');








export class Suggestion{
    results: ResultsData;
    constructor(){
      }    
}


export class SuggestionWSong extends Suggestion{
    input: Song;
    constructor(song: Song){
        super();
        this.input = song;
      }  
  
    public async getSuggestion(){
      this.beginSuggestion();

    }

    public async runPythonShell(){
        return new Promise((resolve, reject)=>{
          pyshell.PythonShell.run('./Suggestion/suggestionWSong.py', null, function  (err, results)  {
              if  (err){
                console.log('fail');
                reject(err);
              }  
              else {
                resolve(results[0]);
          }
           });
          
        });
    }
    public async beginSuggestion(){
      var output = JSON.parse(<string>await this.runPythonShell());
      //console.log(output.songs);
      this.results = new ResultsData(output.songs);
/*
      var tempResult = await this.runPythonShell();
      console.log("00");
      console.log(JSON.parse(<string>tempResult));
      //tempResult = JSON.parse(<string>tempResult);
      console.log("BB");

      console.log((<any>tempResult).songs);
      console.log("CC");
      console.log(tempResult[0]);
      this.results = new ResultsData(tempResult);
      console.log("AA");
      console.log(this.results);
      console.log("DD");
      console.log(this.results.songs);
      console.log("FF")
      console.log(this.input.songName);
      console.log("GG");
      console.log(typeof(this.results.songs));
      console.log("ff");
      console.log(JSON.parse(this.results.songs));
*/
      
    }

}


export class SuggestionWFeature extends Suggestion{
    input: Feature;
    constructor(features: Feature){
        super();
        this.input = features;
      }    

    beginSuggestion(){
      let pyshell = new PythonShell('suggestionWFeature.py');

      pyshell.on('message', function(message) {
        console.log(message);
        this.results = message;
      })

      pyshell.end(function (err) {
        if (err){
        throw err;
        };
        console.log('finished');
      });
    }

}


export class SuggestionWRandom extends SuggestionWSong{
    constructor(libraryData: LibraryData){
        super(libraryData.getSong(Math.random()));
      }    

    

}



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
      this.results = new ResultsData(output.songs);
    }

}


export class SuggestionWFeature extends Suggestion{
    input: Feature;
    constructor(features: Feature){
        super();
        this.input = features;
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
      this.results = new ResultsData(output.songs);
    }

}


export class SuggestionWRandom extends SuggestionWSong{
    constructor(libraryData: LibraryData){
        super(libraryData.getSong(Math.random()));
      }    

    

}



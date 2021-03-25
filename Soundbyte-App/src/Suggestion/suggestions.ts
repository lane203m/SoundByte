//Suggestion class/functions & python shell initialization - Mason Lane
import {Feature} from "../Types/Feature";
import {Song} from "../Types/Song";
import {LibraryData} from "../Types/LibraryData";
import {ResultsData} from "../Types/ResultsData";
var pyshell =  require('python-shell');
//A suggestion will run and expects to fill results with data.
export class Suggestion{
  results: ResultsData;
  constructor(){
  }    
}

//suggestions with songs will require an aditional variable - input: Song. 
export class SuggestionWSong extends Suggestion{
  input: Song;
  constructor(song: Song){
    console.log(song);
    super();
    this.input = song;
    console.log(this.input);
  }  
    //Call a python shell, send options to python for parameters. Await results. 
  public async runPythonShell(){
    console.log(this.input);
    return new Promise((resolve, reject)=>{
      let options = {  
        mode: 'json' ,pythonOptions: ['-u'], // get print results in real-time
        args: [JSON.stringify(this.input)]
      }; 
      console.log(JSON.stringify(this.input));

      pyshell.PythonShell.run('./Suggestion/suggestionWSong.py', options, function  (err, results)  {
        if  (err){
          console.log('fail');
          console.log(err);
          reject(err);
        }  
        else {
          console.log(results[0]);
          resolve(results[0]);
        }
      });
          
    });
  }
  public async beginSuggestion(){
    alert("starting");
    var output;
    await this.runPythonShell().then(data => {
      output = data;
      alert("done");
      console.log("done");
    })
    console.log("done2");
    console.log(this.results);
    this.results = new ResultsData(output.songs);
  
  }

}

//same as above, only now python will recieve features as input instead of a song. 
export class SuggestionWFeature extends Suggestion{
  input: Feature;
  constructor(features: Feature){
    super();
    this.input = features;
  }    

  public async runPythonShell(){
    console.log(this.input);
    return new Promise((resolve, reject)=>{
      let options = {  
        mode: 'json' ,pythonOptions: ['-u'], // get print results in real-time
        args: [JSON.stringify(this.input)]
      }; 

      pyshell.PythonShell.run('./Suggestion/suggestionWFeature.py', options, function  (err, results)  {
        if  (err){
          console.log('fail');
          console.log(err);
          reject(err);
        }  
        else {
          console.log(results[0]);
          resolve(results[0]);
        }
      });
          
    });
  }
  public async beginSuggestion(){
    alert("starting");
    var output;
    await this.runPythonShell().then(data => {
      output = data;
      alert("done");
      console.log("done");
    })
    console.log("done2");
    this.results = new ResultsData(output.songs);
  }
}

//send a random song for suggestion.
export class SuggestionWRandom extends SuggestionWSong{
  constructor(libraryData: LibraryData){
    super(libraryData.getSong(Math.floor(Math.random() * libraryData.songs.length)));
  }    
}



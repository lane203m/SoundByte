import {Feature} from "../Types/Feature";
import {Song} from "../Types/Song";
import {LibraryData} from "../Types/LibraryData";
var pyshell =  require('python-shell');








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

    /*sendToPython() {
      var python = require('child_process').spawn('python', ['./py/calc.py', this.input]);
      python.stdout.on('data', function (data) {
        console.log("Python response: ", data.toString('utf8'));
        result.textContent = data.toString('utf8');
      });
    
      python.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
      });
    
      python.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
      });
    
    }
   
   */
  
      
    beginSuggestion(){
      var result;
      pyshell.PythonShell.run('suggestionWSong.py', null, function  (err, results)  {
        if  (err)  throw err;
        console.log('hello.py finished.');
        console.log('results', results);
        result = results[0];
      });
      this.results.push(result);
    }
    /*
      console.log("starting");
      let pyshell = new PythonShell('Suggestion/suggestionWSong.py');
      let value = null;
      console.log(pyshell.on('message', function(message) {
          value = message
          console.log(message);
      }));
      console.log(value);
      pyshell.end(function (err) {
        if (err){
            console.log(err);
            throw err;
        };
        console.log('finished');
      });
    }*/

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



import {Song} from "../../Types/Song";

const fs = require('fs');
var pyshell =  require('python-shell');


export class LibraryBuilder{
    readingDirectory: String;
    writingDirectory: String;
    constructor(read: String, write: String){
        this.readingDirectory = read;
        this.writingDirectory = write;
      }
      
    public async runPythonShell(directory){
        return new Promise((resolve, reject)=>{
          pyshell.PythonShell.run('./Initialization/buildJSON/extractLibraryFeatures.py', this.readingDirectory, this.writingDirectory, function  (err, results)  {
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
    public async buildLibrary(){
      var output = await this.runPythonShell(this.readingDirectory);
      console.log(output);
      //fs.writeFileSync(this.writingDirectory, output) 
      return 0;
    }   



}
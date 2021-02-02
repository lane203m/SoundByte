var pyshell =  require('python-shell');
var result;

test();

async function test(){
  result = await go();
  console.log("AA");
  console.log(result);

}

async function go(){
  return new Promise((resolve, reject)=>{
    pyshell.PythonShell.run('suggestionWSong.py', null, function  (err, results)  {
        if  (err){
          console.log('fail');
          reject(err);
        }  
        else {
          console.log('hello.py finished.');
          console.log(results[0]);
          resolve(results[0]);
    }
     });
    
  });
  
}



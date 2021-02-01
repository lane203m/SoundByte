

var pyshell =  require('python-shell');

var result;

  await pyshell.PythonShell.run('suggestionWSong.py', null, function  (err, results)  {
    if  (err)  throw err;
    console.log('hello.py finished.');
    console.log(results[0]);
    result = results[0];
    console.log(result);
  });
  console.log("AA");
  console.log(result);


/*const {PythonShell} = require('python-shell');

let pyshell = new PythonShell('suggestionWSong.py');

pyshell.on('message', function(message) {
  console.log(message);
})

pyshell.end(function (err) {
  if (err){
  throw err;
  };
  console.log('finished');
});*/
const {PythonShell} = require('python-shell');

let pyshell = new PythonShell('suggestionWFeature.py');

pyshell.on('message', function(message) {
  console.log(message);
})

pyshell.end(function (err) {
  if (err){
  throw err;
  };
  console.log('finished');
});
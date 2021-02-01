var PythonShell = require('python-shell').PythonShell;
var pyshell = new PythonShell('suggestionWFeature.py');
pyshell.on('message', function (message) {
    console.log(message);
});
pyshell.end(function (err) {
    if (err) {
        throw err;
    }
    ;
    console.log('finished');
});
//# sourceMappingURL=test.js.map
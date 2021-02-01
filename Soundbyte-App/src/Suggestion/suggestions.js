"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuggestionWRandom = exports.SuggestionWFeature = exports.SuggestionWSong = exports.Suggestion = void 0;
var pyshell = require('python-shell');
var Suggestion = /** @class */ (function () {
    function Suggestion() {
    }
    return Suggestion;
}());
exports.Suggestion = Suggestion;
var SuggestionWSong = /** @class */ (function (_super) {
    __extends(SuggestionWSong, _super);
    function SuggestionWSong(song) {
        var _this = _super.call(this) || this;
        _this.input = song;
        return _this;
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
    SuggestionWSong.prototype.beginSuggestion = function () {
        var result;
        pyshell.PythonShell.run('suggestionWSong.py', null, function (err, results) {
            if (err)
                throw err;
            console.log('hello.py finished.');
            console.log('results', results);
            result = results[0];
        });
        this.results.push(result);
    };
    return SuggestionWSong;
}(Suggestion));
exports.SuggestionWSong = SuggestionWSong;
var SuggestionWFeature = /** @class */ (function (_super) {
    __extends(SuggestionWFeature, _super);
    function SuggestionWFeature(features) {
        var _this = _super.call(this) || this;
        _this.input = features;
        return _this;
    }
    SuggestionWFeature.prototype.beginSuggestion = function () {
        var pyshell = new PythonShell('suggestionWFeature.py');
        pyshell.on('message', function (message) {
            console.log(message);
            this.results = message;
        });
        pyshell.end(function (err) {
            if (err) {
                throw err;
            }
            ;
            console.log('finished');
        });
    };
    return SuggestionWFeature;
}(Suggestion));
exports.SuggestionWFeature = SuggestionWFeature;
var SuggestionWRandom = /** @class */ (function (_super) {
    __extends(SuggestionWRandom, _super);
    function SuggestionWRandom(libraryData) {
        return _super.call(this, libraryData.getSong(Math.random())) || this;
    }
    return SuggestionWRandom;
}(SuggestionWSong));
exports.SuggestionWRandom = SuggestionWRandom;
//# sourceMappingURL=suggestions.js.map
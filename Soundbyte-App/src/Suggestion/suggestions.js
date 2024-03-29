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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuggestionWRandom = exports.SuggestionWFeature = exports.SuggestionWSong = exports.Suggestion = void 0;
var ResultsData_1 = require("../Types/ResultsData");
var path = require('path');
var pyshell = require('python-shell');
//A suggestion will run and expects to fill results with data.
var Suggestion = /** @class */ (function () {
    function Suggestion() {
    }
    return Suggestion;
}());
exports.Suggestion = Suggestion;
//suggestions with songs will require an aditional variable - input: Song. 
var SuggestionWSong = /** @class */ (function (_super) {
    __extends(SuggestionWSong, _super);
    function SuggestionWSong(song) {
        var _this = this;
        console.log(song);
        _this = _super.call(this) || this;
        _this.input = song;
        console.log(_this.input);
        return _this;
    }
    //Call a python shell, send options to python for parameters. Await results. 
    SuggestionWSong.prototype.runPythonShell = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                console.log(this.input);
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var options = {
                            mode: 'json', pythonOptions: ['-u'],
                            args: [JSON.stringify(_this.input)]
                        };
                        console.log(JSON.stringify(_this.input));
                        var shell = path.resolve(__dirname, './suggestionWSong.py');
                        pyshell.PythonShell.run(shell, options, function (err, results) {
                            if (err) {
                                console.log('fail');
                                console.log(err);
                                reject(err);
                            }
                            else {
                                console.log(results[0]);
                                resolve(results[0]);
                            }
                        });
                    })];
            });
        });
    };
    SuggestionWSong.prototype.beginSuggestion = function () {
        return __awaiter(this, void 0, void 0, function () {
            var output;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        alert("starting");
                        return [4 /*yield*/, this.runPythonShell().then(function (data) {
                                output = data;
                                alert("done");
                                console.log("done");
                            })];
                    case 1:
                        _a.sent();
                        console.log("done2");
                        console.log(this.results);
                        this.results = new ResultsData_1.ResultsData(output);
                        return [2 /*return*/];
                }
            });
        });
    };
    return SuggestionWSong;
}(Suggestion));
exports.SuggestionWSong = SuggestionWSong;
//same as above, only now python will recieve features as input instead of a song. 
var SuggestionWFeature = /** @class */ (function (_super) {
    __extends(SuggestionWFeature, _super);
    function SuggestionWFeature(features) {
        var _this = _super.call(this) || this;
        _this.input = features;
        return _this;
    }
    SuggestionWFeature.prototype.runPythonShell = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                console.log(this.input);
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var options = {
                            mode: 'json', pythonOptions: ['-u'],
                            args: [JSON.stringify(_this.input)]
                        };
                        var shell = path.resolve(__dirname, './suggestionWFeature.py');
                        pyshell.PythonShell.run(shell, options, function (err, results) {
                            if (err) {
                                console.log('fail');
                                console.log(err);
                                reject(err);
                            }
                            else {
                                console.log(results[0]);
                                resolve(results[0]);
                            }
                        });
                    })];
            });
        });
    };
    SuggestionWFeature.prototype.beginSuggestion = function () {
        return __awaiter(this, void 0, void 0, function () {
            var output;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        alert("starting");
                        return [4 /*yield*/, this.runPythonShell().then(function (data) {
                                output = data;
                                alert("done");
                                console.log("done");
                            })];
                    case 1:
                        _a.sent();
                        console.log("done2");
                        this.results = new ResultsData_1.ResultsData(output);
                        return [2 /*return*/];
                }
            });
        });
    };
    return SuggestionWFeature;
}(Suggestion));
exports.SuggestionWFeature = SuggestionWFeature;
//send a random song for suggestion.
var SuggestionWRandom = /** @class */ (function (_super) {
    __extends(SuggestionWRandom, _super);
    function SuggestionWRandom(libraryData) {
        return _super.call(this, libraryData.getSong(Math.floor(Math.random() * libraryData.songs.length))) || this;
    }
    return SuggestionWRandom;
}(SuggestionWSong));
exports.SuggestionWRandom = SuggestionWRandom;
//# sourceMappingURL=suggestions.js.map
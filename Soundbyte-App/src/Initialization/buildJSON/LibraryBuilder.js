"use strict";
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
exports.LibraryBuilder = void 0;
var Song_1 = require("../../Types/Song");
var musicDataExtractor = require("music-metadata");
//mport PromiseWorker from 'promise-worker';
// Worker from 'worker-loader!./worker.js';
var fs = require('fs');
var path = require('path');
//const essentia = require("essentia.js");
//const fooWorker = new essentia();
//const essentiaWorker = new Worker("essentia.js");
//WebAssembly.compileStreaming(fetch('simple.wasm'))
//.then(mod =>
//  essentiaWorker.postMessage(mod)
//);
//const Foo = require("worker!./essentiaWorker.js");
//const fooWorker = new Worker("essentiaWorker.js", { type: "module" });
//import { Essentia, EssentiaWASM } from 'essentia.js'
//const decode = require('audio-decode');
//const essentia = require('essentia.js');
var getAudioDurationInSeconds = require('get-audio-duration').getAudioDurationInSeconds;
//const buffer = require('audio-lena/mp3');
//console.log(fooWorker);
var WavDecoder = require("wav-decoder");
//const primes = require('./workers/primes');
//primes.getPrimes(100).then(primes => {
//  console.log('The first 100 prime numbers are:');
// console.log(JSON.parse(primes));
//});
var LibraryBuilder = /** @class */ (function () {
    function LibraryBuilder(iniPath, writePath, filePath) {
        this.iniDirectory = iniPath;
        this.writingDirectory = writePath;
        this.fileDirectory = filePath;
        //console.log(filePath);
    }
    //Get all required data from a song given a file name with path
    LibraryBuilder.prototype.buildSong = function (fileName) {
        return __awaiter(this, void 0, void 0, function () {
            var writeTo, iniDir, fileDir, song;
            return __generator(this, function (_a) {
                writeTo = this.writingDirectory;
                iniDir = this.iniDirectory;
                fileDir = this.fileDirectory;
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        return __awaiter(this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                setTimeout(function () { return resolve(song); }, 1000);
                                return [2 /*return*/];
                            });
                        });
                    }).then(function (song) {
                        return __awaiter(this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                song = new Song_1.Song(null, null, null, null, null); //new Song object
                                return [2 /*return*/, song];
                            });
                        });
                    }).then(function (song) {
                        return __awaiter(this, void 0, void 0, function () {
                            var metadata;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, musicDataExtractor.parseFile(fileName)];
                                    case 1:
                                        metadata = _a.sent();
                                        metadata.common.artist ?
                                            song.setAuthor(metadata.common.artist) :
                                            song.setAuthor("N/A");
                                        metadata.common.title ?
                                            song.setSongName(metadata.common.title) :
                                            song.setSongName(path.basename(fileName));
                                        song.setSongFile(path.basename(fileName));
                                        //console.log(metadata.format); 
                                        //console.log(song); 
                                        return [2 /*return*/, song];
                                }
                            });
                        });
                    }).then(function (song) {
                        return __awaiter(this, void 0, void 0, function () {
                            var readFile, buffer, audioData, worker;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        readFile = function (filepath) {
                                            return new Promise(function (resolve, reject) {
                                                fs.readFile(filepath, function (err, buffer) {
                                                    if (err) {
                                                        return reject(err);
                                                    }
                                                    return resolve(buffer);
                                                });
                                            });
                                        };
                                        return [4 /*yield*/, readFile(fileName)];
                                    case 1:
                                        buffer = _a.sent();
                                        return [4 /*yield*/, WavDecoder.decode(buffer)];
                                    case 2:
                                        audioData = _a.sent();
                                        worker = new Worker('../buildJSON/workers/primes/essentiaWorker.js', { type: 'module' });
                                        return [4 /*yield*/, worker.postMessage(audioData)];
                                    case 3:
                                        _a.sent();
                                        //worker.onmessage = ({ data }) => {
                                        //  console.log(`page got message: ${data}`);
                                        //};
                                        return [2 /*return*/, new Promise(function (resolve) {
                                                var worker = new Worker('../buildJSON/workers/primes/essentiaWorker.js', { type: 'module' });
                                                worker.postMessage(audioData);
                                                worker.onmessage = function (event) {
                                                    song.setFeatures(event.data);
                                                    resolve(song);
                                                };
                                            })];
                                }
                            });
                        });
                    }).then(function (song) {
                        return __awaiter(this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: // Get song length using get-audio-duration
                                    return [4 /*yield*/, getAudioDurationInSeconds(fileName).then(function (result) {
                                            song.setLength(result);
                                        })];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/, song];
                                }
                            });
                        });
                    }).then(function (song) {
                        console.log(song);
                        return song;
                    })];
            });
        });
    };
    //Write a library object to JSON after building said library with getSongs.
    LibraryBuilder.prototype.buildLibrary = function () {
        return __awaiter(this, void 0, void 0, function () {
            var writeTo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        writeTo = this.writingDirectory;
                        return [4 /*yield*/, this.getSongs().then(function (library) {
                                fs.writeFileSync(writeTo, JSON.stringify(library, null, 2));
                                //console.log(library);
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, 1];
                }
            });
        });
    };
    //Read all files in a directory, run extraction only for .wav files.
    LibraryBuilder.prototype.getSongs = function () {
        return __awaiter(this, void 0, void 0, function () {
            var fileDir, songs, files, i, fileName, _a, _b, library;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        fileDir = this.fileDirectory;
                        songs = [];
                        return [4 /*yield*/, fs.readdirSync(fileDir)];
                    case 1:
                        files = _c.sent();
                        i = 0;
                        _c.label = 2;
                    case 2:
                        if (!(i < files.length)) return [3 /*break*/, 5];
                        fileName = path.join(this.fileDirectory, files[i]);
                        if (!(fileName.indexOf('wav') >= 0)) return [3 /*break*/, 4];
                        _b = (_a = songs).push;
                        return [4 /*yield*/, this.buildSong(fileName)];
                    case 3:
                        _b.apply(_a, [_c.sent()]);
                        _c.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 2];
                    case 5:
                        library = { songs: songs };
                        alert("Reading Done, songs read: " + library.songs.length); //inform of completion
                        return [2 /*return*/, library];
                }
            });
        });
    };
    return LibraryBuilder;
}());
exports.LibraryBuilder = LibraryBuilder;
//# sourceMappingURL=LibraryBuilder.js.map
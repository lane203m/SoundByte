"use strict";
//Library Builder, generates JSON data for each song. 
//By: Mason Lane
//2021-03-03
//from a given init directory, we read every wav file
//each wav file has its length read for duration
//each wav file has its metadata read
//each wav file's audio buffer is read into a web worker
//the web worker returns bpm/key/scale leveraging essentia
//once all songs are prepared, we write to our JSON file 
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
var musicDataExtractor = require("music-metadata"); //reading metadata. works for wav/mp3/etc
var fs = require('fs');
var path = require('path');
var getAudioDurationInSeconds = require('get-audio-duration').getAudioDurationInSeconds; //used incase metadata does not have duration
var WavDecoder = require("wav-decoder"); //used to decode audio buffer of a wav. Will need mp3 equiv. mp3 is harder
var _a = require('electron'), app = _a.app, BrowserWindow = _a.BrowserWindow, ipcMain = _a.ipcMain;
var remote = require('electron').remote;
var ProgressBar = require('electron-progressbar');
var LibraryBuilder = /** @class */ (function () {
    function LibraryBuilder(iniPath, writePath, filePath) {
        this.iniDirectory = iniPath;
        this.writingDirectory = writePath;
        this.fileDirectory = filePath;
    }
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
            var fileDir, songs, files, library, filePath, numValidFiles, i, progressBar, i, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        fileDir = this.fileDirectory;
                        songs = [];
                        return [4 /*yield*/, fs.readdirSync(fileDir)];
                    case 1:
                        files = _c.sent();
                        numValidFiles = 0;
                        for (i = 0; i < files.length; i++) { //for each file  
                            filePath = path.join(fileDir, files[i]);
                            if (filePath.indexOf('wav') >= 0) { //if the file is a wav, run and push the song to songs
                                numValidFiles++;
                            }
                        }
                        progressBar = new ProgressBar({
                            indeterminate: false,
                            text: 'Preparing data...',
                            detail: 'Wait...',
                            maxValue: numValidFiles,
                            closeOnComplete: true,
                            remoteWindow: remote.BrowserWindow
                            //browserWindow: {
                            // webPreferences: {
                            //   nodeIntegration: true
                            // }
                        });
                        progressBar
                            .on('completed', function () {
                            console.info("completed...");
                            progressBar.detail = 'Task completed. Exiting...';
                        })
                            .on('aborted', function (value) {
                            console.info("aborted... " + value);
                        })
                            .on('progress', function (value) {
                            progressBar.detail = "Value " + value + " out of " + progressBar.getOptions().maxValue + "...";
                        });
                        // launch a task and set the value of the progress bar each time a part of the task is done;
                        // the progress bar will be set as completed when it reaches its maxValue (default maxValue: 100);
                        // ps: setInterval is used here just to simulate a task being done
                        progressBar.value = 0;
                        i = 0;
                        _c.label = 2;
                    case 2:
                        if (!(i < files.length)) return [3 /*break*/, 6];
                        filePath = path.join(fileDir, files[i]);
                        if (!(filePath.indexOf('wav') >= 0)) return [3 /*break*/, 5];
                        console.log(i);
                        _b = (_a = songs).push;
                        return [4 /*yield*/, this.buildSong(filePath)];
                    case 3: return [4 /*yield*/, _b.apply(_a, [_c.sent()])];
                    case 4:
                        _c.sent();
                        progressBar.value++;
                        _c.label = 5;
                    case 5:
                        i++;
                        return [3 /*break*/, 2];
                    case 6:
                        progressBar.setCompleted();
                        library = { songs: songs };
                        alert("Reading Done, songs read: " + library.songs.length); //inform of completion. To be replaced with loading popup
                        return [2 /*return*/, library];
                }
            });
        });
    };
    //Get all required data from a song given a file name with path
    LibraryBuilder.prototype.buildSong = function (filePath) {
        return __awaiter(this, void 0, void 0, function () {
            var song;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        song = new Song_1.Song(null, null, null, null, null); //new Song object
                        return [4 /*yield*/, this.readMetadata(song, filePath)];
                    case 1:
                        song = _a.sent(); //get tag data
                        return [4 /*yield*/, this.extractSongFeatures(song, filePath)];
                    case 2:
                        song = _a.sent(); //run essentia for features
                        return [4 /*yield*/, this.getAudioDuration(song, filePath)];
                    case 3:
                        song = _a.sent(); //get song length
                        return [2 /*return*/, song];
                }
            });
        });
    };
    //Read a songs tag metadata using node module
    LibraryBuilder.prototype.readMetadata = function (song, filePath) {
        return __awaiter(this, void 0, void 0, function () {
            var metadata;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, musicDataExtractor.parseFile(filePath)];
                    case 1:
                        metadata = _a.sent();
                        metadata.common.artist ? //set artist if any
                            song.setAuthor(metadata.common.artist) :
                            song.setAuthor("N/A");
                        metadata.common.title ? //set title, else file
                            song.setSongName(metadata.common.title) :
                            song.setSongName(path.basename(filePath));
                        song.setSongFile(path.basename(filePath)); //set file name
                        return [2 /*return*/, song];
                }
            });
        });
    };
    //gets the duration of a song using node module
    LibraryBuilder.prototype.getAudioDuration = function (song, filePath) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, getAudioDurationInSeconds(filePath).then(function (result) {
                            song.setLength(result); //read file & get length. return result.
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, song];
                }
            });
        });
    };
    ;
    //get feature data using essentia and worker
    LibraryBuilder.prototype.extractSongFeatures = function (song, filePath) {
        return __awaiter(this, void 0, void 0, function () {
            var readFile, buffer, audioData;
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
                        return [4 /*yield*/, readFile(filePath)];
                    case 1:
                        buffer = _a.sent();
                        return [4 /*yield*/, WavDecoder.decode(buffer)];
                    case 2:
                        audioData = _a.sent();
                        return [2 /*return*/, new Promise(function (resolve) {
                                var worker = new Worker('../buildJSON/workers/primes/essentiaWorker.js', {
                                    type: 'module'
                                });
                                worker.postMessage(audioData); //send audioData to our worker
                                worker.onmessage = function (event) {
                                    song.setFeatures(event.data); //upon finishing, set features
                                    resolve(song);
                                };
                            })];
                }
            });
        });
    };
    return LibraryBuilder;
}());
exports.LibraryBuilder = LibraryBuilder;
//# sourceMappingURL=LibraryBuilder.js.map
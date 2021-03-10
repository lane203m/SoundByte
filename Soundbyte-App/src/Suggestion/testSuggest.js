"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var suggestions_1 = require("./suggestions");
var Song_1 = require("../Types/Song");
var LibraryData_1 = require("../Types/LibraryData");
var Feature_1 = require("../Types/Feature");
var testFeat = new Feature_1.Feature();
var testSong = new Song_1.Song("testsong", "testauth", "/fuck", testFeat, 999);
var testLibrary = new LibraryData_1.LibraryData();
testFeat.setBpm(100);
testFeat.setKey("A");
testFeat.setScale("minor");
testSong.setFeatures(testFeat);
var suggesty = new suggestions_1.SuggestionWSong(testSong);
suggesty.runPythonShell(testLibrary);
var suggestionList = suggesty.beginSuggestion(testLibrary);
//# sourceMappingURL=testSuggest.js.map
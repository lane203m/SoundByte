import {SuggestionWSong} from './suggestions';
import {Song} from '../Types/Song';
import {LibraryData} from '../Types/LibraryData';
import {Feature} from '../Types/Feature';

console.log("test start");

var testFeat = new Feature();
var testSong = new Song("testsong","testauth","/fuck",testFeat,999);
var testLibrary = new LibraryData();

testFeat.setBpm(100);
testFeat.setKey("A");
testFeat.setScale("minor");

testSong.setFeatures(testFeat);

var suggesty = new SuggestionWSong(testSong);

suggesty.runPythonShell();
var suggestionList = suggesty.beginSuggestion();

console.log("test end");
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Song = void 0;
var Song = /** @class */ (function () {
    function Song(songName, author, songFile, features, songLength) {
        this.songName = songName;
        this.author = author;
        this.songFile = songFile;
        this.features = features;
        this.songLength = songLength;
    }
    Song.prototype.getSongName = function () {
        return this.songName;
    };
    Song.prototype.getAuthor = function () {
        return this.author;
    };
    Song.prototype.getSongFile = function () {
        return this.songFile;
    };
    Song.prototype.getFeatures = function () {
        return this.features;
    };
    Song.prototype.setSongName = function (songName) {
        this.songName = songName;
    };
    Song.prototype.setAuthor = function (author) {
        this.author = author;
    };
    Song.prototype.setSongFile = function (songFile) {
        this.songFile = songFile;
    };
    Song.prototype.setFeatures = function (features) {
        this.features = features;
    };
    Song.prototype.setLength = function (songLength) {
        this.songLength = songLength;
    };
    return Song;
}());
exports.Song = Song;
//# sourceMappingURL=Song.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Song = void 0;
var Song = /** @class */ (function () {
    function Song(songName, author, songFile, features) {
        this.songName = songName;
        this.author = author;
        this.songFile = songFile;
        this.features = features;
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
    return Song;
}());
exports.Song = Song;
//# sourceMappingURL=Song.js.map
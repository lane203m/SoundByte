"use strict";
//Library Object - Mason Lane
Object.defineProperty(exports, "__esModule", { value: true });
exports.LibraryData = void 0;
var fs = require('electron').remote.require('fs');
//import * as data from "../Libraries/songLibrary/library.json"
//library data. stores all songs. reads from JSON.
var LibraryData = /** @class */ (function () {
    function LibraryData() {
        try {
            var data = fs.readFileSync('./Libraries/songLibrary/library.json');
            data = JSON.parse(data);
            this.songs = data.songs;
        }
        catch (_a) {
            this.songs = null;
        }
    }
    LibraryData.prototype.getSong = function (n) {
        return this.songs[n];
    };
    return LibraryData;
}());
exports.LibraryData = LibraryData;
//# sourceMappingURL=LibraryData.js.map
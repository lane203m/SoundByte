"use strict";
//Library Object - Mason Lane
Object.defineProperty(exports, "__esModule", { value: true });
exports.LibraryData = void 0;
var data = require("../Libraries/songLibrary/library.json");
//library data. stores all songs. reads from JSON.
var LibraryData = /** @class */ (function () {
    function LibraryData() {
        this.songs = data.songs;
    }
    LibraryData.prototype.getSong = function (n) {
        return this.songs[n];
    };
    return LibraryData;
}());
exports.LibraryData = LibraryData;
//# sourceMappingURL=LibraryData.js.map
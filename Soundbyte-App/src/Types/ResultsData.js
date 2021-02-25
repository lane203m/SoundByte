"use strict";
//Results Object - Mason Lane
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultsData = void 0;
//results data. Will be used to store results. Unique but similar to library data.
var ResultsData = /** @class */ (function () {
    function ResultsData(songs) {
        this.songs = songs;
    }
    ResultsData.prototype.getSong = function (n) {
        return this.songs[n];
    };
    return ResultsData;
}());
exports.ResultsData = ResultsData;
//# sourceMappingURL=ResultsData.js.map
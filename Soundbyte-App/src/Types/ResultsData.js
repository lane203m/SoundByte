"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultsData = void 0;
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
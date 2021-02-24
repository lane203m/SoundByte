"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Feature = void 0;
var Feature = /** @class */ (function () {
    function Feature() {
    }
    Feature.prototype.getBpm = function () {
        return this.bpm;
    };
    Feature.prototype.getKey = function () {
        return this.key;
    };
    Feature.prototype.getScale = function () {
        return this.scale;
    };
    Feature.prototype.setBpm = function (bpm) {
        this.bpm = bpm;
    };
    Feature.prototype.setKey = function (key) {
        this.key = key;
    };
    Feature.prototype.setScale = function (scale) {
        this.scale = scale;
    };
    return Feature;
}());
exports.Feature = Feature;
//# sourceMappingURL=Feature.js.map
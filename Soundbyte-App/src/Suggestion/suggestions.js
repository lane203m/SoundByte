"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuggestionWRandom = exports.SuggestionWFeature = exports.SuggestionWSong = exports.Suggestion = void 0;
var Suggestion = /** @class */ (function () {
    function Suggestion() {
    }
    return Suggestion;
}());
exports.Suggestion = Suggestion;
var SuggestionWSong = /** @class */ (function (_super) {
    __extends(SuggestionWSong, _super);
    function SuggestionWSong(song) {
        var _this = _super.call(this) || this;
        _this.input = song;
        return _this;
    }
    return SuggestionWSong;
}(Suggestion));
exports.SuggestionWSong = SuggestionWSong;
var SuggestionWFeature = /** @class */ (function (_super) {
    __extends(SuggestionWFeature, _super);
    function SuggestionWFeature(features) {
        var _this = _super.call(this) || this;
        _this.input = features;
        return _this;
    }
    return SuggestionWFeature;
}(Suggestion));
exports.SuggestionWFeature = SuggestionWFeature;
var SuggestionWRandom = /** @class */ (function (_super) {
    __extends(SuggestionWRandom, _super);
    function SuggestionWRandom(libraryData) {
        return _super.call(this, libraryData.getSong(Math.random())) || this;
    }
    return SuggestionWRandom;
}(SuggestionWSong));
exports.SuggestionWRandom = SuggestionWRandom;
//# sourceMappingURL=suggestions.js.map
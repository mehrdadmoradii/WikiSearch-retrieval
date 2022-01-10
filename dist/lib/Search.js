"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.search = void 0;
var stopword_1 = __importDefault(require("stopword"));
var WikiSearch_1 = __importDefault(require("./WikiSearch"));
var WikiIndex_1 = __importDefault(require("./WikiIndex"));
var RedisMaker_1 = __importDefault(require("./RedisMaker"));
/**
 * Searchs for the given sentence and returns the result.
 * @param searchSentence
 * @returns
 */
var search = function (searchSentence) { return __awaiter(void 0, void 0, void 0, function () {
    var splitted, splittedWithoutStopWords, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                splitted = splitWords(searchSentence);
                splittedWithoutStopWords = removeStopWords(splitted);
                return [4 /*yield*/, chainResults(splittedWithoutStopWords)];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
exports.search = search;
/**
 * Combines the result of the given terms.
 *
 * @param terms
 * @returns
 */
var chainResults = function (terms) { return __awaiter(void 0, void 0, void 0, function () {
    var connection, wikiIndex, wikiSearch, i, newTerm;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, RedisMaker_1.default.getConnection()];
            case 1:
                connection = _a.sent();
                wikiIndex = new WikiIndex_1.default(connection);
                return [4 /*yield*/, WikiSearch_1.default.search(terms[0], wikiIndex)];
            case 2:
                wikiSearch = _a.sent();
                if (terms.length === 1)
                    return [2 /*return*/, wikiSearch.sort()];
                i = 1;
                _a.label = 3;
            case 3:
                if (!(i < terms.length)) return [3 /*break*/, 6];
                return [4 /*yield*/, WikiSearch_1.default.search(terms[i], wikiIndex)];
            case 4:
                newTerm = _a.sent();
                wikiSearch = wikiSearch.or(newTerm);
                _a.label = 5;
            case 5:
                i++;
                return [3 /*break*/, 3];
            case 6: return [2 /*return*/, wikiSearch.sort()];
        }
    });
}); };
/**
 * Breaks the sentence into words and returns the array of words.
 *
 * @param text
 * @returns
 */
var splitWords = function (text) {
    var splitted = text.split(' ');
    return splitted.filter(function (s) { return s !== ''; }).map(function (s) { return s.toLowerCase(); });
};
/**
 * Removes the stop words from array of words.
 *
 * @param texts
 * @returns
 */
var removeStopWords = function (texts) {
    return stopword_1.default.removeStopwords(texts, stopword_1.default.en);
};

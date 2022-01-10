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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Provides method to perform `getCounts` on the given Redis database.
 */
var WikiIndex = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param redis RedisClient
     */
    function WikiIndex(redis) {
        this.index = redis;
    }
    /**
     * Returns a map of urls that inculdes the `term` and counts of the `term`.
     *
     * @param term search term
     * @returns
     */
    WikiIndex.prototype.getCounts = function (term) {
        return __awaiter(this, void 0, void 0, function () {
            var counterMap, urls, urls_1, urls_1_1, url, redisKey, count, e_1_1;
            var e_1, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        counterMap = new Map();
                        return [4 /*yield*/, this.getURLs(term)];
                    case 1:
                        urls = _b.sent();
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 8, 9, 10]);
                        urls_1 = __values(urls), urls_1_1 = urls_1.next();
                        _b.label = 3;
                    case 3:
                        if (!!urls_1_1.done) return [3 /*break*/, 7];
                        url = urls_1_1.value;
                        redisKey = this.termCounterKey(url);
                        return [4 /*yield*/, this.index];
                    case 4: return [4 /*yield*/, (_b.sent()).hGet(redisKey, term)];
                    case 5:
                        count = _b.sent();
                        if (typeof count === 'string')
                            counterMap.set(url, parseInt(count));
                        _b.label = 6;
                    case 6:
                        urls_1_1 = urls_1.next();
                        return [3 /*break*/, 3];
                    case 7: return [3 /*break*/, 10];
                    case 8:
                        e_1_1 = _b.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 10];
                    case 9:
                        try {
                            if (urls_1_1 && !urls_1_1.done && (_a = urls_1.return)) _a.call(urls_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 10: return [2 /*return*/, counterMap];
                }
            });
        });
    };
    /**
     * Returns the set of URLs that the `term` has been appeared on.
     *
     * @param term
     * @returns
     */
    WikiIndex.prototype.getURLs = function (term) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.index];
                    case 1: return [4 /*yield*/, (_a.sent()).sMembers(this.urlSetKey(term))];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    WikiIndex.prototype.urlSetKey = function (term) {
        return "URLSet:" + term;
    };
    WikiIndex.prototype.termCounterKey = function (url) {
        return "TermCounter:" + url;
    };
    return WikiIndex;
}());
exports.default = WikiIndex;
// (async () => {
//     const conn = await RedisMaker.getConnection() 
//     const ws = new WikiIndex(conn);
//     const ab = await ws.getCounts('java');
//     console.log(ab.entrySetDescending())
// })()

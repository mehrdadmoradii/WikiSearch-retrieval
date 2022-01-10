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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var HeapPriorityQueue_1 = require("./HeapPriorityQueue");
/**
 * Provide methods to perform `Boolean Search` on the WikiIndex
 */
var WikiSearch = /** @class */ (function () {
    function WikiSearch(map) {
        this.map = map;
    }
    /**
     * Comibines the result of this search result to the result of other object.
     *
     * @param that
     * @returns
     */
    WikiSearch.prototype.or = function (that) {
        var e_1, _a;
        var union = new Map(this.map);
        try {
            for (var _b = __values(that.map), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), key = _d[0], value = _d[1];
                var relevance = value + (union.get(key) === undefined ? 0 : union.get(key));
                union.set(key, relevance);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return new WikiSearch(union);
    };
    /**
     * Finds the intersection of this search result to the result of given object.
     *
     * @param that
     * @returns
     */
    WikiSearch.prototype.and = function (that) {
        var e_2, _a;
        var intersection = new Map();
        try {
            for (var _b = __values(this.map), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), key = _d[0], value = _d[1];
                if (that.map.has(key)) {
                    var relevance = this.map.get(key) + value;
                    intersection.set(key, relevance);
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return new WikiSearch(intersection);
    };
    /**
     * Finds the difference between this search result and the result of given object.
     *
     * @param that
     * @returns
     */
    WikiSearch.prototype.minus = function (that) {
        var e_3, _a;
        var difference = new Map(this.map);
        try {
            for (var _b = __values(that.map.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var key = _c.value;
                if (difference.has(key)) {
                    difference.delete(key);
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return new WikiSearch(difference);
    };
    /**
     * Retrives the pages with given `term` keyboard.
     *
     * @param term
     * @param index
     * @returns
     */
    WikiSearch.search = function (term, index) {
        return __awaiter(this, void 0, void 0, function () {
            var map;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, index.getCounts(term)];
                    case 1:
                        map = _a.sent();
                        return [2 /*return*/, new WikiSearch(map)];
                }
            });
        });
    };
    /**
     * Sorts and returns the result of the given search object - Performs the Heapsort O(NlogN).
     *
     * @returns
     */
    WikiSearch.prototype.sort = function () {
        return HeapPriorityQueue_1.MaxPriorityQueue.sort(this.map.entries());
    };
    return WikiSearch;
}());
exports.default = WikiSearch;
// (async () => {
//     const conn = await RedisMaker.getConnection();
//     const wi = new WikiIndex(conn);
//     const ws: WikiSearch = await WikiSearch.search('java', wi);
//     const ws2: WikiSearch = await WikiSearch.search('programming', wi);
//     const abc = ws.or(ws2);
//     const def = abc.sort();
//     console.log(def);
// })()

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.MaxPriorityQueue = exports.MinHeapPriorityQueue = exports.Item = void 0;
/**
 * Lightweight composite to store items in PriorityQueue
 */
var Item = /** @class */ (function () {
    function Item(key, value) {
        this.key = key;
        this.value = value;
    }
    Item.prototype.compareTo = function (other) {
        if (this.value < other.value)
            return -1;
        if (this.value > other.value)
            return 1;
        if (this.value === other.value)
            return 0;
    };
    return Item;
}());
exports.Item = Item;
/**
 * Extended Item to provide reverse comparison.
 */
var MaxHeapItem = /** @class */ (function (_super) {
    __extends(MaxHeapItem, _super);
    function MaxHeapItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MaxHeapItem.prototype.compareTo = function (other) {
        if (this.value > other.value)
            return -1;
        if (this.value < other.value)
            return 1;
        if (this.value === other.value)
            return 0;
    };
    return MaxHeapItem;
}(Item));
/**
 * Min-oriented priority queue implemented using binary heap.
 */
var MinHeapPriorityQueue = /** @class */ (function () {
    function MinHeapPriorityQueue(content) {
        if (content === void 0) { content = null; }
        this.data = new Array();
        if (content) // bottom-up contructor
            this.heapify(content);
    }
    MinHeapPriorityQueue.prototype.parent = function (j) {
        return Math.floor((j - 1) / 2);
    };
    MinHeapPriorityQueue.prototype.left = function (j) {
        return j * 2 + 1;
    };
    MinHeapPriorityQueue.prototype.right = function (j) {
        return j * 2 + 2;
    };
    MinHeapPriorityQueue.prototype.hasLeft = function (j) {
        var left = this.left(j);
        return left < this.size();
    };
    MinHeapPriorityQueue.prototype.hasRight = function (j) {
        var right = this.right(j);
        return right < this.size();
    };
    MinHeapPriorityQueue.prototype.swap = function (i, j) {
        var temp = this.data[i];
        this.data[i] = this.data[j];
        this.data[j] = temp;
    };
    MinHeapPriorityQueue.prototype.upHeap = function (j) {
        if (j > 0) {
            var parent_1 = this.parent(j);
            var cmp = this.data[parent_1].compareTo(this.data[j]);
            if (cmp === 1) { // if parent is bigger than `j`
                this.swap(j, parent_1);
                this.upHeap(parent_1);
            }
        }
    };
    MinHeapPriorityQueue.prototype.downHeap = function (j) {
        if (this.hasLeft(j)) {
            var left = this.left(j);
            var smallerChild = left;
            if (this.hasRight(j)) {
                var right = this.right(j);
                var cmp_1 = this.data[right].compareTo(this.data[smallerChild]);
                if (cmp_1 === -1) // if right child is smaller that left child
                    smallerChild = right;
            }
            var cmp = this.data[j].compareTo(this.data[smallerChild]);
            if (cmp === 1) { // if data at index `j` is bigger than its smaller child
                this.swap(smallerChild, j);
                this.downHeap(smallerChild);
            }
        }
    };
    MinHeapPriorityQueue.prototype.heapify = function (content) {
        // for (const [k, v] of content) this.data.push(new Item(k, v));
        this.populateData(content);
        var start = this.parent(this.size() - 1);
        for (var i = start; i >= 0; i--)
            this.downHeap(i);
    };
    MinHeapPriorityQueue.prototype.populateData = function (content) {
        var e_1, _a;
        try {
            for (var content_1 = __values(content), content_1_1 = content_1.next(); !content_1_1.done; content_1_1 = content_1.next()) {
                var _b = __read(content_1_1.value, 2), k = _b[0], v = _b[1];
                this.data.push(new Item(k, v));
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (content_1_1 && !content_1_1.done && (_a = content_1.return)) _a.call(content_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    /**
     * Returns the number of elements stored in the PriorityQueue.
     * @returns size
     */
    MinHeapPriorityQueue.prototype.size = function () {
        return this.data.length;
    };
    /**
     * Returns true if PriorityQueue is empty.
     * @returns
     */
    MinHeapPriorityQueue.prototype.isEmpty = function () {
        return this.size() === 0;
    };
    /**
     * Adds a key-value pair to the PriorityQueue
     * @param key
     * @param value
     */
    MinHeapPriorityQueue.prototype.add = function (key, value) {
        this.data.push(new Item(key, value));
        this.upHeap(this.size() - 1);
    };
    /**
     * Returns but not removes the element with the minimum value.
     * @returns
     */
    MinHeapPriorityQueue.prototype.min = function () {
        var min = this.data[0];
        return new Item(min.key, min.value);
    };
    /**
     * Returns and removes the element with the minimum value.
     * @returns
     */
    MinHeapPriorityQueue.prototype.removeMin = function () {
        if (this.isEmpty())
            throw new Error('PriorityQueue is Empty');
        this.swap(0, this.size() - 1);
        var min = this.data.pop();
        this.downHeap(0);
        return min;
    };
    return MinHeapPriorityQueue;
}());
exports.MinHeapPriorityQueue = MinHeapPriorityQueue;
/**
 * Min-oriented priority queue implemented using binary heap.
 */
var MaxPriorityQueue = /** @class */ (function (_super) {
    __extends(MaxPriorityQueue, _super);
    function MaxPriorityQueue(content) {
        if (content === void 0) { content = null; }
        return _super.call(this, content) || this;
    }
    MaxPriorityQueue.prototype.populateData = function (content) {
        var e_2, _a;
        try {
            for (var content_2 = __values(content), content_2_1 = content_2.next(); !content_2_1.done; content_2_1 = content_2.next()) {
                var _b = __read(content_2_1.value, 2), k = _b[0], v = _b[1];
                this.data.push(new MaxHeapItem(k, v));
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (content_2_1 && !content_2_1.done && (_a = content_2.return)) _a.call(content_2);
            }
            finally { if (e_2) throw e_2.error; }
        }
    };
    MaxPriorityQueue.prototype.add = function (key, value) {
        this.data.push(new MaxHeapItem(key, value));
        _super.prototype.upHeap.call(this, this.size() - 1);
    };
    MaxPriorityQueue.prototype.min = function () {
        throw new Error('Max PriorityQueue does not provide this API');
    };
    MaxPriorityQueue.prototype.removeMin = function () {
        throw new Error('Max PriorityQueue does not provide this API');
    };
    /**
     * Returns but not removes the element with the maximum value.
     * @returns
     */
    MaxPriorityQueue.prototype.max = function () {
        return _super.prototype.min.call(this);
    };
    /**
     * Returns and removes the element with the maximum value.
     * @returns
     */
    MaxPriorityQueue.prototype.removeMax = function () {
        return _super.prototype.removeMin.call(this);
    };
    MaxPriorityQueue.sort = function (content) {
        if (content === void 0) { content = null; }
        var heap = new MaxPriorityQueue(content);
        var array = [];
        while (!heap.isEmpty())
            array.push(heap.removeMax());
        return array;
    };
    return MaxPriorityQueue;
}(MinHeapPriorityQueue));
exports.MaxPriorityQueue = MaxPriorityQueue;
// (() => {
//     const myMap: Map<string, number> = new Map();
//     myMap.set('https://en.wikipedia.org/wiki/Java_(software_platform)', 199);
//     myMap.set('https://en.wikipedia.org/wiki/Java_(programming_language)', 163);
//     myMap.set('https://en.wikipedia.org/wiki/Java_8', 99);
//     myMap.set('https://en.wikipedia.org/wiki/Java_version_history', 99);
//     myMap.set('https://en.wikipedia.org/wiki/Programming_language',130);
//     myMap.set('https://en.wikipedia.org/wiki/Java_applet', 59);
//     myMap.set('https://en.wikipedia.org/wiki/Java_Platform,_Standard_Edition', 86);
//     myMap.set('https://en.wikipedia.org/wiki/Java_virtual_machine',65);
//     // const myHeap = new MaxPriorityQueue(myMap.entries());
//     console.log(MaxPriorityQueue.sort(myMap.entries()));
// })();

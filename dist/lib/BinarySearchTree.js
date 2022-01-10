"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BinarySearchTree = exports.BSTNode = void 0;
var BSTNode = /** @class */ (function () {
    function BSTNode(value, left, right) {
        if (left === void 0) { left = null; }
        if (right === void 0) { right = null; }
        this.value = value;
        this.left = left;
        this.right = right;
    }
    return BSTNode;
}());
exports.BSTNode = BSTNode;
var BinarySearchTree = /** @class */ (function () {
    function BinarySearchTree() {
        this.treeSize = 0;
        this.root = null;
    }
    BinarySearchTree.prototype.size = function () {
        return this.treeSize;
    };
    BinarySearchTree.prototype.isEmpty = function () {
        return this.treeSize === 0;
    };
    BinarySearchTree.prototype.containsValue = function (value) {
        return !!this.findNode(this.root, value);
    };
    BinarySearchTree.prototype.treeHeight = function () {
        return this.heightHelper(this.root);
    };
    BinarySearchTree.prototype.heightHelper = function (node) {
        if (node === null)
            return 0;
        return Math.max(this.heightHelper(node.left), this.heightHelper(node.right)) + 1;
    };
    BinarySearchTree.prototype.add = function (value) {
        if (this.containsValue(value))
            return false;
        if (this.root === null) {
            this.root = new BSTNode(value);
            this.treeSize++;
            return true;
        }
        return this.addHelper(this.root, value);
    };
    BinarySearchTree.prototype.addHelper = function (node, value) {
        if (value < node.value) {
            if (node.left !== null) {
                return this.addHelper(node.left, value);
            }
            else {
                node.left = new BSTNode(value);
                this.treeSize++;
                return true;
            }
        }
        if (value > node.value) {
            if (node.right !== null) {
                return this.addHelper(node.right, value);
            }
            else {
                node.right = new BSTNode(value);
                this.treeSize++;
                return true;
            }
        }
    };
    BinarySearchTree.prototype.remove = function (value) {
        if (!this.containsValue(value))
            return false;
        this.root = this.removeHelper(this.root, value);
        this.treeSize--;
        return true;
    };
    BinarySearchTree.prototype.removeHelper = function (node, value) {
        if (node === null)
            return null; // node does not exist
        if (value < node.value) {
            node.left = this.removeHelper(node.left, value);
            return node;
        }
        else if (value > node.value) {
            node.right = this.removeHelper(node.right, value);
            return node;
        }
        else {
            if (node.left === null && node.right === null) {
                node = null;
                return node;
            }
            else if (node.left === null) {
                node = node.right;
                return node;
            }
            else if (node.right === null) {
                node = node.left;
                return node;
            }
            else {
                var rightMin = this.findMinNode(node.right);
                node.value = rightMin.value;
                node.right = this.removeHelper(node.right, rightMin.value);
                return node;
            }
        }
    };
    BinarySearchTree.prototype.toString = function () {
        var _this = this;
        var returnString = "";
        var toStringHook = function (node) {
            returnString += '\n';
            for (var i = 0; i < (_this.heightHelper(node) * 4); i++)
                returnString += '*';
            returnString += '{ ' + node.value + ' }';
        };
        this.inorderTraversal(this.root, toStringHook);
        return returnString;
    };
    BinarySearchTree.prototype.findMinNode = function (node) {
        if (node.left === null)
            return node;
        return this.findMinNode(node.left);
    };
    BinarySearchTree.prototype.findNode = function (node, value) {
        if (node === null)
            return null;
        if (value < node.value) { // recurse on left sub-tree
            return this.findNode(node.left, value);
        }
        if (value > node.value) { // recurse on right sub-tree
            return this.findNode(node.right, value);
        }
        // we found the node
        return node;
    };
    BinarySearchTree.prototype.toList = function () {
        var storage = [];
        var addHook = function (node) { return storage.push(node.value); };
        this.inorderTraversal(this.root, addHook);
        return storage;
    };
    BinarySearchTree.prototype.inorderTraversal = function (node, hook) {
        if (!node)
            return;
        this.inorderTraversal(node.left, hook);
        hook(node);
        this.inorderTraversal(node.right, hook);
    };
    return BinarySearchTree;
}());
exports.BinarySearchTree = BinarySearchTree;
// (function() {
//     const myBST = new BinarySearchTree<number>();
//     const value = [14, 7, 18, 17, 21, 5, 0, 2, 3, 11, 13, 7, 2, 13, 15, 12, 16, 5, 12, 14];
//     value.forEach(v => myBST.add(v));
//     value.forEach(v => {
//         myBST.remove(v);
//         console.log(myBST.toList())
//     })
// })();
// function isSorted(array: any[]): boolean {
//     for (let i=0; i<array.length; i++) {
//         for (let j=i+1; j<=array.length; j++) {
//             if (array[i] > array[j]) return false;
//         }
//     }
//     return true;
// }

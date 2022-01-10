export class BSTNode<T> {

    public value: T;
    public left: BSTNode<T>;
    public right: BSTNode<T>;

    constructor(value: T, left: BSTNode<T> = null, right: BSTNode<T> = null) {
        this.value = value;
        this.left = left;
        this.right = right;
    }

}

export class BinarySearchTree<T> {

    private treeSize: number;
    public root: BSTNode<T>;

    constructor() {
        this.treeSize = 0;
        this.root = null;
    }

    size(): number {
        return this.treeSize;
    }

    isEmpty(): boolean {
        return this.treeSize === 0;
    }

    containsValue(value: T): boolean {
        return !!this.findNode(this.root, value);
    }

    treeHeight(): number {
        return this.heightHelper(this.root);
    }

    private heightHelper(node: BSTNode<T>): number {
        if (node === null) return 0;
        return Math.max(this.heightHelper(node.left), this.heightHelper(node.right)) + 1;
    }

    add(value: T): boolean {
        if (this.containsValue(value)) 
            return false;

        if (this.root === null) {
            this.root = new BSTNode<T>(value);
            this.treeSize++;
            return true;
        }

        return this.addHelper(this.root, value);
    }

    
    private addHelper(node: BSTNode<T>, value: T): boolean {
        
        if (value < node.value) {
            if (node.left !== null) {
                return this.addHelper(node.left, value);
            } else {
                node.left = new BSTNode<T>(value);
                this.treeSize++;
                return true;
            }
        }
        
        if (value > node.value) {
            if (node.right !== null) {
                return this.addHelper(node.right, value);
            } else {
                node.right = new BSTNode<T>(value);
                this.treeSize++;
                return true;
            }
        }
        
    }

    remove(value: T): boolean {
        if (!this.containsValue(value))
            return false;
        this.root = this.removeHelper(this.root, value);
        this.treeSize--;
        return true;
    }

    private removeHelper(node: BSTNode<T>, value: T) : BSTNode<T> {

        if (node === null) return null; // node does not exist
        
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
                const rightMin = this.findMinNode(node.right);
                node.value = rightMin.value;
                node.right = this.removeHelper(node.right, rightMin.value);
                return node;
            }

        }
    }

    toString(): string {
        let returnString = "";
        const toStringHook = (node: BSTNode<T>) => {
            returnString += '\n';
            for (let i=0; i<(this.heightHelper(node)*4); i++) returnString += '*';
            returnString += '{ ' + node.value + ' }';
        };
        this.inorderTraversal(this.root, toStringHook);
        return returnString;
    }

    public findMinNode(node: BSTNode<T>): BSTNode<T> {
        if (node.left === null) return node;
        return this.findMinNode(node.left);
    }

    public findNode(node: BSTNode<T>, value: T): BSTNode<T> {
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
    } 

    toList(): T[] {
        const storage: T[] = [];
        const addHook = (node: BSTNode<T>) => storage.push(node.value);
        this.inorderTraversal(this.root, addHook);
        return storage;
    }

    private inorderTraversal(node: BSTNode<T>, hook: Function): void {
        if (!node) return;
        this.inorderTraversal(node.left, hook);
        hook(node);
        this.inorderTraversal(node.right, hook);
    }

}

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
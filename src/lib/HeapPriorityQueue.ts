
interface IItem<K, V> {
    key: K;
    value: V;
    compareTo(other: Item<K, V>): number;
}

/**
 * Lightweight composite to store items in PriorityQueue
 */
export class Item<K, V> implements IItem<K, V> {
    public key: K;
    public value: V;

    constructor(key: K, value: V) {
        this.key = key;
        this.value = value;
    }

    compareTo(other: Item<K, V>): number {
        if (this.value < other.value) return -1;
        if (this.value > other.value) return 1;
        if (this.value === other.value) return 0;
    }
}

/**
 * Extended Item to provide reverse comparison.
 */
class MaxHeapItem<K, V> extends Item<K, V> {
    override compareTo(other: Item<K, V>): number {
        if (this.value > other.value) return -1;
        if (this.value < other.value) return 1;
        if (this.value === other.value) return 0; 
    }
}

/**
 * Min-oriented priority queue implemented using binary heap.
 */
export class MinHeapPriorityQueue<K, V> {

    private parent(j: number): number {
        return Math.floor((j-1) / 2);
    }

    private left(j: number): number {
        return j*2 + 1;
    }

    private right(j: number): number {
        return j*2 + 2;
    }

    private hasLeft(j: number): boolean {
        const left = this.left(j);
        return left < this.size();
    }

    private hasRight(j: number): boolean {
        const right = this.right(j);
        return right < this.size();
    }

    private swap(i: number, j: number): void {
        const temp = this.data[i];
        this.data[i] = this.data[j];
        this.data[j] = temp;
    }

    protected upHeap(j: number): void {
        if (j > 0) {
            const parent = this.parent(j);
            const cmp = this.data[parent].compareTo(this.data[j]);
            if (cmp === 1) { // if parent is bigger than `j`
                this.swap(j, parent);
                this.upHeap(parent);
            }
        }
    }

    protected downHeap(j: number): void {
        if (this.hasLeft(j)) {
            const left = this.left(j)
            let smallerChild = left;
            if (this.hasRight(j)) {
                const right = this.right(j);
                const cmp = this.data[right].compareTo(this.data[smallerChild]);
                if (cmp === -1) // if right child is smaller that left child
                    smallerChild = right;
            }
            const cmp = this.data[j].compareTo(this.data[smallerChild]);
            if (cmp === 1) { // if data at index `j` is bigger than its smaller child
                this.swap(smallerChild, j);
                this.downHeap(smallerChild);
            }
        }
    }

    protected heapify(content: Iterable<any>) {
        // for (const [k, v] of content) this.data.push(new Item(k, v));
        this.populateData(content);
        let start = this.parent(this.size()-1);
        for (let i=start; i>=0; i--) this.downHeap(i);
    }

    protected populateData(content: Iterable<any>) {
        for (const [k, v] of content) this.data.push(new Item(k, v)); 
    }

    // ----------------------------------------------------------------------------
    // --------------------------- public methods ---------------------------------
    // ----------------------------------------------------------------------------

    protected data: IItem<K, V>[];

    constructor(content: Iterable<any> = null) {
        this.data = new Array<Item<K, V>>();
        if (content) // bottom-up contructor
            this.heapify(content);
    }

    /**
     * Returns the number of elements stored in the PriorityQueue.
     * @returns size
     */
    public size(): number {
        return this.data.length;
    }

    /**
     * Returns true if PriorityQueue is empty.
     * @returns 
     */
    public isEmpty(): boolean {
        return this.size() === 0;
    }

    /**
     * Adds a key-value pair to the PriorityQueue
     * @param key 
     * @param value 
     */
    public add(key: K, value: V): void {
        this.data.push(new Item(key, value));
        this.upHeap(this.size() - 1);
    }

    /**
     * Returns but not removes the element with the minimum value.
     * @returns 
     */
    public min(): Item<K, V> {
        const min = this.data[0];
        return new Item(min.key, min.value);
    }

    /**
     * Returns and removes the element with the minimum value.
     * @returns 
     */
    public removeMin(): Item<K, V> {
        if (this.isEmpty())
            throw new Error('PriorityQueue is Empty');
        this.swap(0, this.size()-1);
        const min = this.data.pop();
        this.downHeap(0);
        return min;
    }
}

/**
 * Min-oriented priority queue implemented using binary heap.
 */
export class MaxPriorityQueue<K, V> extends MinHeapPriorityQueue<K, V> {

   constructor(content: Iterable<any> = null) {
       super(content);
   } 

   override populateData(content: Iterable<any>) {
        for (const [k, v] of content) this.data.push(new MaxHeapItem(k, v)); 
    }

   public override add(key: K, value: V): void {
       this.data.push(new MaxHeapItem(key, value));
       super.upHeap(this.size() - 1);
   }

   public override min(): Item<K, V> {
       throw new Error('Max PriorityQueue does not provide this API');
   }

   public override removeMin(): Item<K, V> {
       throw new Error('Max PriorityQueue does not provide this API');
   }

   /**
    * Returns but not removes the element with the maximum value.
    * @returns 
    */
   public max(): MaxHeapItem<K, V> {
       return super.min();
   }

   /**
    * Returns and removes the element with the maximum value.
    * @returns 
    */
   public removeMax(): MaxHeapItem<K, V> {
       return super.removeMin();
   }

   static sort(content: Iterable<any> = null): any[] {
        const heap = new MaxPriorityQueue(content);
        const array = [];
        while (!heap.isEmpty()) array.push(heap.removeMax());
        return array;
   }
   

}


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
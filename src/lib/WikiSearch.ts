import WikiIndex from "./WikiIndex";
import RedisMaker from "./RedisMaker";
import { MaxPriorityQueue, Item } from "./HeapPriorityQueue";

/**
 * Provide methods to perform `Boolean Search` on the WikiIndex
 */
export default class WikiSearch {

    private map: Map<string, number>;

    constructor(map: Map<string, number>) {
        this.map = map;
    }

    /**
     * Comibines the result of this search result to the result of other object.
     * 
     * @param that 
     * @returns 
     */
    public or(that: WikiSearch): WikiSearch {
        const union: Map<string, number> = new Map(this.map);
        for(const [key, value] of that.map) {
            const relevance = value + (union.get(key) === undefined ? 0 : union.get(key));
            union.set(key, relevance);
        }
        return new WikiSearch(union);
    }

    /**
     * Finds the intersection of this search result to the result of given object.
     * 
     * @param that 
     * @returns 
     */
    public and(that: WikiSearch): WikiSearch {
        const intersection: Map<string, number> = new Map();
        for(const [key, value] of this.map) {
            if (that.map.has(key)) {
                const relevance = this.map.get(key) + value;
                intersection.set(key, relevance);
            }
        }
        return new WikiSearch(intersection);
    }

    /**
     * Finds the difference between this search result and the result of given object.
     * 
     * @param that 
     * @returns 
     */
    public minus(that: WikiSearch): WikiSearch {
        const difference: Map<string, number> = new Map(this.map);
        for(const key of that.map.keys()) {
            if (difference.has(key)) {
                difference.delete(key);
            }
        }
        return new WikiSearch(difference);
    } 

    /**
     * Retrives the pages with given `term` keyboard.
     * 
     * @param term 
     * @param index 
     * @returns 
     */
    public static async search(term: string, index: WikiIndex): Promise<WikiSearch> {
        const map: Map<string, number> = await index.getCounts(term);
        return new WikiSearch(map);
    }

    /**
     * Sorts and returns the result of the given search object - Performs the Heapsort O(NlogN).
     * 
     * @returns 
     */
    public sort(): Item<string, number>[] {
        return MaxPriorityQueue.sort(this.map.entries());
    }

}

// (async () => {
//     const conn = await RedisMaker.getConnection();
//     const wi = new WikiIndex(conn);
//     const ws: WikiSearch = await WikiSearch.search('java', wi);
//     const ws2: WikiSearch = await WikiSearch.search('programming', wi);

//     const abc = ws.or(ws2);
//     const def = abc.sort();
//     console.log(def);
// })()
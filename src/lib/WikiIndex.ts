import * as redis from 'redis';
import RedisMaker from './RedisMaker';

/**
 * Provides method to perform `getCounts` on the given Redis database.
 */
export default class WikiIndex {

    private index: redis.RedisClientType<any>;

    /**
     * Constructor
     * 
     * @param redis RedisClient
     */
    constructor(redis: redis.RedisClientType) {
        this.index = redis;
    }


    /**
     * Returns a map of urls that inculdes the `term` and counts of the `term`.
     * 
     * @param term search term
     * @returns 
     */
    public async getCounts(term: string): Promise<Map<string, number>> {
        const counterMap: Map<string, number> = new Map<string, number>();
        const urls = await this.getURLs(term);
        for (let url of urls) {
            const redisKey = this.termCounterKey(url);
            const count = await (await this.index).hGet(redisKey, term);
            if (typeof count === 'string') counterMap.set(url, parseInt(count))
        }
        return counterMap;
    }

    /**
     * Returns the set of URLs that the `term` has been appeared on.
     * 
     * @param term 
     * @returns 
     */
    public async getURLs(term: string): Promise<any> {
        return await (await this.index).sMembers(this.urlSetKey(term));
    }


    private urlSetKey(term: string): string {
        return "URLSet:" + term; 
    }

    private termCounterKey(url: string): string {
        return "TermCounter:" + url; 
    }

}


// (async () => {
//     const conn = await RedisMaker.getConnection() 
//     const ws = new WikiIndex(conn);
//     const ab = await ws.getCounts('java');
//     console.log(ab.entrySetDescending())
// })()
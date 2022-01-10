import * as redis from 'redis';

/**
 * Provide redis client instance using Singleton pattern
 */
export default class RedisMaker {

    private static index: redis.RedisClientType<any>;

    /**
     * Provides a redis client instance
     * 
     * @returns Redis client instance
     */
    public static async getConnection(): Promise<redis.RedisClientType> {
        if (RedisMaker.index === undefined) {
            RedisMaker.index = redis.createClient();
            try { await RedisMaker.index.connect() }
            catch(e) { console.error(e) }
        }
        return RedisMaker.index;
    }

}
import {Logger} from 'winston';
import { createClient, RedisClientType } from 'redis';
import { Config } from 'convict';
import config from '../../../config/index';
import {logger} from '../../logger/index';


/**
 * Manages connection to RedisDBManager
 */

class RedisDBManager {

    
    private readonly config: Config<any>;
    private readonly port: number;
    private readonly host: string;
    private readonly log: Logger;

    constructor() {
        this.config = config;
        this.port = config.get('cache.cachePort');
        this.host = config.get('cache.cacheHost');
        this.log = logger;
    }


    async connect() {
        const redisClient = createClient();
        redisClient.on('error', (err) => this.log.info('Redis Client Error', err));
        await redisClient.connect();
        redisClient.on('connect',  (err) => {
            this.log.info('Connected to Redis');
        });
        return redisClient;
    }
}

export default RedisDBManager;
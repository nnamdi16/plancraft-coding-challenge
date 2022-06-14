import { createClient, RedisClientType } from 'redis';
import IBaseRepository from '../interfaces/IBaseRepository';
import { Logger } from "winston";
import {logger} from '../../logger/index';
import { GenericMatch } from '../interfaces/IProject';

class BaseRepository implements IBaseRepository {
    private readonly log: Logger;
    constructor() {
        this.log = logger
    }
    async connect() {
        const redisClient: RedisClientType = createClient();
        redisClient.on('error', (err) => this.log.info(`Redis Client Error ${err}`));
        await redisClient.connect();
        redisClient.on('connect', (err) => {
            this.log.info(`Connected to Redis`);
        });
        return redisClient;

    }

    async getAll(entity: string): Promise<any> {
        const redisClient = await this.connect();
        return redisClient.hGetAll(entity);
    }

    async persist(entity:GenericMatch): Promise<any> {
        const redisClient = await this.connect();
        return redisClient.hSet(entity?.name, entity?.id, JSON.stringify(entity));
    }

    async getBy(entity: string, filter: string): Promise<any> {

        const redisClient = await this.connect();
        return redisClient.hGet(entity, filter);
    }

    async updateQuery(filter: string, update: GenericMatch): Promise<any> {
        const data = await this.getBy(update?.name, filter);
 
        if(data) {
            await this.deleteQuery( update?.name, filter);
            return await this.persist({...update, id: filter});
        }
        return data;
       
    }

    async deleteAll(key: string): Promise<any> {
        const redisClient = await this.connect()
        return redisClient.del(key);
    }

    async deleteQuery(name:string, id:string): Promise<any> {
        const redisClient = await this.connect();
        return redisClient.hDel(name, id)
    }

}
export default BaseRepository;
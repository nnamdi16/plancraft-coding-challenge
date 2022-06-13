import { createClient, RedisClientType } from 'redis';
import IBaseRepository from '../interfaces/IBaseRepository';

class BaseRepository implements IBaseRepository {
    async connect() {
        const redisClient: RedisClientType = createClient();
        redisClient.on('error', (err) => console.log('Redis Client Error', err));
        await redisClient.connect();
        redisClient.on('connect', (err) => {
            console.log('Connected to Redis');
        });
        return redisClient;

    }

    getIds(_filter: any): Promise<any> {
        throw new Error('Method not implemented.');
    }

    async getAll(entity: any): Promise<any> {
        const redisClient = await this.connect();
        return redisClient.hGetAll(entity);
    }

    async persist(entity: any): Promise<any> {
        const redisClient = await this.connect();
        return redisClient.hSet(entity?.name, entity?.id, JSON.stringify(entity));
    }

    async getBy(entity: any, filter: any): Promise<any> {

        const redisClient = await this.connect();
        return redisClient.hGet(entity, filter);
    }

    async updateQuery(filter: any, update: any): Promise<any> {
        await this.deleteQuery(filter);
        return this.persist(update);
    }

    async deleteAll(key: string): Promise<any> {
        const redisClient = await this.connect()
        return redisClient.del(key);
    }

    async deleteQuery(filter: any): Promise<any> {
        const redisClient = await this.connect();
        return redisClient.hDel('project', filter)
    }

}
export default BaseRepository;
import BaseRepository from '../../../src/infrastructure/repositories/implementations/BaseRepository';
import { expect, describe, it, jest } from '@jest/globals';
import redis from '../../../__mocks__/redis'



const payload = {
  "name": "Power",
  "id": "60",
  "description": "davidbowo1234567891356@yopmail.com"
 
 }
describe('project', () => {
    jest.mock('redis');
  it('return the cached payload', async () => {
    const baseRepository = new BaseRepository();
    const id = '12345';
  
    const redisClient = redis.createClient();
    redisClient.hGet.mockImplementation(() => Promise.resolve(payload));
    redisClient.connect.mockImplementationOnce((done) => Promise.resolve(done));
    const payload = {
      "name": "Power",
      "id": "60",
      "description": "davidbowo1234567891356@yopmail.com"

    }
    await expect(baseRepository.connect()).resolves.toBeCalled()
    // await expect(baseRepository.getBy(payload.name, payload.id)).resolves.toContainEqual(payload)
    // await expect(project.getProjectById(id)).resolves.toEqual(payload);
  })

  // it('should resolve with false for invalid token', async () => {
  //   const response = await user.auth('invalidToken')
  //   expect(response).toEqual({ error: { type: 'unauthorized', message: 'Authentication Failed' } })
  // })
})
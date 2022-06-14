import Project from '../../../src/app/project';
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
    const project = new Project();
    const id = '12345';
  
    const redisClient = redis.createClient();
    redisClient.hGet.mockImplementation(() => Promise.resolve(payload));
    redisClient.connect.mockImplementationOnce((done) => Promise.resolve(done));
    const payload = {
      "name": "Power",
      "id": "60",
      "description": "davidbowo1234567891356@yopmail.com"

    }
    // await expect(project.getProjectById(id)).resolves.toEqual(payload)
    await project.getProjectById(id).then((res) => {
      expect(res).toMatchObject(expect.objectContaining(payload));
    });
  })

  // it('should resolve with false for invalid token', async () => {
  //   const response = await user.auth('invalidToken')
  //   expect(response).toEqual({ error: { type: 'unauthorized', message: 'Authentication Failed' } })
  // })
})
import { jest } from '@jest/globals'; import { number } from 'joi';
;


export default {
    createClient() {
        return {
           
            connect: jest.fn((done) => Promise.resolve(done)),
            hGetAll: jest.fn(() => Promise.resolve([{}])),
            hGet: jest.fn(() => Promise.resolve({})),
            hSet: jest.fn(() => Promise.resolve(true)),
            del: jest.fn(() => Promise.resolve(true)),
            hDel: jest.fn(() => Promise.resolve(true)),
        }
    },
   

}
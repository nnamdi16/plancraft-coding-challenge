import HttpServer from '../../src/interfaces/http/server';
import authTests from './auth.test';
import { makeInvoker } from 'awilix-express';

const routePrefix = '/v1';


const func = makeInvoker(HttpServer);


// Hide console logs
console.error = () => {};

describe('Admin Server', () => {
  describe('Auth Endpoints', async () => authTests(func('start'), routePrefix));
});

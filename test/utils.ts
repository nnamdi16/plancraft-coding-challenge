import { MongoMemoryServer } from 'mongodb-memory-server';
import {app} from '../src'
import chai from 'chai';
import chaiHttp from 'chai-http';
import chaiPromise from 'chai-as-promised';
import jwt  from 'jsonwebtoken';
import mongoose from 'mongoose';
import nock from 'nock';

const expect = chai.expect;

chai.use(chaiPromise)
chai.use(chaiHttp)

function generateUserAuthToken(user: any) {
  return jwt.sign(
    { id: user },
    process.env.JWT_TOKEN as string,
    { expiresIn: '1h' }
  );
}

function generateRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

function mockMailgunAPI() {
  return nock('https://api.sendgrid.com')
    .post(`/v3/${process.env.MAILGUN_DOMAIN}/messages`)
    .reply(200, { message: 'Received' });
}


function testTokenValidation(app: any, method: string, url: string) {
  it('Should fail with missing token', async () => {
    const request = chai.request(app).get(url);
    request.method = method;

    const response = await request.send();
    expect(response.status).to.be.equal(401);
    expect(response.body.success).to.be.equal(false);
  });

  it('Should fail with invalid token', async() => {
    const request = chai.request(app).get(url)
      .set('Authorization', `Bearer invalidtoken`);
    request.method = method;

    const response = await request.send();
    expect(response.status).to.be.equal(401);
    expect(response.body.success).to.be.equal(false);
  });
}

async function testAccessControl(app: any, method: string, url: string, dataObj: any) {
  it('Should fail to allow form user access route', async () => {
    const request = chai.request(app).get(url)
      .set('Authorization', `Bearer ${dataObj.authTokens.user3.workspace0}`);
    request.method = method;

    const response = await request.send();
    expect(response.status).to.be.equal(403);
    expect(response.body.success).to.be.equal(false);
  });
}

async function MockDBConnection() {
  
  const options = {
    keepAlive: true,
    connectTimeoutMS: 30000,
    socketTimeoutMS: 0,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  
  // const connection = mongoose.createConnection();
  // const mongoServer = await MongoMemoryServer.create();
  
  // const connectionString = mongoServer.getUri()

  // connection.openUri(connectionString, options, error => {
  //   if (error) {
  //     console.log('DB connection failed');
  //     console.log(error)
  //     process.exit(1);
  //   }
  //   console.log('v3 local DB connected');
  // })

  let connection = mongoose.createConnection(
    'mongodb://localhost:27017/evea_test',
    options,
    error => {
      if (error) {
        console.log(error);
        console.log('DB connection failed');
        process.exit(1);
      }
      console.log('DB connected');
      require('./initModels');
    }
  );

  return connection;
}

export {
  generateUserAuthToken,
  generateRandomInt,
  mockMailgunAPI,
  testTokenValidation,
  testAccessControl,
  MockDBConnection
};

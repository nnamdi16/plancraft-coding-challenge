import { MockDBConnection } from '../utils'
import UserModel from '../../src/infrastructure/databases/Mongodb/models/User'
import bcrypt from 'bcryptjs';

// const { generateUserAuthToken} = require('../utils');

function generateUser(email: string) {
    return {
      firstName: 'Test',
      lastName: 'Test',
      email,
      password: bcrypt.hashSync('password')
    };
  }

  let connection: any = null;

  async function up() {
    // connection = await MockDBConnection();
    
    // console.log(UserModel.db.host)
  
    const users = await UserModel.insertMany([
      generateUser('test1@test.com'),
      generateUser('test2@test.com'),
      generateUser('test3@test.com'),
      generateUser('formuser@test.com')
    ]);
  
    
    // const authTokens = {
    //   user0: {
    //     workspace0: generateUserAuthToken(users[0]._id),
    //     limitedWorkspace: generateUserAuthToken(users[0]._id)
    //   },
    //   user1: {
    //     workspace0: generateUserAuthToken(users[1]._id),
    //     workspace1: generateUserAuthToken(users[1]._id)
    //   },
    //   user2: {
    //     workspace0: generateUserAuthToken(users[2]._id),
    //     workspace1: generateUserAuthToken(users[2]._id),
    //     workspace2: generateUserAuthToken(users[2]._id)
    //   },
    //   user3: {
    //     workspace0: generateUserAuthToken(users[3]._id)
    //   }
    // };
  
    return {
      users,
      // authTokens: authTokens,
    };
  }
  
  async function down() {
    await Promise.all([
      UserModel.deleteMany({}),
    ]);
    connection.close();
  }
  
  export default { up, down };
import { MockDBConnection } from '../utils'
import PermissionModel from '../../src/infrastructure/databases/Mongodb/models/Permission'
import bcrypt from 'bcryptjs';


function generatePermission(name: string) {
    return {
      name 
    };
  }

  let connection: any = null;

  async function up() {
    // connection = await MockDBConnection();
    
    // console.log(UserModel.db.host)
  
    const permissions = await PermissionModel.insertMany([
      generatePermission('create_role'),
      generatePermission('update_role'),
      generatePermission('delete_role'),
      generatePermission('fetch_role')
    ]);
  
    return {
      permissions,
    };
  }
  
  async function down() {
    await Promise.all([
      PermissionModel.deleteMany({}),
    ]);
    connection.close();
  }
  
  export default { up, down };
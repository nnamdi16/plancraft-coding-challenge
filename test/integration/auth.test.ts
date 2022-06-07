import {ObjectId} from 'mongoose';
import UserModel from '../../src/infrastructure/databases/Mongodb/models/User'
import bcrypt from 'bcryptjs';
import chai from 'chai';
import chaiHttp from 'chai-http';
import chaiPromise from 'chai-as-promised';
import userSeed from "../seed/user";

const expect = chai.expect;


chai.use(chaiPromise)
chai.use(chaiHttp)


const {
	generateRandomInt,
	mockMailgunAPI,
	// testTokenValidation,
} = require("../utils");

let testUsers: any;
// let zeroWorkspaceUser, testTokens, testWorkspaces, authTokens;

// function generateToken(purpose: any, user: any) {
// 	return {
// 		purpose,
// 		user,
// 		userType: "User",
// 		token: `testtoken${generateRandomInt(100, 200)}`,
// 	};
// }

export default function (app: any, prefix: string) {
	before(async () => {
		const data = await userSeed.up();
		testUsers = data.users;
		// authTokens = data.authTokens;

		// zeroWorkspaceUser = await UserModel.create({
		// 	email: "zeroworkspaceuser@test.com",
		// 	password: bcrypt.hashSync("password"),
		// });

		// testTokens = await TokenModel.insertMany([
		// 	generateToken("LOGIN", testUsers[0]._id),
		// 	generateToken("EMAIL_VERIFICATION", testUsers[0]._id),
		// 	generateToken("PASSWORD_RESET", testUsers[1]._id),
		// ]);
	});

	describe("POST /auth/signup", () => {
		const url = `${prefix}/auth/signup`;
		const data = {
			firstName: "Testing",
			lastName: "Testing",
			email: "testing@test.com",
			password: "password",
		};

		it.only("Should successfully register a user", async () => {
			const mailgunMock = mockMailgunAPI();

			const response = await chai.request(app).post(url).send(data);
			
			expect(response.status).to.be.equal(200);
			expect(response.body.success).to.be.equal(true);
			expect(response.body.data.token).to.be.a("String");

			const userId = response.body.data.user._id;
			const { password, ...userData } = data;

			expect(response.body.data.user).to.be.a("Object");
			expect(response.body.data.user).to.deep.contain(userData);
			expect(response.body.data.user.password).to.be.equal(undefined);

			// Ensure verification mail was sent
			expect(mailgunMock.isDone()).to.be.equal(true);

			// Ensure user was created properly
			const user = await UserModel.findById(userId).lean();
			expect(user).to.be.a("Object");
			expect(user).to.deep.contain(userData);
			expect(user.emailVerified).to.be.equal(false);

			// Ensure email verification token was created
			// const token = await TokenModel.findOne({ purpose: "EMAIL_VERIFICATION", user: userId });
			// expect(token).to.be.a("Object");
		});
		it("Should fail to signup with duplicate email", async () => {
			const copy = { ...data };
			copy.email = testUsers[0].email;

			const response = await chai.request(app).post(url).send(copy);
			expect(response.status).to.be.equal(400);
			expect(response.body.success).to.be.equal(false);
			expect(response.body.error).to.be.equal("Email already in use");
		});
	});


	after(async () => {
		await Promise.all([userSeed.down()]);
		// await Promise.all([userSeed.down(), LogModel.deleteMany(), TokenModel.deleteMany()]);
	});
};







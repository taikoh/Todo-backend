var express = require("express");
var jsend = require("jsend");
var router = express.Router();
const db = require("../models");
const crypto = require("crypto");
const UserService = require("../services/UserService");
const userService = new UserService(db);
const jwt = require("jsonwebtoken");
router.use(jsend.middleware);

// Post for registered users to be able to login
router.post("/login", express.json(), async (req, res, next) => {
	// #swagger.tags = ["Auth"]
	// #swagger.description = "Logs the user to the application. Both email and password need to be correct. After successful login, the JWT token is returned - use it later in Authorization header to access the other endpoints"
	/* #swagger.parameters['body'] = {
        in: 'body',
        description: 'Login credentials',
        required: true,
        schema: { $ref: '#/definitions/Login' }
    } */
	const { email, password } = req.body;

	if (email == null) {
		res
			.status(400)
			.jsend.fail({ statusCode: 400, result: "Email is required" });
	}

	if (password == null) {
		res
			.status(400)
			.jsend.fail({ statusCode: 400, result: "Password is required" });
	}

	userService.getOne(email).then((data) => {
		if (data == null) {
			res
				.status(400)
				.jsend.fail({ statusCode: 400, result: "Incorrect email or password" });
		}

		crypto.pbkdf2(
			password,
			data.Salt,
			310000,
			32,
			"sha256",
			(err, hashedPassword) => {
				if (err) {
					return cb(err);
				}

				if (!crypto.timingSafeEqual(data.EncryptedPassword, hashedPassword)) {
					return res
						.status(400)
						.jsend.fail({
							statusCode: 400,
							result: "Incorrect email or password",
						});
				}

				let token;
				try {
					token = jwt.sign(
						{ id: data.id, email: data.email },
						process.env.TOKEN_SECRET,
						{ expiresIn: "1h" },
					);
				} catch {
					res.jsend.error("JWT token creation error");
				}

				res.status(200).jsend.success({
					statusCode: 200,
					result: "Successfully logged in",
					id: data.id,
					email: data.email,
					token: token,
				});
			},
		);
	});
});

// Post for new users to register / signup
router.post("/signup", express.json(), async (req, res, next) => {
	/* #swagger.tags = ['Auth'] */
	/* #swagger.description = 'Create a new user account' */
	/* #swagger.parameters['body'] = {
        in: 'body',
        description: 'User info',
        required: true,
        schema: { $ref: '#/definitions/User' }
    } */

	const { name, email, password } = req.body;
	if (!name)
		return res
			.status(400)
			.jsend.fail({ statusCode: 400, result: "Name is required" });
	if (!email)
		return res
			.status(400)
			.jsend.fail({ statusCode: 400, result: "Email is required" });
	if (!password)
		return res
			.status(400)
			.jsend.fail({ statusCode: 400, result: "Password is required" });

	const salt = crypto.randomBytes(16);
	crypto.pbkdf2(
		password,
		salt,
		310000,
		32,
		"sha256",
		function (err, hashedPassword) {
			if (err) {
				return next(err);
			}

			userService.create(name, email, hashedPassword, salt);
			res
				.status(200)
				.jsend.success({
					statusCode: 200,
					result: "Account has been created!",
				});
		},
	);
});

module.exports = router;

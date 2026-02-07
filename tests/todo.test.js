const express = require("express");
const request = require("supertest");
const jsend = require("jsend");
require("dotenv").config();

// Import routes
const authRoutes = require("../routes/auth");
const categoryRoutes = require("../routes/categories");
const todoRoutes = require("../routes/todos");

const app = express();
app.use(express.json());
app.use(jsend.middleware); // ensure JSend is active
app.use("/", authRoutes);
app.use("/category", categoryRoutes);
app.use("/todos", todoRoutes);

describe("Testing auth, create/get/delete todo, get todo without JWT token, get todo with invalid JWT token", () => {
	let token;
	let categoryId;
	let todoId;

	const user = {
		name: "testuser",
		email: "test@test.com",
		password: "test"
	};

	test("POST /signup - success", async () => {
		const { body } = await request(app).post("/signup").send(user);
		expect(body).toHaveProperty("status", "success");
		expect(body).toHaveProperty("data");
		expect(body.data).toHaveProperty("result");
		expect(body.data.result).toBe("Account has been created!");
	});

	test("POST /login - success", async () => {
		const { body } = await request(app).post("/login").send({
			email: user.email,
			password: user.password
		});
		expect(body).toHaveProperty("status", "success");
		expect(body).toHaveProperty("data");
		expect(body.data).toHaveProperty("result", "Successfully logged in");
		expect(body.data).toHaveProperty("token");
		expect(body.data).toHaveProperty("id");

		token = body.data.token; // save token for auth
		expect(token).toBeDefined();
	});

	test("POST /category - success", async () => {
		const { body } = await request(app)
			.post("/category")
			.set("Authorization", "Bearer " + token)
			.send({ name: "Test Category" });

		expect(body).toHaveProperty("status", "success");
		expect(body.data).toHaveProperty("result");
		expect(body.data.result).toHaveProperty("id");
		expect(body.data.result.name).toBe("Test Category");

		categoryId = body.data.result.id;
	});

	test("POST /todos - success", async () => {
		const todoData = {
			name: "Test Todo",
			description: "This is a test todo",
			categoryId: categoryId
		};

		const { body } = await request(app)
			.post("/todos")
			.set("Authorization", "Bearer " + token)
			.send(todoData);

		expect(body).toHaveProperty("status", "success");
		expect(body.data).toHaveProperty("result");
		expect(body.data.result).toHaveProperty("id");
		expect(body.data.result.name).toBe(todoData.name);

		todoId = body.data.result.id;
	});

	test("GET /todos - success", async () => {
		const { body } = await request(app)
			.get("/todos")
			.set("Authorization", "Bearer " + token);

		expect(body).toHaveProperty("status", "success");
		expect(body.data.result.length).toBeGreaterThanOrEqual(1);

		const todo = body.data.result.find(t => t.id === todoId);
		expect(todo).toBeDefined();
		expect(todo.name).toBe("Test Todo");
		expect(todo.CategoryId).toBe(categoryId);
	});

    test("DELETE /todos/:id - success", async () => {
        const { body } = await request(app).delete("/todos/" + todoId).set("Authorization", "Bearer " + token);

        expect(body).toHaveProperty("status", "success");
        expect(body).toHaveProperty("data");
        expect(body.data).toHaveProperty("result");
        expect(body.data.result).toBe("Todo deleted");
    })

    test("GET /todos without JWT token - fail", async () => {
		const { body } = await request(app)
			.get("/todos")

		expect(body).toHaveProperty("status", "fail");
        expect(body.data).toHaveProperty("error", "Token missing");
        expect(body.data).toHaveProperty("statusCode", 401)
	});

    test("GET /todos with invalid JWT token - fail", async () => {
    const { body } = await request(app)
        .get("/todos")
        .set("Authorization", "Bearer " + "invalidtoken");
        
    expect(body).toHaveProperty("status", "fail");
    expect(body.data).toHaveProperty("error", "Invalid token");
    expect(body.data).toHaveProperty("statusCode", 401)
	});
});

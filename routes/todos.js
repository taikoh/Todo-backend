var express = require('express');
const jsend = require("jsend");
var router = express.Router();
const db = require("../models");
const isAuth = require('../middleware/middleware');
const TodoService = require("../services/TodoService");
const StatusService = require("../services/StatusService");
const todoService = new TodoService(db);
const statusService = new StatusService(db);

router.use(jsend.middleware)
/* Return all the logged in users todo's with the category associated with each todo and
status that is not the deleted status */
router.get('/', isAuth, async (req, res) => {

    // #swagger.tags = ["Todos"]
    /* #swagger.description = "Gets the list of all todo's with categories associated with each todo and
	status that is not the deleted status." */
	try {
		const userId = req.user.id;

		if (!userId) {
			return res.status(400).jsend.fail({
				statusCode: 400,
				result: "User ID missing from token"
			})
		}

		const todos = await todoService.getActiveTodos(userId);

		return res.status(200).jsend.success({ statusCode: 200, result: todos });
	} catch (err) {
		return res.status(500).jsend.error({ statusCode: 500, result: "Failed to return todo's." });
	}
});

// Return all the users todos including todos with a deleted status
router.get('/all', isAuth, async(req, res) => {
	// #swagger.tags = ["Todos"]
    // #swagger.description = "Gets the list of all todos."
	try {
		const userId = req.user.id;

		if (!userId) {
			return res.status(400).jsend.fail({
				statusCode: 400,
				result: "User ID missing from token"
			})
		}

		const todos = await todoService.getAllTodos(userId)

		return res.status(200).jsend.success({ statusCode: 200, result: todos });
	} catch (err) {
		return res.status(500).jsend.error({ statusCode: 500, result: "Failed to return todo's." });
	}
});

// Return all the todos with the deleted status
router.get('/deleted', isAuth, async (req, res) => {
	// #swagger.tags = ["Todos"]
    // #swagger.description = "Gets the list of all todos with the deleted status."
	try {
		const userId = req.user.id;

		if (!userId) {
			return res.status(400).jsend.fail({
				statusCode: 400,
				result: "User ID missing from token"
			})
		}

		const todos = await todoService.getDeletedTodos(userId)

		return res.status(200).jsend.success({ statusCode: 200, result: todos });
	} catch (err) {
		return res.status(500).jsend.error({ statusCode: 500, result: "Failed to return deleted todo's." });
	}
});

// Add a new todo with their category for the logged in user
router.post('/', isAuth, async (req, res) => {
    /* #swagger.tags = ['Todos'] */
    /* #swagger.description = 'Create a new Todo' */
    /* #swagger.parameters['body'] = {
		in: 'body',
		description: 'Todo information',
		required: true,
		schema: { $ref: '#/definitions/Todo' }
    } */

	try {
		const { name, description, categoryId } = req.body;
		const userId = req.user.id;

		if (!userId) {
			return res.status(400).jsend.fail({
				statusCode: 400,
				result: "User ID missing from token"
			})
		}

		const todo = await todoService.createTodo(
			name, description, categoryId, userId
		);

		return res.status(201).jsend.success({ statusCode: 201, result: todo });
	} catch (err) {
		return res.status(500).jsend.error({ statusCode: 500, result: "Failed to create todo." });
	}
});

// Return all the statuses from the database
router.get('/statuses', isAuth, async (req, res) => {
    // #swagger.tags = ["Statuses"]
    // #swagger.description = "Gets all statuses from the database"
	try {
		const statuses = await statusService.getAllStatuses();

		return res.status(200).jsend.success({ statusCode: 200, result: statuses});
	} catch (err) {
		return res.status(500).jsend.error({ statusCode: 500, result: "Failed to return statuses." });
	}
});

// Change/update a specific todo for logged in user
router.put('/:id', isAuth, async (req, res) => {
    // #swagger.tags = ["Todos"]
    // #swagger.description = "Update a specific todo for the logged in user"
	try {
		const { id } = req.params;
		const { name, description, categoryId, statusId } = req.body;
		const userId = req.user.id;

		if (!userId) {
			return res.status(400).jsend.fail({
				statusCode: 400,
				result: "User ID missing from token"
			})
		}

		const todo = await todoService.updateTodo(
			id, name, description, categoryId, statusId, userId
		);

		return res.status(200).jsend.success({ statusCode: 200, result: todo });
	} catch (err) {
		return res.status(500).jsend.error({ statusCode: 500, result: "Failed to update todo." });
	}
});

// Delete a specific todo if for the logged in user
router.delete('/:id', isAuth, async (req, res) => {
    // #swagger.tags = ["Todos"]
    // #swagger.description = "Deletes a todo of ID provided in the path"
	try {
		const { id } = req.params;
		const userId = req.user.id;

		if (!userId) {
			return res.status(400).jsend.fail({
				statusCode: 400,
				result: "User ID missing from token"
			})
		}

		const todo = await todoService.deleteTodo(
			id, userId
		);

		return res.status(200).jsend.success({ statusCode: 200, result: todo });
	} catch (err) {
		return res.status(500).jsend.error({ statusCode: 500, result: "Failed to delete todo." });
	}
});

module.exports = router;


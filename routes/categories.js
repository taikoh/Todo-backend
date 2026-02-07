var express = require('express');
var router = express.Router();
const isAuth = require('../middleware/middleware');
const db = require("../models");
const CategoryService = require("../services/CategoryService");
const categoryService = new CategoryService(db);

/* Return all the logged in users categories */
router.get('/', isAuth, async (req, res) => {
	// #swagger.tags = ["Categories"]
    // #swagger.description = "Gets the list of the logged in users categories."
	try {
		const userId = req.user.id;

		if (!userId) {
			return res.status(400).jsend.fail({
				statusCode: 400,
				result: "User ID missing from token"
			})
		}

		const categories = await categoryService.getAllCategories(userId);

		return res.status(200).jsend.success({ statusCode: 200, result: categories });
	} catch (err) {
		return res.status(500).jsend.error({ statusCode: 500, result: "Failed to get categories" });
	}
});

// Add a new category for the logged in user
router.post('/', isAuth, async (req, res) => {
    /* #swagger.tags = ['Categories'] */
    /* #swagger.description = 'Create a new Category' */
    /* #swagger.parameters['body'] = {
		in: 'body',
		description: 'Category information',
		required: true,
		schema: { $ref: '#/definitions/Category' }
    } */
	try {
		const { name } = req.body;
		const userId = req.user.id;

		if (!userId) {
			return res.status(400).jsend.fail({
				statusCode: 400,
				result: "User ID missing from token"
			})
		}

		const category = await categoryService.createCategory(
			name,
			userId
		);

		return res.status(201).jsend.success({ statusCode: 201, result: category });
	} catch (err) {
		return res.status(500).jsend.error({ statusCode: 500, result: "Failed to create category" });
	}
});

// Change/update a specific category for logged in user
router.put('/:id', isAuth, async (req, res) => {
    // #swagger.tags = ["Categories"]
    // #swagger.description = "Update a specific category for the logged in user"
	try {
		const { id } = req.params;
		const { name } = req.body;
		const userId = req.user.id;

		if (!userId) {
			return res.status(400).jsend.fail({
				statusCode: 400,
				result: "User ID missing from token"
			})
		}

		const category = await categoryService.updateCategory(
			id, name, userId
		);

		return res.status(200).jsend.success({ statusCode: 200, result: category });
	} catch (err) {
		return res.status(500).jsend.error({ statusCode: 500, result: "Failed to update category." });
	}
});

// Delete a specific category if it is not assigned to a todo for the logged in user
router.delete('/:id', isAuth, async (req, res) => {
    // #swagger.tags = ["Categories"]
    // #swagger.description = "Deletes a category of ID provided in the path"
	try {
		const { id } = req.params;
		const userId = req.user.id;

		if (!userId) {
			return res.status(400).jsend.fail({
				statusCode: 400,
				result: "User ID missing from token"
			})
		}

		const category = await categoryService.deleteCategory(
			id,
			userId
		);

		return res.status(200).jsend.success({ statusCode: 200, result: category });
	} catch (err) {
		return res.status(500).jsend.error({ statusCode: 500, result: "Failed to delete category." });
	}
});

module.exports = router;

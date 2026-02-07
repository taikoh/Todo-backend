const { Op } = require("sequelize");

class TodoService {
    constructor(db) {
        this.client = db.sequelize;
        this.Todos = db.Todo;
    }

    async getActiveTodos(userId) {
        return await this.Todos.findAll({
            where: {
                    UserId: userId,
                    StatusId: { [Op.ne]: 4 }
            },
            include: [
                this.client.models.Category, 
                this.client.models.Status
            ]
        });
    };

    async getAllTodos(userId) {
        return await this.Todos.findAll({
            where: {
                UserId: userId
            }
        });
    };

    async getDeletedTodos(userId) {
        return await this.Todos.findAll({
            where: {
                UserId: userId,
                StatusId: 4
            }
        });
    };

    async createTodo(name, description, categoryId, userId) {
        if (!name) { throw new Error("Name is required") };
        if (!description) { throw new Error("Description is required") };
        if (!categoryId) { throw new Error("Category is required") };

        try {
            return await this.Todos.create({
                name,
                description,
                CategoryId: categoryId,
                StatusId: 1,
                UserId: userId
            })
        } catch (err) {
            throw new Error("Failed to create todo: " + err.message)
        }
    }

    async updateTodo(id, name, description, categoryId, statusId, userId) {
        const [updatedTodo] = await this.Todos.update(
        {
            name,
            description,
            CategoryId: categoryId,
            StatusId: statusId
        },
        { where: { id, UserId: userId } }
    );

    if (updatedTodo === 0) {
        throw new Error("Todo not found or user is not authorized");
    }

    return await this.Todos.findOne({ where: { id, UserId: userId } });
    
    }

    async deleteTodo(id, userId) {
        const deleted = await this.Todos.update(
            { StatusId: 4 },
            { where: { id, UserId: userId } }
        );

        if (deleted[0] === 0) {
            throw new Error("Todo not found or not authorized");
        }

        return "Todo deleted";
    }

}

module.exports = TodoService;
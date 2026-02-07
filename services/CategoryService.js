class CategoryService {
    constructor(db) {
        this.client = db.sequelize;
        this.Categories = db.Category
    }

    async getAllCategories(userId) {
        return await this.Categories.findAll({
            where: {
                    UserId: userId
            }
        });
    }

    async createCategory(name, userId) {
        if (!name) { throw new Error("Name is required") };

        try {
            return await this.Categories.create({
                name,
                UserId: userId
            })
        } catch (err) {
            throw new Error("Failed to create category: " + err.message)
        }
    }

    async updateCategory(id, name, userId) {
        if (!name) {
            throw new Error("Name is required");
        }

        const [updatedCategory] = await this.Categories.update(
        {
            name
        },
        { where: { id, UserId: userId } }
    );

    if (updatedCategory === 0) {
        throw new Error("Category not found or user is not authorized");
    }

    return await this.Categories.findOne({ where: { id, UserId: userId } });
    
    }

    async deleteCategory(id, userId) {
        if (!id) {
            throw new Error("ID is required");
        }

        const todoCount = await this.models.Todo.count({ 
            where: { 
                CategoryId: id,
                UserId: userId
            } 
        });

        if (todoCount > 0) {
            throw new Error("Cannot delete category with todos assigned to it")
        }

        const deleted = await this.Categories.destroy({ 
            where: { 
                id,
                UserId: userId 
            } 
        });
        
        if (!deleted) {
            throw new Error("Category not found");
        }

        return "Category deleted"
    }  
}

module.exports = CategoryService;
class StatusService {
    constructor(db) {
        this.client = db.sequelize;
        this.Statuses = db.Status;
    }

    async getAllStatuses(userId) {
        return await this.Statuses.findAll({
            order: [["id", "ASC"]]
        });
    }
}

module.exports = StatusService;
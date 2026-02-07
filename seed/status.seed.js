module.exports = async (db) => {
	const statuses = [
		{ id: 1, status: "Not Started" },
		{ id: 2, status: "Started" },
		{ id: 3, status: "Completed" },
		{ id: 4, status: "Deleted" },
	];

	for (const s of statuses) {
		await db.Status.findOrCreate({
			where: { id: s.id },
			defaults: s,
		});
	}
};

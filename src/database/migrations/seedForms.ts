import {
	createTable,
	schemaMigrations,
} from "@nozbe/watermelondb/Schema/migrations";

export default schemaMigrations({
	migrations: [
		// {
		// 	toVersion: 2,
		// 	steps: [
		// 		createTable({
		// 			name: "forms",
		// 			columns: [
		// 				{ name: "name", type: "string" },
		// 				{ name: "type", type: "string" },
		// 				{ name: "created_at", type: "number" },
		// 				{ name: "updated_at", type: "number" },
		// 			],
		// 		}),
		// 	],
		// },
	],
});

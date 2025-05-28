import { appSchema, Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";
import { Task, tasksSchema } from "~/database/schemas/Task";
import {
	formsSchema,
	draftedFormsSchema,
	submittedFormsSchema,
} from "./schemas/forms";
import { Form, DraftedForm, SubmittedForm } from "./models/forms";
import seedForms from "./migrations/seedForms";

const schema = appSchema({
	version: 1,
	tables: [tasksSchema, formsSchema, draftedFormsSchema, submittedFormsSchema],
});

const adapter = new SQLiteAdapter({
	schema,
	// Optional database name
	dbName: "formsDB",
	// Optional migrations
	migrations: seedForms,
	// Optional logging
	onSetUpError: (error) => {
		console.error("Failed to set up the database:", error);
	},
});

export const database = new Database({
	adapter,
	modelClasses: [Task, Form, DraftedForm, SubmittedForm],
});

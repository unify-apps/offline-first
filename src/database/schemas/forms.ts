import { tableSchema } from "@nozbe/watermelondb";

export const formsSchema = tableSchema({
	name: "forms",
	columns: [
		{ name: "name", type: "string" },
		{ name: "type", type: "string" },
		{ name: "fields", type: "string" },
		{ name: "created_at", type: "number" },
		{ name: "updated_at", type: "number" },
	],
});

export const draftedFormsSchema = tableSchema({
	name: "drafted_forms",
	columns: [
		{ name: "form_id", type: "string" },
		{ name: "form_type", type: "string" },
		{ name: "form_data", type: "string" },
		{ name: "last_modified", type: "number" },
		{ name: "created_at", type: "number" },
		{ name: "updated_at", type: "number" },
	],
});

export const submittedFormsSchema = tableSchema({
	name: "submitted_forms",
	columns: [
		{ name: "form_id", type: "string" },
		{ name: "form_type", type: "string" },
		{ name: "form_data", type: "string" },
		{ name: "submitted_at", type: "number" },
		{ name: "created_at", type: "number" },
		{ name: "updated_at", type: "number" },
	],
});

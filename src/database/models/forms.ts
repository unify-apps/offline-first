import { Model } from "@nozbe/watermelondb";
import { date, json, text } from "@nozbe/watermelondb/decorators";

export interface FormField {
	id: string;
	label: string;
	type: "text" | "number";
}

export class Form extends Model {
	static table = "forms";

	@text("name") name!: string;
	@text("type") type!: string;
	@json("fields", (json) => json || []) fields!: FormField[];
	@date("created_at") createdAt!: Date;
	@date("updated_at") updatedAt!: Date;
}

export class DraftedForm extends Model {
	static table = "drafted_forms";

	@text("form_id") formId!: string;
	@text("form_type") formType!: string;
	@json("form_data", (json) => json || {}) formData!: Record<string, unknown>;
	@date("last_modified") lastModified!: Date;
	@date("created_at") createdAt!: Date;
	@date("updated_at") updatedAt!: Date;
}

export class SubmittedForm extends Model {
	static table = "submitted_forms";

	@text("form_id") formId!: string;
	@text("form_type") formType!: string;
	@json("form_data", (json) => json || {}) formData!: Record<string, unknown>;
	@date("submitted_at") submittedAt!: Date;
	@date("created_at") createdAt!: Date;
	@date("updated_at") updatedAt!: Date;
}

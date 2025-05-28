import { database } from "../database";
import type {
	DraftedForm,
	Form,
	SubmittedForm,
} from "../database/models/forms";
import { Q } from "@nozbe/watermelondb";

export const formsService = {
	async getAvailableForms() {
		return await database.get<Form>("forms").query().fetch();
	},

	async getDraftedForms() {
		return await database.get<DraftedForm>("drafted_forms").query().fetch();
	},

	async getSubmittedForms() {
		return await database.get<SubmittedForm>("submitted_forms").query().fetch();
	},

	async getFormById(id: string, type: "form" | "draft" | "submitted") {
		switch (type) {
			case "form":
				return await database.get<Form>("forms").find(id);
			case "draft":
				return await database.get<DraftedForm>("drafted_forms").find(id);
			case "submitted":
				return await database.get<SubmittedForm>("submitted_forms").find(id);
		}
	},

	async saveDraft(
		formId: string,
		formType: string,
		formData: Record<string, string>,
	) {
		const form = await this.getFormById(formId, "form");
		if (!form) return;

		await database.write(async () => {
			await database
				.get<DraftedForm>("drafted_forms")
				.create((draft: DraftedForm) => {
					draft.formId = formId;
					draft.formType = formType;
					draft.formData = formData;
				});
		});
	},

	async deleteDraft(id: string) {
		await database.write(async () => {
			const draftForm = await database
				.get<DraftedForm>("drafted_forms")
				.find(id);
			if (draftForm) {
				draftForm.markAsDeleted();
			}
		});
	},

	async submitForm(
		formId: string,
		formType: string,
		formData: Record<string, string>,
	) {
		const form = await this.getFormById(formId, "form");
		if (!form) return;

		await database.write(async () => {
			await database
				.get<SubmittedForm>("submitted_forms")
				.create((submitted: SubmittedForm) => {
					submitted.formId = formId;
					submitted.formType = formType;
					submitted.formData = formData;
					submitted.submittedAt = new Date();
				});
		});
	},
};

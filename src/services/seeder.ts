import { database } from "../database";
import type { Form, FormField } from "../database/models/forms";

const INITIAL_FORMS = [
	{
		name: "Baggage Checklist",
		type: "baggage",
		fields: [
			{ id: "1", label: "Total Baggage Count", type: "number" },
			{ id: "2", label: "Special Handling Items", type: "text" },
			{ id: "3", label: "Baggage Weight", type: "number" },
			{ id: "4", label: "Baggage Dimensions", type: "text" },
			{ id: "5", label: "Baggage Tags", type: "text" },
		] as FormField[],
	},
	{
		name: "Food Checklist",
		type: "food",
		fields: [
			{ id: "1", label: "Meal Count", type: "number" },
			{ id: "2", label: "Special Meals", type: "text" },
			{ id: "3", label: "Beverage Count", type: "number" },
			{ id: "4", label: "Snack Count", type: "number" },
			{ id: "5", label: "Special Dietary Requirements", type: "text" },
		] as FormField[],
	},
	{
		name: "Fuel Checklist",
		type: "fuel",
		fields: [
			{ id: "1", label: "Fuel Quantity", type: "number" },
			{ id: "2", label: "Fuel Type", type: "text" },
			{ id: "3", label: "Refueling Time", type: "text" },
			{ id: "4", label: "Fuel Pressure", type: "number" },
			{ id: "5", label: "Fuel Temperature", type: "number" },
		] as FormField[],
	},
	{
		name: "Passenger Service Checklist",
		type: "passenger",
		fields: [
			{ id: "1", label: "Total Passengers", type: "number" },
			{ id: "2", label: "Special Assistance Required", type: "text" },
			{ id: "3", label: "Infant Count", type: "number" },
			{ id: "4", label: "Wheelchair Required", type: "text" },
			{ id: "5", label: "Medical Equipment", type: "text" },
		] as FormField[],
	},
];

export const seederService = {
	async seedForms() {
		const formsCollection = database.get<Form>("forms");
		const existingForms = await formsCollection.query().fetch();

		if (existingForms.length === 0) {
			await database.write(async () => {
				for (const form of INITIAL_FORMS) {
					await formsCollection.create((newForm) => {
						newForm.name = form.name;
						newForm.type = form.type;
						newForm.fields = form.fields;
					});
				}
			});
			console.log("Forms seeded successfully");
		} else {
			console.log("Forms already exist, skipping seed");
		}
	},
};

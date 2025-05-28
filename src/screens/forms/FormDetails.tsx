import { useState, useEffect } from "react";
import {
	View,
	Text,
	ScrollView,
	TouchableOpacity,
	TextInput,
} from "react-native";
import {
	useRoute,
	useNavigation,
	type RouteProp,
} from "@react-navigation/native";
import type { RootStackParamList } from "../../navigation";
import { formsService } from "../../services/forms";
import type {
	DraftedForm,
	Form,
	SubmittedForm,
} from "../../database/models/forms";

type FormDetailsRouteProp = RouteProp<RootStackParamList, "FormDetails">;

export default function FormDetails() {
	const route = useRoute<FormDetailsRouteProp>();
	const navigation = useNavigation();
	const { type, id } = route.params;

	const [formData, setFormData] = useState<Record<string, string>>({});
	const [formDefinition, setFormDefinition] = useState<Form | null>(null);

	useEffect(() => {
		const loadFormData = async () => {
			let formDefinition: Form | null = null;
			let formData: Record<string, string> = {};

			switch (type) {
				case "New": {
					formDefinition = (await formsService.getFormById(id, "form")) as Form;
					break;
				}
				case "Draft": {
					const draftRecord = (await formsService.getFormById(
						id,
						"draft",
					)) as DraftedForm;
					formDefinition = (await formsService.getFormById(
						draftRecord.formId,
						"form",
					)) as Form;
					formData = draftRecord.formData as Record<string, string>;
					break;
				}
				case "Submitted": {
					const submittedRecord = (await formsService.getFormById(
						id,
						"submitted",
					)) as SubmittedForm;
					formDefinition = (await formsService.getFormById(
						submittedRecord.formId,
						"form",
					)) as Form;
					formData = submittedRecord.formData as Record<string, string>;
					break;
				}
			}

			if (formDefinition) {
				navigation.setOptions({ title: formDefinition.name });
			}
			setFormDefinition(formDefinition);
			setFormData(formData);
		};

		loadFormData();
	}, [type, id, navigation]);

	const handleSaveDraft = async () => {
		await formsService.saveDraft(id, "form", formData);
		navigation.goBack();
	};

	const handleSubmit = async () => {
		if (type === "Draft") {
			await formsService.deleteDraft(id);
		}
		await formsService.submitForm(
			formDefinition?.id || "",
			formDefinition?.type || "",
			formData,
		);
		navigation.goBack();
	};

	const handleFieldChange = (fieldId: string, value: string) => {
		setFormData((prev) => ({
			...prev,
			[fieldId]: value,
		}));
	};

	const renderFormFields = () => {
		return formDefinition?.fields.map((field) => (
			<View key={field.id} className="bg-white p-4 rounded-lg mb-3 shadow-sm">
				<Text className="text-base font-medium text-gray-800 mb-2">
					{field.label}
				</Text>
				{type === "Submitted" ? (
					<Text className="text-sm text-gray-600">
						{formData[field.id] || "N/A"}
					</Text>
				) : (
					<TextInput
						className="text-lg text-gray-800 border border-gray-300 rounded p-2"
						value={formData[field.id] || ""}
						onChangeText={(value) => handleFieldChange(field.id, value)}
						keyboardType={field.type === "number" ? "numeric" : "default"}
						editable={type === "New" || type === "Draft"}
					/>
				)}
			</View>
		));
	};

	return (
		<View className="flex-1 bg-gray-100">
			<ScrollView className="flex-1 p-4">{renderFormFields()}</ScrollView>

			{type === "New" || type === "Draft" ? (
				<View className="flex-row px-4 pt-4 pb-safe-or-4 bg-white border-t border-gray-200">
					<TouchableOpacity
						className="flex-1 p-4 rounded-lg mx-2 items-center bg-gray-100"
						onPress={handleSaveDraft}
					>
						<Text className="text-base font-medium text-gray-800">
							Save as Draft
						</Text>
					</TouchableOpacity>

					<TouchableOpacity
						className="flex-1 p-4 rounded-lg mx-2 items-center bg-blue-500"
						onPress={handleSubmit}
					>
						<Text className="text-base font-medium text-white">Submit</Text>
					</TouchableOpacity>
				</View>
			) : null}
		</View>
	);
}

import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../navigation";
import { formsService } from "../../services/forms";
import type { Form } from "../../database/models/forms";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function FormsList() {
	const navigation = useNavigation<NavigationProp>();
	const [forms, setForms] = useState<Form[]>([]);

	useEffect(() => {
		const loadForms = async () => {
			const availableForms = await formsService.getAvailableForms();
			setForms(availableForms);
		};

		loadForms();
	}, []);

	const handleFormPress = (form: Form) => {
		navigation.navigate("FormDetails", {
			type: "New",
			id: form.id,
		});
	};

	const renderItem = ({ item }: { item: Form }) => (
		<TouchableOpacity
			className="bg-white p-4 rounded-lg mb-3 shadow-sm"
			onPress={() => handleFormPress(item)}
		>
			<Text className="text-base font-medium text-gray-800">{item.name}</Text>
		</TouchableOpacity>
	);

	return (
		<View className="flex-1 bg-gray-100">
			<FlatList
				data={forms}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
				contentContainerStyle={{ padding: 16 }}
				ListEmptyComponent={
					<View className="flex-1 justify-center items-center p-5">
						<Text className="text-base text-gray-600">No forms available</Text>
					</View>
				}
			/>
		</View>
	);
}

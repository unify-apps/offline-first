import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../navigation";
import type { SubmittedForm } from "../../database/models/forms";
import { withObservables } from "@nozbe/watermelondb/react";
import { database } from "~/database";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

function SubmittedForms({ submitted }: { submitted: SubmittedForm[] }) {
	const navigation = useNavigation<NavigationProp>();

	const handleFormPress = (form: SubmittedForm) => {
		navigation.navigate("FormDetails", {
			type: "Submitted",
			id: form.id,
		});
	};

	const renderItem = ({ item }: { item: SubmittedForm }) => (
		<TouchableOpacity
			className="bg-white p-4 rounded-lg mb-3 shadow-sm"
			onPress={() => handleFormPress(item)}
		>
			<Text className="text-base font-medium text-gray-800 mb-1">
				{item.formType}
			</Text>
			<Text className="text-xs text-gray-600">
				Submitted: {item.submittedAt.toLocaleDateString()}
			</Text>
		</TouchableOpacity>
	);

	return (
		<View className="flex-1 bg-gray-100">
			<FlatList
				data={submitted}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
				contentContainerStyle={{ padding: 16 }}
				ListEmptyComponent={
					<View className="flex-1 justify-center items-center p-5">
						<Text className="text-base text-gray-600">No submitted forms</Text>
					</View>
				}
			/>
		</View>
	);
}

const enhance = withObservables([], () => ({
	submitted: database.get<SubmittedForm>("submitted_forms").query().observe(),
}));
export default enhance(SubmittedForms);

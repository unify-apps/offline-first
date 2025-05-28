import { withObservables } from "@nozbe/watermelondb/react";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { database } from "~/database";
import type { DraftedForm } from "../../database/models/forms";
import type { RootStackParamList } from "../../navigation";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

function DraftedForms({ drafts }: { drafts: DraftedForm[] }) {
	const navigation = useNavigation<NavigationProp>();

	const handleFormPress = (draft: DraftedForm) => {
		navigation.navigate("FormDetails", {
			type: "Draft",
			id: draft.id,
		});
	};

	const renderItem = ({ item }: { item: DraftedForm }) => (
		<TouchableOpacity
			className="bg-white p-4 rounded-lg mb-3 shadow-sm"
			onPress={() => handleFormPress(item)}
		>
			<Text className="text-base font-medium text-gray-800 mb-1">
				{item.formType}
			</Text>
			<Text className="text-xs text-gray-600">
				Last modified: {item.lastModified.toLocaleDateString()}
			</Text>
		</TouchableOpacity>
	);

	return (
		<View className="flex-1 bg-gray-100">
			<FlatList
				data={drafts}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
				contentContainerStyle={{ padding: 16 }}
				ListEmptyComponent={
					<View className="flex-1 justify-center items-center p-5">
						<Text className="text-base text-gray-600">No drafted forms</Text>
					</View>
				}
			/>
		</View>
	);
}

const enhance = withObservables([], () => ({
	drafts: database.get<DraftedForm>("drafted_forms").query().observe(),
}));
export default enhance(DraftedForms);

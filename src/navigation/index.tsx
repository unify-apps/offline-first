import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";

import FormsList from "../screens/forms/FormsList";
import DraftedForms from "../screens/forms/DraftedForms";
import SubmittedForms from "../screens/forms/SubmittedForms";
import FormDetails from "../screens/forms/FormDetails";

export type RootStackParamList = {
	MainTabs: undefined;
	FormDetails: {
		type: "New" | "Draft" | "Submitted";
		id: string;
	};
};

export type MainTabParamList = {
	FormsList: undefined;
	DraftedForms: undefined;
	SubmittedForms: undefined;
};

const TAB_ICONS: Record<
	keyof MainTabParamList,
	{ focused: string; unfocused: string }
> = {
	FormsList: {
		focused: "list",
		unfocused: "list-outline",
	},
	DraftedForms: {
		focused: "document-text",
		unfocused: "document-text-outline",
	},
	SubmittedForms: {
		focused: "checkmark-circle",
		unfocused: "checkmark-circle-outline",
	},
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

function MainTabs() {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
					const iconName =
						TAB_ICONS[route.name as keyof MainTabParamList][
							focused ? "focused" : "unfocused"
						];
					return (
						<Ionicons
							name={iconName as React.ComponentProps<typeof Ionicons>["name"]}
							size={size}
							color={color}
						/>
					);
				},
				tabBarActiveTintColor: "#007AFF",
				tabBarInactiveTintColor: "gray",
			})}
		>
			<Tab.Screen
				name="FormsList"
				component={FormsList}
				options={{ title: "Available Forms" }}
			/>
			<Tab.Screen
				name="DraftedForms"
				component={DraftedForms}
				options={{ title: "Drafts" }}
			/>
			<Tab.Screen
				name="SubmittedForms"
				component={SubmittedForms}
				options={{ title: "Submitted" }}
			/>
		</Tab.Navigator>
	);
}

export default function RootStack() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					name="MainTabs"
					component={MainTabs}
					options={{ headerShown: false }}
				/>
				<Stack.Screen name="FormDetails" component={FormDetails} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

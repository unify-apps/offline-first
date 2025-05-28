import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import "./global.css";

import "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

import RootStack from "./src/navigation";
import { seederService } from "./src/services/seeder";

export default function App() {
	useEffect(() => {
		seederService.seedForms();
	}, []);

	return (
		<SafeAreaProvider>
			<RootStack />
			<StatusBar style="auto" />
		</SafeAreaProvider>
	);
}

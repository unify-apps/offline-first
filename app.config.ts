require('ts-node/register');
import type { ExpoConfig } from "@expo/config-types";

const getAppConfig = (): ExpoConfig => {
	return {
		name: "offline-first",
		slug: "offline-first",
		version: "1.0.0",
		web: {
			favicon: "./assets/favicon.png",
		},
		experiments: {
			tsconfigPaths: true,
		},
		plugins: [
			"./src/plugins/withWatermelonDB",
		],
		orientation: "portrait",
		icon: "./assets/icon.png",
		userInterfaceStyle: "light",
		splash: {
			image: "./assets/splash.png",
			resizeMode: "contain",
			backgroundColor: "#ffffff",
		},
		assetBundlePatterns: ["**/*"],
		ios: {
			supportsTablet: true,
			bundleIdentifier: "com.pradeet.offlinefirst",
		},
		android: {
			adaptiveIcon: {
				foregroundImage: "./assets/adaptive-icon.png",
				backgroundColor: "#ffffff",
			},
			package: "com.pradeet.offlinefirst",
		},
		extra: {
			eas: {
				projectId: "87f5f659-3a58-4c5f-9376-3cf70a7a8e04",
			},
		},
	};
};

export default getAppConfig;

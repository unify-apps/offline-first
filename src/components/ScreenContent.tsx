import { Text, View } from "react-native";

type ScreenContentProps = {
	title: string;
	path: string;
	children?: React.ReactNode;
};

export const ScreenContent = ({
	title,
	path,
	children,
}: ScreenContentProps) => {
	return (
		<View className={styles.container}>
			<Text className={styles.title}>{title}</Text>
			<View className={styles.separator} />
			<View>
				<View className={styles.getStartedContainer}>
					<Text className={styles.getStartedText}>
						Open up the code for this screen:
					</Text>
					<View
						className={
							styles.codeHighlightContainer + styles.homeScreenFilename
						}
					>
						<Text>{path}</Text>
					</View>
					<Text className={styles.getStartedText}>
						Change any of the text, save the file, and your app will
						automatically update.
					</Text>
				</View>
			</View>
			{children}
		</View>
	);
};
const styles = {
	container: "items-center flex-1 justify-center",
	separator: "h-[1px] my-7 w-4/5 bg-gray-200",
	title: "text-xl font-bold",
	codeHighlightContainer: "rounded-md px-1",
	getStartedContainer: "items-center mx-12",
	getStartedText: "text-lg leading-6 text-center",
	helpContainer: "items-center mx-5 mt-4",
	helpLink: "py-4",
	helpLinkText: "text-center",
	homeScreenFilename: "my-2",
};

import type { RouteProp } from '@react-navigation/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect } from 'react';
import type { StackNavigationProp } from '@react-navigation/stack';
import { ScreenContent } from '~/components/ScreenContent';

import { StyleSheet, View } from 'react-native';

import type { RootStackParamList } from '~/navigation';
import { BackButton } from '~/components/BackButton';

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;
type DetailsScreenNavigationProps = StackNavigationProp<RootStackParamList, 'Tasks'>;

export default function Details() {
  const router = useRoute<DetailsScreenRouteProp>();
  const navigation = useNavigation<DetailsScreenNavigationProps>();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButton onPress={navigation.goBack} />,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ScreenContent
        path="screens/details.tsx"
        title={`Showing details for user ${router.params.name}`}
      />
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});

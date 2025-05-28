import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { ScreenContent } from '~/components/ScreenContent';

import { StyleSheet, View } from 'react-native';

import { Button } from '../components/Button';
import type { RootStackParamList } from '../navigation';
import TaskList from '~/components/TaskList';
import { useEffect } from 'react';
import { syncDatabase } from '~/database/sync';
import { database } from '~/database';

type TasksScreenNavigationProps = StackNavigationProp<RootStackParamList, 'Tasks'>;

export default function Tasks() {
  const navigation = useNavigation<TasksScreenNavigationProps>();

  useEffect(() => {
    syncDatabase(database);
  }, []);

  return <TaskList />;

  return (
    <View style={styles.container} className="pb-safe">
      <ScreenContent path="screens/overview.tsx" title="Overview" />
      <Button
        onPress={() =>
          navigation.navigate('Details', {
            name: 'Dan',
          })
        }
        title="Show Details"
      />
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

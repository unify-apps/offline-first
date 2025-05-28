import { withObservables } from '@nozbe/watermelondb/react';
import { useState } from 'react';
import { FlatList, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { database } from '~/database';
import type { Task } from '~/database/schemas/Task';

const TaskList = ({ tasks }: { tasks: Task[] }) => {
  const [newTaskText, setNewTaskText] = useState('');

  const createTask = async () => {
    if (!newTaskText.trim()) return;

    await database.write(async () => {
      await database.get<Task>('tasks').create((task) => {
        task.text = newTaskText;
        task.isCompleted = false;
      });
    });

    setNewTaskText('');
  };

  const toggleTask = async (task: Task) => {
    await database.write(async () => {
      await task.update((task) => {
        task.isCompleted = !task.isCompleted;
      });
    });
  };

  const deleteTask = async (task: Task) => {
    await database.write(async () => {
      await task.markAsDeleted();
    });
  };

  const renderItem = ({ item: task }: { item: Task }) => (
    <View className="flex-row items-center justify-between border-b border-gray-200 p-4">
      <View className="flex-1 flex-row items-center">
        <Switch value={task.isCompleted} onValueChange={() => toggleTask(task)} className="mr-2" />
        <Text className={`flex-1 ${task.isCompleted ? 'text-gray-500 line-through' : ''}`}>
          {task.text}
        </Text>
      </View>
      <TouchableOpacity onPress={() => deleteTask(task)} className="rounded bg-red-500 px-3 py-1">
        <Text className="text-white">Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="flex-1 p-4">
      <View className="mb-4 flex-row">
        <TextInput
          value={newTaskText}
          onChangeText={setNewTaskText}
          placeholder="Add a new task"
          className="flex-1 rounded-l border border-gray-300 px-4 py-2"
        />
        <TouchableOpacity onPress={createTask} className="rounded-r bg-blue-500 px-4 py-2">
          <Text className="text-white">Add</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(task) => task.id}
        className="flex-1"
      />
    </View>
  );
};

const enhance = withObservables([], () => ({
  tasks: database.get<Task>('tasks').query().observe(),
}));

export default enhance(TaskList);

import { appSchema, Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import { schemaMigrations } from '@nozbe/watermelondb/Schema/migrations';
import { Task, tasksSchema } from '~/database/schemas/Task';

const schema = appSchema({
  version: 1,
  tables: [tasksSchema],
});

const adapter = new SQLiteAdapter({
  schema,
  // Optional database name
  dbName: 'tasksDB',
  // Optional migrations
  migrations: schemaMigrations({
    migrations: [],
  }),
  // Optional logging
  onSetUpError: (error) => {
    console.error('Failed to set up the database:', error);
  },
});

export const database = new Database({
  adapter,
  modelClasses: [Task],
});

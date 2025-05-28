import { synchronize } from '@nozbe/watermelondb/sync';
import type { Database } from '@nozbe/watermelondb';

export async function syncDatabase(database: Database) {
  await synchronize({
    database,
    pullChanges: async ({ lastPulledAt }) => {
      return { changes: {}, timestamp: Date.now() };
      const response = await fetch(`http://localhost:3000/tasks?lastPulledAt=${lastPulledAt}`);
      const { tasks, timestamp } = await response.json();

      const changes = {
        tasks: tasks.map((task: any) => ({
          id: task._id,
          name: task.name,
          is_completed: task.is_completed,
          created_at: task.created_at,
          updated_at: task.updated_at,
        })),
      };

      return { changes, timestamp };
    },
    pushChanges: async ({ changes }) => {
      console.log('Push Changes', { changes });
      await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        body: JSON.stringify(changes.tasks),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    },
  });
}

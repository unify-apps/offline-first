import { Model, tableSchema } from '@nozbe/watermelondb';
import { field, date, text } from '@nozbe/watermelondb/decorators';

export const tasksSchema = tableSchema({
  name: 'tasks',
  columns: [
    { name: 'text', type: 'string' },
    { name: 'is_completed', type: 'boolean' },
    { name: 'created_at', type: 'number' },
    { name: 'updated_at', type: 'number' },
  ]
})

export class Task extends Model {
  static table = 'tasks'

  @text('text') text!: string
  @field('is_completed') isCompleted!: boolean
  @date('created_at') createdAt!: Date
  @date('updated_at') updatedAt!: Date
}

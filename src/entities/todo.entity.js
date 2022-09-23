const { ErrorHandler } = require('../middlewares/.error/error.handler');

export class TodoEntity {
  constructor({ id, todo, completed, created_at, updated_at }) {
    this.todo_id = id;
    this.todo = todo;
    this.completed = completed;
    this.created_at = created_at;
    this.completed_at = updated_at ?? null;
  }

  validate() {
    if (
      !this.todo_id ||
      isNaN(this.todo_id) ||
      this.todo_id < 1 ||
      !Number.isInteger(this.todo_id)
    )
      throw { name: 'ValidationError', message: 'invalid todo id' };

    if (!this.todo || this.todo.length < 8)
      throw { name: 'ValidationError', message: 'invalid todo text' };

    if (this.completed === null || this.completed === undefined)
      throw { name: 'ValidationError', message: 'invalid completed argument' };

    if (this.created_at === null || this.created_at === undefined)
      throw { name: 'ValidationError', message: 'invalid completed argument' };
  }
}

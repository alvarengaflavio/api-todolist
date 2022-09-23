class TodoEntity {
  constructor({ id, todo, completed, created_at, completed_at }) {
    this.todo_id = id ?? undefined;
    this.todo = todo;
    this.completed = completed;
    this.created_at = created_at;
    this.completed_at = completed_at ?? false;
  }

  validate() {
    if (!this.todo || this.todo.length < 8)
      throw { name: 'ValidationError', message: 'invalid todo text' };

    if (this.completed === null || this.completed === undefined)
      throw { name: 'ValidationError', message: 'invalid completed argument' };

    if (typeof this.completed !== 'boolean')
      throw { name: 'ValidationError', message: 'completed is not boolean' };

    if (this.created_at === null || this.created_at === undefined)
      throw { name: 'ValidationError', message: 'invalid created_at argument' };

    if (!TodoEntity.validateDate(this.created_at))
      throw {
        name: 'ValidationError',
        message: 'invalid created_at dateString format',
      };

    if (this.completed_at && !TodoEntity.validateDate(this.completed_at))
      throw {
        name: 'ValidationError',
        message: 'invalid completed_at dateString format',
      };
  }

  validateId() {
    if (!TodoEntity.validateTodoId(this.todo_id))
      throw { name: 'ValidationError', message: 'invalid todo id' };
  }

  static validateDate(date) {
    return /^([1-9]|([012][0-9])|(3[01]))\/([0]{0,1}[1-9]|1[012])\/\d\d\d\d\s([0-1]?[0-9]|2?[0-3]):([0-5]\d):([0-5]\d)$/.test(
      date,
    );
  }

  static validateTodoId(id) {
    if (id === undefined || id === null) return false;
    if (!id) return false;
    if (isNaN(id)) return false;
    if (!Number.isInteger(id)) return false;
    if (id < 1) return false;
    return true;
  }

  getTodo() {
    return {
      id: this.todo_id,
      todo: this.todo.substring(0, 60),
      completed: this.completed,
      created_at: this.created_at,
      completed_at: this.completed_at,
    };
  }
}

module.exports = { TodoEntity };

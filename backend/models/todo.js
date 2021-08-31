const todoSchema = {
    type: 'object',
    required: ['id', 'listId', 'task', 'complete'],
    properties: {
      id: {
        type: 'string',
        minLength: 1
      },
      listId: {
        type: 'string',
        minLength: 1
      },
      task: {
        type: 'string',
        minLength: 1
      },
      complete: {
        type: 'boolean'
      }
    }
  };
  
  module.exports = todoSchema;
  
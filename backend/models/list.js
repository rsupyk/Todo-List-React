const listSchema = {
  type: 'object',
  required: ['id', 'name', 'dateString'],
  properties: {
    id: {
      type: 'string',
      minLength: 1
    },
    name: {
      type: 'string',
      minLength: 1
    },
    dateString: {
      type: 'string'
    }
  }
};

module.exports = listSchema;

// Example usage of prettion
const prettion = require('../dist/index.js').default;

// Sample response object
const response = {
  status: 'success',
  code: 200,
  data: {
    users: [
      { id: 1, name: 'John Doe', email: 'john@example.com', active: true },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', active: false }
    ],
    pagination: {
      page: 1,
      perPage: 10,
      total: 2,
      totalPages: 1
    }
  },
  meta: {
    timestamp: new Date().toISOString(),
    requestId: 'abc123xyz789'
  }
};

console.log('Default output:');
console.log(prettion(response));

console.log('\nWith 4-space indentation:');
console.log(prettion(response, { indent: 4 }));

console.log('\nWith sorted keys:');
console.log(prettion(response, { sortKeys: true }));

console.log('\nWithout colors:');
console.log(prettion(response, { colors: false }));

// JSON string example
const jsonString = '{"name":"John","age":30,"skills":["JavaScript","TypeScript","Node.js"]}';
console.log('\nFrom JSON string:');
console.log(prettion(jsonString));

// Invalid JSON handling
console.log('\nInvalid JSON handling:');
console.log(prettion('This is not JSON')); 
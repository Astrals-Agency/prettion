// Example usage of prettion with ES Modules
import prettion from '../dist/index.mjs';

// Simple example
const data = {
  name: 'ES Module Example',
  features: ['TypeScript', 'ESM Support', 'Modern JavaScript'],
  nested: {
    value: 42,
    active: true,
    items: [1, 2, 3]
  }
};

console.log('Prettified output with colors:');
console.log(prettion(data));

console.log('\nWithout colors:');
console.log(prettion(data, { colors: false })); 
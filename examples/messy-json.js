// Testing prettion with messy, unformatted JSON
const prettion = require('../dist/index.js').default;

// Really messy JSON string with no formatting
const messyJson = '{"users":[{"id":1,"name":"John Doe","email":"john@example.com","roles":["admin","user"],"metadata":{"lastLogin":"2023-04-15T10:30:00Z","preferences":{"theme":"dark","notifications":true}}},{"id":2,"name":"Jane Smith","email":"jane@example.com","roles":["user"],"metadata":{"lastLogin":"2023-04-14T08:15:00Z","preferences":{"theme":"light","notifications":false}}}],"pagination":{"currentPage":1,"totalPages":5,"totalItems":42},"status":"success","timestamp":"2023-04-15T12:00:00Z"}';

// JSON with bad whitespace
const badWhitespaceJson = '{\n"name"  :  "Bad Whitespace",\n   "description":"This JSON has inconsistent spacing",\n"values":[1,   2,3,     4,5]}';

// JSON minified
const minifiedJson = '{"config":{"server":{"host":"localhost","port":3000,"timeout":30},"database":{"url":"mongodb://localhost:27017","name":"test_db","poolSize":10},"cache":{"enabled":true,"ttl":300},"logging":{"level":"info","outputs":["console","file"]}}}';

console.log('=== Messy JSON ===');
console.log(prettion(messyJson));

console.log('\n=== Bad Whitespace JSON ===');
console.log(prettion(badWhitespaceJson));

console.log('\n=== Minified JSON ===');
console.log(prettion(minifiedJson)); 
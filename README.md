# prettion

A simple utility to prettify JSON output for terminal debugging with color support.

## Requirements

- Node.js >= 18.0.0

## Installation

```bash
npm install @builtbyastrals/prettion
```

## Usage

```javascript
const prettion = require('@builtbyastrals/prettion').default;
// or using ES modules
// import prettion from '@builtbyastrals/prettion';

// Example usage with an API response object
const response = {
  status: 'success',
  data: {
    users: [
      { id: 1, name: 'John', active: true },
      { id: 2, name: 'Jane', active: false }
    ],
    totalCount: 2
  }
};

// Pretty print with default options (colored output with 2-space indentation)
console.log(prettion(response));

// Customize formatting
console.log(prettion(response, {
  indent: 4,        // Use 4 spaces for indentation
  colors: true,     // Enable colors (default)
  sortKeys: true    // Sort object keys alphabetically
}));

// Prettify a JSON string
const jsonString = '{"name":"John","age":30,"isActive":true}';
console.log(prettion(jsonString));
```

## Options

| Option    | Type    | Default | Description                         |
|-----------|---------|---------|-------------------------------------|
| indent    | number  | 2       | Number of spaces for indentation    |
| colors    | boolean | true    | Enable colored output               |
| sortKeys  | boolean | false   | Sort object keys alphabetically     |

## Features

- Pretty-prints JSON with proper indentation
- Syntax highlighting with colors for better readability
- Handles both JSON objects and strings
- Customizable indentation
- Option to sort object keys alphabetically
- Graceful handling of invalid inputs

## License

MIT 
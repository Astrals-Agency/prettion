import prettion, { PrettionOptions } from './index';
import chalk from 'chalk';

// Mock chalk to prevent color codes in test output
jest.mock('chalk', () => ({
  cyan: (text: string) => `CYAN:${text}`,
  green: (text: string) => `GREEN:${text}`,
  yellow: (text: string) => `YELLOW:${text}`,
  magenta: (text: string) => `MAGENTA:${text}`,
}));

describe('prettion', () => {
  it('should prettify a simple object', () => {
    const input = { name: 'John', age: 30, isActive: true };
    const result = prettion(input, { colors: false });
    expect(result).toBe(JSON.stringify(input, null, 2));
  });

  it('should handle string input', () => {
    const input = '{"name":"John","age":30,"isActive":true}';
    const result = prettion(input, { colors: false });
    const expected = JSON.stringify(JSON.parse(input), null, 2);
    expect(result).toBe(expected);
  });

  it('should handle invalid JSON string input', () => {
    const input = 'not a valid JSON';
    const result = prettion(input, { colors: false });
    expect(result).toBe(input);
  });

  it('should apply custom indentation', () => {
    const input = { name: 'John', age: 30 };
    const result = prettion(input, { indent: 4, colors: false });
    expect(result).toBe(JSON.stringify(input, null, 4));
  });

  it('should sort keys when sortKeys is true', () => {
    const input = { c: 3, a: 1, b: 2 };
    const result = prettion(input, { sortKeys: true, colors: false });
    
    // Create expected result with sorted keys
    const expected = JSON.stringify({ a: 1, b: 2, c: 3 }, null, 2);
    expect(result).toBe(expected);
  });

  it('should colorize output when colors is true', () => {
    const input = { name: 'John', age: 30, isActive: true };
    const result = prettion(input, { colors: true });
    
    // Check if color codes are present in the result
    expect(result).toContain('CYAN:"name"');
    expect(result).toContain('GREEN:"John"');
    expect(result).toContain('YELLOW:30');
    expect(result).toContain('MAGENTA:true');
  });

  it('should handle complex nested objects', () => {
    const input = {
      person: {
        name: 'John',
        address: {
          city: 'New York',
          zip: 10001
        }
      },
      tags: ['developer', 'javascript']
    };
    
    const result = prettion(input, { colors: false });
    expect(result).toBe(JSON.stringify(input, null, 2));
  });

  it('should handle null and undefined', () => {
    expect(prettion(null)).toBe('MAGENTA:null');
    expect(prettion(undefined)).toBe('undefined');
  });
}); 
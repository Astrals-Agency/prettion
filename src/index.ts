import chalk from 'chalk';

/**
 * Options for the prettion function
 */
export interface PrettionOptions {
  /**
   * Number of spaces for indentation (default: 2)
   */
  indent?: number;
  
  /**
   * Whether to colorize the output (default: true)
   */
  colors?: boolean;
  
  /**
   * Sort object keys alphabetically (default: false)
   */
  sortKeys?: boolean;
}

/**
 * Default options for prettion
 */
const defaultOptions: PrettionOptions = {
  indent: 2,
  colors: true,
  sortKeys: false,
};

/**
 * Prettifies a JSON object or string with color support
 * 
 * @param input - JSON object or string to prettify
 * @param options - Formatting options
 * @returns Prettified JSON string
 */
export function prettion(input: unknown, options: PrettionOptions = {}): string {
  // Merge options with defaults
  const opts = { ...defaultOptions, ...options };
  
  try {
    // Convert input to a string if it's not already
    let jsonString: string;
    
    if (typeof input === 'string') {
      try {
        // Try to parse and re-stringify to ensure proper JSON
        const parsed = JSON.parse(input);
        jsonString = JSON.stringify(
          parsed, 
          opts.sortKeys ? getSortingReplacer() as (key: string, value: any) => any : undefined, 
          opts.indent
        );
      } catch (e) {
        // If parsing fails, just use the string as-is
        jsonString = input;
      }
    } else {
      jsonString = JSON.stringify(
        input, 
        opts.sortKeys ? getSortingReplacer() as (key: string, value: any) => any : undefined, 
        opts.indent
      );
    }
    
    // Return plain string if colors are disabled
    if (!opts.colors) {
      return jsonString;
    }
    
    // Colorize the JSON
    return colorizeJson(jsonString);
  } catch (error) {
    // If any error occurs, return the input as a string
    return String(input);
  }
}

/**
 * Creates a replacer function for JSON.stringify that sorts keys alphabetically
 */
function getSortingReplacer() {
  return (key: string, value: any) => {
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      return Object.keys(value)
        .sort()
        .reduce((result: Record<string, any>, key) => {
          result[key] = value[key];
          return result;
        }, {});
    }
    return value;
  };
}

/**
 * Colorize JSON string
 */
function colorizeJson(jsonString: string): string {
  return jsonString
    .replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, 
      (match) => {
        // Strings
        if (/^"/.test(match)) {
          // Property names
          if (/:$/.test(match)) {
            return chalk.cyan(match);
          }
          // String values
          return chalk.green(match);
        }
        // Numbers
        if (/^-?\d+/.test(match)) {
          return chalk.yellow(match);
        }
        // Boolean or null
        return chalk.magenta(match);
      });
}

export default prettion; 
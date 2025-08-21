import { renderHook, waitFor } from '@testing-library/react';

import { LanguageName } from '../extensions/useLanguageExtension';

import { useCodeFormatter } from './useCodeFormatter';

// Mock only WASM formatters that don't work in Jest environment
// Prettier-based formatters (JS/TS/JSON/CSS/HTML) work fine with real modules
jest.mock('../useLazyModules', () => {
  const actualUseLazyModules = jest.requireActual('../useLazyModules');

  return {
    useLazyModules: (moduleLoaders: any) => {
      const { modules } = actualUseLazyModules.useLazyModules(moduleLoaders);

      // Only mock WASM modules that fail to load in Jest
      if (moduleLoaders && moduleLoaders['@wasm-fmt/clang-format']) {
        modules['@wasm-fmt/clang-format'] = {
          format: (code: string) => {
            // Mock Java formatting
            if (code.includes('public class Test')) {
              return 'public class Test {\n  public static void main(String[] args) {\n    System.out.println("Hello");\n  }\n}\n';
            }

            // Mock C++ formatting
            if (code.includes('#include<iostream>')) {
              return '#include <iostream>\nint main() {\n  std::cout << "Hello" << std::endl;\n  return 0;\n}\n';
            }

            // Mock C# formatting
            if (code.includes('class Program')) {
              return 'using System;\nclass Program\n{\n    static void Main()\n    {\n        Console.WriteLine("Hello");\n    }\n}\n';
            }

            return code;
          },
          default: async function () {
            return this;
          },
        };
      }

      if (moduleLoaders && moduleLoaders['@wasm-fmt/gofmt']) {
        modules['@wasm-fmt/gofmt'] = {
          format: (code: string) => {
            if (code.includes('package main')) {
              return 'package main\n\nimport "fmt"\n\nfunc main() {\n\tfmt.Println("Hello")\n}\n';
            }

            return code;
          },
          default: async function () {
            return this;
          },
        };
      }

      if (moduleLoaders && moduleLoaders['@wasm-fmt/ruff_fmt']) {
        modules['@wasm-fmt/ruff_fmt'] = {
          format: (code: string) => {
            if (code.includes('def greet(name):')) {
              return 'def greet(name):\n    print(f"Hello, {name}!")\n\n\ngreet("World")\n';
            }

            return code;
          },
          default: async function () {
            return this;
          },
        };
      }

      return { modules };
    },
  };
});

// Test data: unformatted input -> expected formatted output
const formattingTestCases = {
  [LanguageName.javascript]: {
    unformatted: `function greet(name){console.log(\`Hello, \${name}!\`);}greet("World");`,
    formatted: `function greet(name) {\n  console.log(\`Hello, \${name}!\`);\n}\ngreet('World');\n`,
  },
  [LanguageName.jsx]: {
    unformatted: `const App=()=><div><h1>Hello</h1><p>World</p></div>;`,
    formatted: `const App = () => (\n  <div>\n    <h1>Hello</h1>\n    <p>World</p>\n  </div>\n);\n`,
  },
  [LanguageName.typescript]: {
    unformatted: `function greet(name:string):void{console.log(\`Hello, \${name}!\`);}`,
    formatted: `function greet(name: string): void {\n  console.log(\`Hello, \${name}!\`);\n}\n`,
  },
  [LanguageName.tsx]: {
    unformatted: `const App:React.FC=()=><div><h1>Hello</h1></div>;`,
    formatted: `const App: React.FC = () => (\n  <div>\n    <h1>Hello</h1>\n  </div>\n);\n`,
  },
  [LanguageName.json]: {
    unformatted: `{"name":"test","values":[1,2,3],"nested":{"key":"value"}}`,
    formatted: `{\n  "name": "test",\n  "values": [1, 2, 3],\n  "nested": { "key": "value" }\n}\n`,
  },
  [LanguageName.css]: {
    unformatted: `body{margin:0;padding:0;}h1{color:red;font-size:2em;}`,
    formatted: `body {\n  margin: 0;\n  padding: 0;\n}\nh1 {\n  color: red;\n  font-size: 2em;\n}\n`,
  },
  [LanguageName.html]: {
    unformatted: `<html><head><title>Test</title></head><body><h1>Hello</h1><p>World</p></body></html>`,
    formatted: `<html>\n  <head>\n    <title>Test</title>\n  </head>\n  <body>\n    <h1>Hello</h1>\n    <p>World</p>\n  </body>\n</html>\n`,
  },
  [LanguageName.java]: {
    unformatted: `public class Test{public static void main(String[]args){System.out.println("Hello");}}`,
    formatted: `public class Test {\n  public static void main(String[] args) {\n    System.out.println("Hello");\n  }\n}\n`,
  },
  [LanguageName.cpp]: {
    unformatted: `#include<iostream>\nint main(){std::cout<<"Hello"<<std::endl;return 0;}`,
    formatted: `#include <iostream>\nint main() {\n  std::cout << "Hello" << std::endl;\n  return 0;\n}\n`,
  },
  [LanguageName.csharp]: {
    unformatted: `using System;class Program{static void Main(){Console.WriteLine("Hello");}}`,
    formatted: `using System;\nclass Program\n{\n    static void Main()\n    {\n        Console.WriteLine("Hello");\n    }\n}\n`,
  },
  [LanguageName.go]: {
    unformatted: `package main\nimport"fmt"\nfunc main(){fmt.Println("Hello")}`,
    formatted: `package main\n\nimport "fmt"\n\nfunc main() {\n\tfmt.Println("Hello")\n}\n`,
  },
  [LanguageName.python]: {
    unformatted: `def greet(name):\nprint(f"Hello, {name}!")\ngreet("World")`,
    formatted: `def greet(name):\n    print(f"Hello, {name}!")\n\n\ngreet("World")\n`,
  },
};

// Languages that should warn and not format
const unsupportedLanguages = [
  LanguageName.kotlin,
  LanguageName.php,
  LanguageName.ruby,
  LanguageName.rust,
];

describe('useCodeFormatter', () => {
  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  // Helper function to test formatting with proper waiting
  const testFormattingForLanguage = async (
    language: LanguageName,
    timeout = 10000,
  ) => {
    const { result } = renderHook(() =>
      useCodeFormatter({
        props: { language },
      }),
    );

    // Wait for formatting to become available (or timeout)
    try {
      await waitFor(
        () => {
          expect(result.current.isFormattingAvailable).toBe(true);
        },
        { timeout },
      );

      return { formatCode: result.current.formatCode, isAvailable: true };
    } catch {
      // If formatting doesn't become available, return the function anyway
      return { formatCode: result.current.formatCode, isAvailable: false };
    }
  };

  test('formats JavaScript code correctly', async () => {
    const { formatCode, isAvailable } = await testFormattingForLanguage(
      LanguageName.javascript,
    );

    expect(isAvailable).toBe(true);

    const testCase = formattingTestCases[LanguageName.javascript];
    const formatted = await formatCode(testCase.unformatted);

    // Test that formatting actually occurred (should be different from input)
    expect(formatted).not.toBe(testCase.unformatted);
    expect(formatted).toContain('function greet(name)');
    expect(formatted).toContain("greet('World')");
  });

  test('reports formatting as available for JavaScript', async () => {
    const { isAvailable } = await testFormattingForLanguage(
      LanguageName.javascript,
    );

    expect(isAvailable).toBe(true);
  });

  test('formats TypeScript code correctly', async () => {
    const { formatCode, isAvailable } = await testFormattingForLanguage(
      LanguageName.typescript,
    );

    expect(isAvailable).toBe(true);

    const testCase = formattingTestCases[LanguageName.typescript];
    const formatted = await formatCode(testCase.unformatted);

    // Test that formatting actually occurred
    expect(formatted).not.toBe(testCase.unformatted);
    expect(formatted).toContain('function greet(name: string): void');
  });

  test('formats JSON code correctly', async () => {
    const { formatCode, isAvailable } = await testFormattingForLanguage(
      LanguageName.json,
    );

    expect(isAvailable).toBe(true);

    const testCase = formattingTestCases[LanguageName.json];
    const formatted = await formatCode(testCase.unformatted);

    // Test that formatting actually occurred (JSON should be prettified)
    expect(formatted).not.toBe(testCase.unformatted);
    expect(formatted).toContain('\n'); // Should have newlines
    expect(formatted).toMatch(/"name":\s+"test"/); // Should have spacing
  });

  test('formats CSS code correctly', async () => {
    const { formatCode, isAvailable } = await testFormattingForLanguage(
      LanguageName.css,
    );

    expect(isAvailable).toBe(true);

    const testCase = formattingTestCases[LanguageName.css];
    const formatted = await formatCode(testCase.unformatted);

    // Test that formatting actually occurred
    expect(formatted).not.toBe(testCase.unformatted);
    expect(formatted).toContain('body {');
    expect(formatted).toContain('h1 {');
  });

  test('formats HTML code correctly', async () => {
    const { formatCode, isAvailable } = await testFormattingForLanguage(
      LanguageName.html,
    );

    expect(isAvailable).toBe(true);

    const testCase = formattingTestCases[LanguageName.html];
    const formatted = await formatCode(testCase.unformatted);

    // Test that formatting actually occurred
    expect(formatted).not.toBe(testCase.unformatted);
    expect(formatted).toContain('<html>');
    expect(formatted).toContain('<head>');
    expect(formatted).toContain('<body>');
  });

  test('formats Java code correctly', async () => {
    // WASM modules are mocked in Jest since they don't work in Node environment
    const { formatCode, isAvailable } = await testFormattingForLanguage(
      LanguageName.java,
    );

    expect(isAvailable).toBe(true);

    const testCase = formattingTestCases[LanguageName.java];
    const formatted = await formatCode(testCase.unformatted);

    // Test that formatting actually occurred
    expect(formatted).not.toBe(testCase.unformatted);
    expect(formatted).toContain('public static void main(String[] args)');
  });

  test('formats C++ code correctly', async () => {
    const { formatCode, isAvailable } = await testFormattingForLanguage(
      LanguageName.cpp,
    );

    expect(isAvailable).toBe(true);

    const testCase = formattingTestCases[LanguageName.cpp];
    const formatted = await formatCode(testCase.unformatted);
    expect(formatted).not.toBe(testCase.unformatted);
    expect(formatted).toContain('#include <iostream>');
  });

  test('formats C# code correctly', async () => {
    const { formatCode, isAvailable } = await testFormattingForLanguage(
      LanguageName.csharp,
    );

    expect(isAvailable).toBe(true);

    const testCase = formattingTestCases[LanguageName.csharp];
    const formatted = await formatCode(testCase.unformatted);
    expect(formatted).not.toBe(testCase.unformatted);
    expect(formatted).toContain('class Program');
  });

  test('formats Go code correctly', async () => {
    const { formatCode, isAvailable } = await testFormattingForLanguage(
      LanguageName.go,
    );

    expect(isAvailable).toBe(true);

    const testCase = formattingTestCases[LanguageName.go];
    const formatted = await formatCode(testCase.unformatted);
    expect(formatted).not.toBe(testCase.unformatted);
    expect(formatted).toContain('import "fmt"');
  });

  test('formats Python code correctly', async () => {
    const { formatCode, isAvailable } = await testFormattingForLanguage(
      LanguageName.python,
    );

    expect(isAvailable).toBe(true);

    const testCase = formattingTestCases[LanguageName.python];
    const formatted = await formatCode(testCase.unformatted);
    expect(formatted).not.toBe(testCase.unformatted);
    expect(formatted).toContain('def greet(name):');
  });

  describe('Unsupported languages', () => {
    unsupportedLanguages.forEach(language => {
      test(`warns and returns original code for ${language}`, async () => {
        const { result } = renderHook(() =>
          useCodeFormatter({
            props: { language },
          }),
        );

        const { formatCode, isFormattingAvailable } = result.current;
        const testCode = 'test code';
        const formatted = await formatCode(testCode);

        expect(isFormattingAvailable).toBe(false);
        expect(formatted).toBe(testCode);
        expect(console.warn).toHaveBeenCalledWith(
          expect.stringContaining(
            `${language} code formatting is not supported`,
          ),
        );
      });
    });
  });

  describe('Missing modules', () => {
    test('handles missing modules gracefully', async () => {
      // When modules fail to load, formatting should return original code
      const { result } = renderHook(() =>
        useCodeFormatter({
          props: { language: LanguageName.rust }, // Unsupported language
        }),
      );

      const { formatCode, isFormattingAvailable } = result.current;
      const testCode = 'test code';
      const formatted = await formatCode(testCode);

      expect(isFormattingAvailable).toBe(false);
      expect(formatted).toBe(testCode);
      expect(console.warn).toHaveBeenCalledWith(
        expect.stringContaining('code formatting is not supported'),
      );
    });
  });

  describe('Edge cases', () => {
    test('returns original code when no language is provided', async () => {
      const { result } = renderHook(() =>
        useCodeFormatter({
          props: { language: undefined },
        }),
      );

      const { formatCode, isFormattingAvailable } = result.current;
      const testCode = 'test code';
      const formatted = await formatCode(testCode);

      expect(isFormattingAvailable).toBe(false);
      expect(formatted).toBe(testCode);
    });

    test('returns original code when code is empty', async () => {
      const { result } = renderHook(() =>
        useCodeFormatter({
          props: { language: LanguageName.javascript },
        }),
      );

      const { formatCode } = result.current;
      const formatted = await formatCode('');

      expect(formatted).toBe('');
    });

    test('returns original code when code is only whitespace', async () => {
      const { result } = renderHook(() =>
        useCodeFormatter({
          props: { language: LanguageName.javascript },
        }),
      );

      const { formatCode } = result.current;
      const whitespaceCode = '   \n\t  \n  ';
      const formatted = await formatCode(whitespaceCode);

      expect(formatted).toBe(whitespaceCode);
    });
  });

  describe('Error handling', () => {
    test('handles formatter errors gracefully', async () => {
      // Test with invalid code that might cause formatting errors
      const { formatCode } = await testFormattingForLanguage(
        LanguageName.javascript,
      );

      const invalidCode = 'function invalid syntax {{{';
      const formatted = await formatCode(invalidCode);

      // When formatting fails, should return original code
      expect(formatted).toBe(invalidCode);
    });
  });
});

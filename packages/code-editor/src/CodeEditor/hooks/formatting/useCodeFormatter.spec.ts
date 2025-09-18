import { renderHook } from '@leafygreen-ui/testing-lib';

import { LanguageName } from '../extensions/useLanguageExtension';
import { type CodeEditorModules } from '../moduleLoaders.types';

import { useCodeFormatter } from './useCodeFormatter';

// Create simple mock modules for testing - focus on verifying correct method calls
const createMockModules = (
  language: LanguageName,
): Partial<CodeEditorModules> => {
  const modules: Partial<CodeEditorModules> = {};

  switch (language) {
    case LanguageName.javascript:
    case LanguageName.jsx:
    case LanguageName.json:
      modules['prettier/standalone'] = {
        format: jest.fn().mockReturnValue('formatted code'),
      } as any;
      modules['prettier/parser-babel'] = {} as any;
      break;

    case LanguageName.typescript:
    case LanguageName.tsx:
      modules['prettier/standalone'] = {
        format: jest.fn().mockReturnValue('formatted code'),
      } as any;
      modules['prettier/parser-typescript'] = {} as any;
      break;

    case LanguageName.css:
      modules['prettier/standalone'] = {
        format: jest.fn().mockReturnValue('formatted code'),
      } as any;
      modules['prettier/parser-postcss'] = {} as any;
      break;

    case LanguageName.html:
      modules['prettier/standalone'] = {
        format: jest.fn().mockReturnValue('formatted code'),
      } as any;
      modules['prettier/parser-html'] = {} as any;
      break;

    case LanguageName.java:
    case LanguageName.cpp:
    case LanguageName.csharp:
      modules['@wasm-fmt/clang-format'] = {
        format: jest.fn().mockReturnValue('formatted code'),
        default: jest.fn().mockResolvedValue({}),
      } as any;
      break;

    case LanguageName.go:
      modules['@wasm-fmt/gofmt'] = {
        format: jest.fn().mockReturnValue('formatted code'),
        default: jest.fn().mockResolvedValue({}),
      } as any;
      break;

    case LanguageName.python:
      modules['@wasm-fmt/ruff_fmt'] = {
        format: jest.fn().mockReturnValue('formatted code'),
        default: jest.fn().mockResolvedValue({}),
      } as any;
      break;

    default:
      // For unsupported languages, provide empty modules
      break;
  }

  return modules;
};

// Test data for verifying correct formatter calls
const testCode = 'const example = "test code";';

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

  // Helper function to test formatting with mock modules
  const testFormattingForLanguage = (language: LanguageName) => {
    const mockModules = createMockModules(language);

    const { result } = renderHook(() =>
      useCodeFormatter({
        props: { language },
        modules: mockModules,
      }),
    );

    return {
      formatCode: result.current.formatCode,
      isAvailable: result.current.isFormattingAvailable,
    };
  };

  test('calls prettier format for JavaScript code', async () => {
    const mockModules = createMockModules(LanguageName.javascript);

    const { result } = renderHook(() =>
      useCodeFormatter({
        props: { language: LanguageName.javascript },
        modules: mockModules,
      }),
    );

    const { formatCode, isFormattingAvailable } = result.current;

    expect(isFormattingAvailable).toBe(true);

    const formattedResult = await formatCode(testCode);

    // Verify prettier format was called
    expect(mockModules['prettier/standalone']?.format).toHaveBeenCalledWith(
      testCode,
      expect.objectContaining({
        parser: 'babel',
        plugins: [mockModules['prettier/parser-babel']],
        tabWidth: 2,
        useTabs: false,
      }),
    );

    // Verify result is returned
    expect(formattedResult).toBe('formatted code');
  });

  test('reports formatting as available for JavaScript', () => {
    const { isAvailable } = testFormattingForLanguage(LanguageName.javascript);

    expect(isAvailable).toBe(true);
  });

  test('formats TypeScript code when modules are provided', async () => {
    const { formatCode, isAvailable } = testFormattingForLanguage(
      LanguageName.typescript,
    );

    expect(isAvailable).toBe(true);

    const result = await formatCode(testCode);
    expect(result).toBe('formatted code');
  });

  test('formats JSON code when modules are provided', async () => {
    const { formatCode, isAvailable } = testFormattingForLanguage(
      LanguageName.json,
    );

    expect(isAvailable).toBe(true);

    const result = await formatCode(testCode);
    expect(result).toBe('formatted code');
  });

  test('formats CSS code when modules are provided', async () => {
    const { formatCode, isAvailable } = testFormattingForLanguage(
      LanguageName.css,
    );

    expect(isAvailable).toBe(true);

    const result = await formatCode(testCode);
    expect(result).toBe('formatted code');
  });

  test('formats HTML code when modules are provided', async () => {
    const { formatCode, isAvailable } = testFormattingForLanguage(
      LanguageName.html,
    );

    expect(isAvailable).toBe(true);

    const result = await formatCode(testCode);
    expect(result).toBe('formatted code');
  });

  test('formats Java code when modules are provided', async () => {
    const { formatCode, isAvailable } = testFormattingForLanguage(
      LanguageName.java,
    );

    expect(isAvailable).toBe(true);

    const result = await formatCode(testCode);
    expect(result).toBe('formatted code');
  });

  test('formats C++ code when modules are provided', async () => {
    const { formatCode, isAvailable } = testFormattingForLanguage(
      LanguageName.cpp,
    );

    expect(isAvailable).toBe(true);

    const result = await formatCode(testCode);
    expect(result).toBe('formatted code');
  });

  test('formats C# code when modules are provided', async () => {
    const { formatCode, isAvailable } = testFormattingForLanguage(
      LanguageName.csharp,
    );

    expect(isAvailable).toBe(true);

    const result = await formatCode(testCode);
    expect(result).toBe('formatted code');
  });

  test('formats Go code when modules are provided', async () => {
    const { formatCode, isAvailable } = testFormattingForLanguage(
      LanguageName.go,
    );

    expect(isAvailable).toBe(true);

    const result = await formatCode(testCode);
    expect(result).toBe('formatted code');
  });

  test('formats Python code when modules are provided', async () => {
    const { formatCode, isAvailable } = testFormattingForLanguage(
      LanguageName.python,
    );

    expect(isAvailable).toBe(true);

    const result = await formatCode(testCode);
    expect(result).toBe('formatted code');
  });

  describe('Unsupported languages', () => {
    unsupportedLanguages.forEach(language => {
      test(`warns and returns original code for ${language}`, async () => {
        const mockModules = createMockModules(language); // Returns empty modules for unsupported languages

        const { result } = renderHook(() =>
          useCodeFormatter({
            props: { language },
            modules: mockModules,
          }),
        );

        const { formatCode, isFormattingAvailable } = result.current;
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
      // When modules are not provided, formatting should return original code
      const { result } = renderHook(() =>
        useCodeFormatter({
          props: { language: LanguageName.javascript },
          modules: {}, // Empty modules object
        }),
      );

      const { formatCode, isFormattingAvailable } = result.current;
      const formatted = await formatCode(testCode);

      expect(isFormattingAvailable).toBe(false);
      expect(formatted).toBe(testCode);
    });
  });

  describe('Edge cases', () => {
    test('returns original code when no language is provided', async () => {
      const { result } = renderHook(() =>
        useCodeFormatter({
          props: { language: undefined },
          modules: {},
        }),
      );

      const { formatCode, isFormattingAvailable } = result.current;
      const formatted = await formatCode(testCode);

      expect(isFormattingAvailable).toBe(false);
      expect(formatted).toBe(testCode);
    });

    test('returns original code when code is empty', async () => {
      const mockModules = createMockModules(LanguageName.javascript);

      const { result } = renderHook(() =>
        useCodeFormatter({
          props: { language: LanguageName.javascript },
          modules: mockModules,
        }),
      );

      const { formatCode } = result.current;
      const formatted = await formatCode('');

      expect(formatted).toBe('');
    });

    test('returns original code when code is only whitespace', async () => {
      const mockModules = createMockModules(LanguageName.javascript);

      const { result } = renderHook(() =>
        useCodeFormatter({
          props: { language: LanguageName.javascript },
          modules: mockModules,
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
      // Create modules that throw an error when format is called
      const mockModules = createMockModules(LanguageName.javascript);
      (
        mockModules['prettier/standalone']?.format as jest.Mock
      ).mockImplementation(() => {
        throw new Error('Formatting failed');
      });

      const { result } = renderHook(() =>
        useCodeFormatter({
          props: { language: LanguageName.javascript },
          modules: mockModules,
        }),
      );

      const { formatCode } = result.current;
      const invalidCode = 'function invalid syntax {{{';
      const formatted = await formatCode(invalidCode);

      // When formatting fails, should return original code
      expect(formatted).toBe(invalidCode);
      expect(console.error).toHaveBeenCalledWith(
        'Error formatting javascript code:',
        expect.any(Error),
      );
    });
  });
});

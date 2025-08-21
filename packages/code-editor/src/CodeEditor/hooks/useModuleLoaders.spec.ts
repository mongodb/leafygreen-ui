import { renderHook } from '@testing-library/react';

import { type CodeEditorProps } from '../CodeEditor.types';

import { LanguageName } from './extensions/useLanguageExtension';
import { useModuleLoaders } from './useModuleLoaders';

describe('useModuleLoaders', () => {
  const baseProps: CodeEditorProps = {
    enableClickableUrls: false,
    enableCodeFolding: false,
    forceParsing: false,
    indentUnit: undefined,
    tooltips: undefined,
    language: undefined,
  };

  test('always includes core modules', () => {
    const { result } = renderHook(() => useModuleLoaders(baseProps));

    const loaders = result.current;
    expect(loaders).toHaveProperty('codemirror');
    expect(loaders).toHaveProperty('@codemirror/view');
    expect(loaders).toHaveProperty('@codemirror/state');
    expect(loaders).toHaveProperty('@codemirror/commands');
    expect(typeof loaders.codemirror).toBe('function');
    expect(typeof loaders['@codemirror/view']).toBe('function');
    expect(typeof loaders['@codemirror/state']).toBe('function');
    expect(typeof loaders['@codemirror/commands']).toBe('function');
  });

  test('includes hyperlink module when enableClickableUrls is true', () => {
    const props: CodeEditorProps = {
      ...baseProps,
      enableClickableUrls: true,
    };

    const { result } = renderHook(() => useModuleLoaders(props));

    expect(result.current).toHaveProperty(
      '@uiw/codemirror-extensions-hyper-link',
    );
  });

  test('does not include hyperlink module when enableClickableUrls is false', () => {
    const props: CodeEditorProps = {
      ...baseProps,
      enableClickableUrls: false,
    };

    const { result } = renderHook(() => useModuleLoaders(props));

    expect(result.current).not.toHaveProperty(
      '@uiw/codemirror-extensions-hyper-link',
    );
  });

  test('includes language module when enableCodeFolding is true', () => {
    const props: CodeEditorProps = {
      ...baseProps,
      enableCodeFolding: true,
    };

    const { result } = renderHook(() => useModuleLoaders(props));

    expect(result.current).toHaveProperty('@codemirror/language');
  });

  test('includes language module when forceParsing is true', () => {
    const props: CodeEditorProps = {
      ...baseProps,
      forceParsing: true,
    };

    const { result } = renderHook(() => useModuleLoaders(props));

    expect(result.current).toHaveProperty('@codemirror/language');
  });

  test('includes language module when indentUnit is specified', () => {
    const props: CodeEditorProps = {
      ...baseProps,
      indentUnit: 'space' as any,
    };

    const { result } = renderHook(() => useModuleLoaders(props));

    expect(result.current).toHaveProperty('@codemirror/language');
  });

  test('includes lint module when tooltips are provided', () => {
    const props: CodeEditorProps = {
      ...baseProps,
      tooltips: [
        {
          line: 1,
          column: 1,
          content: 'Error message',
          severity: 'error',
          length: 0,
        },
      ],
    };

    const { result } = renderHook(() => useModuleLoaders(props));

    expect(result.current).toHaveProperty('@codemirror/lint');
  });

  test('does not include lint module when tooltips array is empty', () => {
    const props: CodeEditorProps = {
      ...baseProps,
      tooltips: [],
    };

    const { result } = renderHook(() => useModuleLoaders(props));

    expect(result.current).not.toHaveProperty('@codemirror/lint');
  });

  describe('language-specific modules', () => {
    test('includes highlight and autocomplete modules for any language', () => {
      const props: CodeEditorProps = {
        ...baseProps,
        language: LanguageName.javascript,
      };

      const { result } = renderHook(() => useModuleLoaders(props));

      expect(result.current).toHaveProperty('@lezer/highlight');
      expect(result.current).toHaveProperty('@codemirror/autocomplete');
    });

    test('loads JavaScript module for JavaScript', () => {
      const props: CodeEditorProps = {
        ...baseProps,
        language: LanguageName.javascript,
      };

      const { result } = renderHook(() => useModuleLoaders(props));

      expect(result.current).toHaveProperty('@codemirror/lang-javascript');
    });

    test('loads JavaScript module for JSX', () => {
      const props: CodeEditorProps = {
        ...baseProps,
        language: LanguageName.jsx,
      };

      const { result } = renderHook(() => useModuleLoaders(props));

      expect(result.current).toHaveProperty('@codemirror/lang-javascript');
    });

    test('loads JavaScript module for TypeScript', () => {
      const props: CodeEditorProps = {
        ...baseProps,
        language: LanguageName.typescript,
      };

      const { result } = renderHook(() => useModuleLoaders(props));

      expect(result.current).toHaveProperty('@codemirror/lang-javascript');
    });

    test('loads JavaScript module for TSX', () => {
      const props: CodeEditorProps = {
        ...baseProps,
        language: LanguageName.tsx,
      };

      const { result } = renderHook(() => useModuleLoaders(props));

      expect(result.current).toHaveProperty('@codemirror/lang-javascript');
    });

    test('loads Python module for Python', () => {
      const props: CodeEditorProps = {
        ...baseProps,
        language: LanguageName.python,
      };

      const { result } = renderHook(() => useModuleLoaders(props));

      expect(result.current).toHaveProperty('@codemirror/lang-python');
    });

    test('loads C++ module for C++', () => {
      const props: CodeEditorProps = {
        ...baseProps,
        language: LanguageName.cpp,
      };

      const { result } = renderHook(() => useModuleLoaders(props));

      expect(result.current).toHaveProperty('@codemirror/lang-cpp');
    });

    test('loads C# module for C#', () => {
      const props: CodeEditorProps = {
        ...baseProps,
        language: LanguageName.csharp,
      };

      const { result } = renderHook(() => useModuleLoaders(props));

      expect(result.current).toHaveProperty('@replit/codemirror-lang-csharp');
    });

    test('loads CSS module for CSS', () => {
      const props: CodeEditorProps = {
        ...baseProps,
        language: LanguageName.css,
      };

      const { result } = renderHook(() => useModuleLoaders(props));

      expect(result.current).toHaveProperty('@codemirror/lang-css');
    });

    test('loads Go module for Go', () => {
      const props: CodeEditorProps = {
        ...baseProps,
        language: LanguageName.go,
      };

      const { result } = renderHook(() => useModuleLoaders(props));

      expect(result.current).toHaveProperty('@codemirror/lang-go');
    });

    test('loads HTML module for HTML', () => {
      const props: CodeEditorProps = {
        ...baseProps,
        language: LanguageName.html,
      };

      const { result } = renderHook(() => useModuleLoaders(props));

      expect(result.current).toHaveProperty('@codemirror/lang-html');
    });

    test('loads Java module for Java', () => {
      const props: CodeEditorProps = {
        ...baseProps,
        language: LanguageName.java,
      };

      const { result } = renderHook(() => useModuleLoaders(props));

      expect(result.current).toHaveProperty('@codemirror/lang-java');
    });

    test('loads JSON module for JSON', () => {
      const props: CodeEditorProps = {
        ...baseProps,
        language: LanguageName.json,
      };

      const { result } = renderHook(() => useModuleLoaders(props));

      expect(result.current).toHaveProperty('@codemirror/lang-json');
    });

    test('loads Kotlin legacy mode modules for Kotlin', () => {
      const props: CodeEditorProps = {
        ...baseProps,
        language: LanguageName.kotlin,
      };

      const { result } = renderHook(() => useModuleLoaders(props));

      expect(result.current).toHaveProperty('@codemirror/language');
      expect(result.current).toHaveProperty(
        '@codemirror/legacy-modes/mode/clike',
      );
    });

    test('loads PHP module for PHP', () => {
      const props: CodeEditorProps = {
        ...baseProps,
        language: LanguageName.php,
      };

      const { result } = renderHook(() => useModuleLoaders(props));

      expect(result.current).toHaveProperty('@codemirror/lang-php');
    });

    test('loads Ruby legacy mode modules for Ruby', () => {
      const props: CodeEditorProps = {
        ...baseProps,
        language: LanguageName.ruby,
      };

      const { result } = renderHook(() => useModuleLoaders(props));

      expect(result.current).toHaveProperty('@codemirror/language');
      expect(result.current).toHaveProperty(
        '@codemirror/legacy-modes/mode/ruby',
      );
    });

    test('loads Rust module for Rust', () => {
      const props: CodeEditorProps = {
        ...baseProps,
        language: LanguageName.rust,
      };

      const { result } = renderHook(() => useModuleLoaders(props));

      expect(result.current).toHaveProperty('@codemirror/lang-rust');
    });
  });

  test('memoizes results and only recalculates when dependencies change', () => {
    const props: CodeEditorProps = {
      ...baseProps,
      language: LanguageName.javascript,
    };

    const { result, rerender } = renderHook(
      ({ props }) => useModuleLoaders(props),
      { initialProps: { props } },
    );

    const firstResult = result.current;

    // Rerender with same props
    rerender({ props });

    // Should return the same object reference (memoized)
    expect(result.current).toBe(firstResult);

    // Change a prop
    const newProps: CodeEditorProps = {
      ...baseProps,
      language: LanguageName.python,
    };

    rerender({ props: newProps });

    // Should return a new object (recalculated)
    expect(result.current).not.toBe(firstResult);
    expect(result.current).toHaveProperty('@codemirror/lang-python');
    expect(result.current).not.toHaveProperty('@codemirror/lang-javascript');
  });

  test('handles complex combinations of features', () => {
    const props: CodeEditorProps = {
      ...baseProps,
      language: LanguageName.typescript,
      enableClickableUrls: true,
      enableCodeFolding: true,
      forceParsing: true,
      indentUnit: 'space' as any,
      tooltips: [
        {
          line: 1,
          column: 1,
          content: 'Error',
          severity: 'error',
          length: 0,
        },
      ],
    };

    const { result } = renderHook(() => useModuleLoaders(props));

    const loaders = result.current;

    // Core modules
    expect(loaders).toHaveProperty('codemirror');
    expect(loaders).toHaveProperty('@codemirror/view');
    expect(loaders).toHaveProperty('@codemirror/state');
    expect(loaders).toHaveProperty('@codemirror/commands');

    // Feature-specific modules
    expect(loaders).toHaveProperty('@uiw/codemirror-extensions-hyper-link');
    expect(loaders).toHaveProperty('@codemirror/language');
    expect(loaders).toHaveProperty('@codemirror/lint');

    // Language-specific modules
    expect(loaders).toHaveProperty('@lezer/highlight');
    expect(loaders).toHaveProperty('@codemirror/autocomplete');
    expect(loaders).toHaveProperty('@codemirror/lang-javascript');
  });

  test('does not include unnecessary modules when features are disabled', () => {
    const props: CodeEditorProps = baseProps; // All features disabled

    const { result } = renderHook(() => useModuleLoaders(props));

    const loaders = result.current;

    // Should only have core modules
    expect(loaders).toHaveProperty('codemirror');
    expect(loaders).toHaveProperty('@codemirror/view');
    expect(loaders).toHaveProperty('@codemirror/state');
    expect(loaders).toHaveProperty('@codemirror/commands');

    // Should not have feature-specific modules
    expect(loaders).not.toHaveProperty('@uiw/codemirror-extensions-hyper-link');
    expect(loaders).not.toHaveProperty('@codemirror/language');
    expect(loaders).not.toHaveProperty('@codemirror/lint');
    expect(loaders).not.toHaveProperty('@lezer/highlight');
    expect(loaders).not.toHaveProperty('@codemirror/autocomplete');
  });
});

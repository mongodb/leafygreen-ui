/**
 * Test utilities for CodeMirror extension hooks
 *
 * These utilities eliminate duplication and provide consistent fake modules for testing
 * CodeMirror extension hooks. They include fake implementations of CodeMirror modules
 * and helper functions to create test-friendly mocks.
 */

/**
 * Fake Compartment class for testing useExtension hooks
 */
export class FakeCompartment {
  of<T>(ext: T): T {
    return ext;
  }
  reconfigure(_ext: unknown) {
    return {} as unknown as any;
  }
}

/**
 * Fake @codemirror/state module for testing
 */
export const createFakeStateModule = (
  additionalMethods?: Record<string, any>,
) =>
  ({
    Compartment: FakeCompartment,
    EditorState: {
      readOnly: { of: (val: boolean) => `READONLY_${val}` },
      tabSize: { of: (val: number) => `TABSIZE_${val}` },
      ...additionalMethods,
    },
  } as unknown as typeof import('@codemirror/state'));

/**
 * Fake @codemirror/view module for testing
 */
export const createFakeViewModule = (additionalMethods?: Record<string, any>) =>
  ({
    EditorView: {
      lineWrapping: 'WRAP_EXT',
      theme: jest.fn(() => 'THEME_EXT'),
      ...additionalMethods,
    },
    lineNumbers: jest.fn(() => 'LINENUM_EXT'),
    placeholder: jest.fn((text: string) => `PLACEHOLDER_${text}`),
    ...additionalMethods,
  } as unknown as typeof import('@codemirror/view'));

/**
 * Fake @codemirror/language module for testing
 */
export const createFakeLanguageModule = (
  additionalMethods?: Record<string, any>,
) =>
  ({
    syntaxHighlighting: (style: unknown) => ({ HIGHLIGHT_EXT: style }),
    HighlightStyle: { define: (defs: unknown) => ({ DEFS: defs }) },
    indentUnit: { of: (v: string) => `INDENT_${JSON.stringify(v)}` },
    foldGutter: jest.fn((opts?: any) => ({ FOLD_EXT: opts })),
    ...additionalMethods,
  } as unknown as typeof import('@codemirror/language'));

/**
 * Fake @lezer/highlight module for testing
 */
export const createFakeLezerHighlightModule = () =>
  ({
    tags: {
      keyword: {},
      function: (x: any) => x,
      variableName: {},
      number: {},
      literal: {},
      regexp: {},
      name: {},
      escape: {},
      quote: {},
      heading: {},
      string: {},
      inserted: {},
      meta: {},
      docString: {},
      propertyName: {},
      link: {},
      typeName: {},
      list: {},
      atom: {},
      self: {},
      deleted: {},
      docComment: {},
      className: {},
      comment: {},
      emphasis: {},
      strong: {},
      operatorKeyword: {},
      controlKeyword: {},
      definitionKeyword: {},
      tagName: {},
      modifier: {},
      changed: {},
    },
  } as unknown as typeof import('@lezer/highlight'));

/**
 * Fake @codemirror/autocomplete module for testing
 */
export const createFakeAutoCompleteModule = () =>
  ({
    autocompletion: jest.fn(() => 'AC_EXT'),
  } as unknown as typeof import('@codemirror/autocomplete'));

/**
 * Fake @codemirror/lint module for testing
 */
export const createFakeLintModule = () =>
  ({
    linter: (fn: any) => ({ LINTER_EXT: typeof fn }),
  } as unknown as typeof import('@codemirror/lint'));

/**
 * Fake @uiw/codemirror-extensions-hyper-link module for testing
 */
export const createFakeHyperLinkModule = () =>
  ({
    hyperLink: 'HYPERLINK_EXT',
  } as any);

/**
 * Create a language module factory helper for testing
 */
export const createLanguageModuleFactory = (name: string) => ({
  [name]: jest.fn(() => `${name.toUpperCase()}_EXT`),
});

/**
 * Comprehensive fake modules collection for complex tests
 */
export const createComprehensiveFakeModules = () => {
  const fakeStateModule = createFakeStateModule();

  return {
    '@codemirror/state': fakeStateModule,
    '@codemirror/view': createFakeViewModule(),
    '@codemirror/language': createFakeLanguageModule(),
    '@lezer/highlight': createFakeLezerHighlightModule(),
    '@codemirror/autocomplete': createFakeAutoCompleteModule(),
    '@codemirror/lint': createFakeLintModule(),
    '@uiw/codemirror-extensions-hyper-link': createFakeHyperLinkModule(),
    '@codemirror/lang-javascript': { javascript: jest.fn(() => 'JS_EXT') },
    '@codemirror/lang-json': createLanguageModuleFactory('json'),
    '@codemirror/lang-css': createLanguageModuleFactory('css'),
    '@codemirror/lang-html': createLanguageModuleFactory('html'),
    '@codemirror/lang-java': createLanguageModuleFactory('java'),
    '@codemirror/lang-cpp': createLanguageModuleFactory('cpp'),
    '@codemirror/lang-go': createLanguageModuleFactory('go'),
    '@codemirror/lang-python': createLanguageModuleFactory('python'),
    '@codemirror/lang-php': createLanguageModuleFactory('php'),
    '@codemirror/lang-rust': createLanguageModuleFactory('rust'),
    '@replit/codemirror-lang-csharp': { csharp: jest.fn(() => 'CSHARP_EXT') },
    '@codemirror/legacy-modes/mode/clike': { kotlin: { name: 'kotlin' } },
    '@codemirror/legacy-modes/mode/ruby': { ruby: { name: 'ruby' } },
  } as any;
};

/**
 * Default test props for extension hooks
 */
export const createDefaultTestProps = () => ({
  editorViewInstance: null,
});

/**
 * Helper to create a fake Extension for testing useExtension
 */
export const createFakeExtension = (label: string) =>
  ({ label } as unknown as import('@codemirror/state').Extension);

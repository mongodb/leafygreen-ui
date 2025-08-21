/**
 * Interface representing all the module dependencies that might be dynamically imported
 * by the CodeEditor component. This comprehensive mapping enables the lazy loading
 * system to properly type and load the required modules based on editor configuration.
 *
 * Each property represents a module that can be dynamically imported, with its type
 * corresponding to the result of importing that module.
 */
export interface CodeEditorModules {
  '@uiw/codemirror-extensions-hyper-link': typeof import('@uiw/codemirror-extensions-hyper-link');
  '@codemirror/language': typeof import('@codemirror/language');
  '@codemirror/lint': typeof import('@codemirror/lint');
  '@codemirror/lang-cpp': typeof import('@codemirror/lang-cpp');
  '@replit/codemirror-lang-csharp': typeof import('@replit/codemirror-lang-csharp');
  '@codemirror/lang-css': typeof import('@codemirror/lang-css');
  '@codemirror/lang-go': typeof import('@codemirror/lang-go');
  '@codemirror/lang-html': typeof import('@codemirror/lang-html');
  '@codemirror/lang-java': typeof import('@codemirror/lang-java');
  '@codemirror/lang-javascript': typeof import('@codemirror/lang-javascript');
  '@codemirror/lang-json': typeof import('@codemirror/lang-json');
  '@codemirror/legacy-modes/mode/clike': typeof import('@codemirror/legacy-modes/mode/clike');
  '@codemirror/lang-php': typeof import('@codemirror/lang-php');
  '@codemirror/lang-python': typeof import('@codemirror/lang-python');
  '@codemirror/legacy-modes/mode/ruby': typeof import('@codemirror/legacy-modes/mode/ruby');
  '@codemirror/lang-rust': typeof import('@codemirror/lang-rust');
  '@lezer/highlight': typeof import('@lezer/highlight');
  codemirror: typeof import('codemirror');
  '@codemirror/view': typeof import('@codemirror/view');
  '@codemirror/state': typeof import('@codemirror/state');
  '@codemirror/commands': typeof import('@codemirror/commands');
  '@codemirror/autocomplete': typeof import('@codemirror/autocomplete');

  // Prettier formatting modules
  'prettier/standalone': typeof import('prettier/standalone');
  'prettier/parser-babel': typeof import('prettier/parser-babel');
  'prettier/parser-typescript': typeof import('prettier/parser-typescript');
  'prettier/parser-postcss': typeof import('prettier/parser-postcss');
  'prettier/parser-html': typeof import('prettier/parser-html');

  // WASM formatting modules
  '@wasm-fmt/clang-format': typeof import('@wasm-fmt/clang-format');
  '@wasm-fmt/gofmt': typeof import('@wasm-fmt/gofmt');
  '@wasm-fmt/ruff_fmt': typeof import('@wasm-fmt/ruff_fmt');
}

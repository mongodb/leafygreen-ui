import * as codemirrorAutocomplete from '@codemirror/autocomplete';
import * as codemirrorCommands from '@codemirror/commands';
// Language-specific imports
import * as langCpp from '@codemirror/lang-cpp';
import * as langGo from '@codemirror/lang-go';
import * as langHtml from '@codemirror/lang-html';
import * as langJava from '@codemirror/lang-java';
import * as langJavaScript from '@codemirror/lang-javascript';
import * as langJson from '@codemirror/lang-json';
import * as langPhp from '@codemirror/lang-php';
import * as langPython from '@codemirror/lang-python';
import * as langRust from '@codemirror/lang-rust';
import * as codemirrorLanguage from '@codemirror/language';
import * as legacyModeClike from '@codemirror/legacy-modes/mode/clike';
import * as legacyModeRuby from '@codemirror/legacy-modes/mode/ruby';
import * as codemirrorLint from '@codemirror/lint';
import * as codemirrorSearch from '@codemirror/search';
import * as codemirrorState from '@codemirror/state';
import * as codemirrorView from '@codemirror/view';
import * as lezerHighlight from '@lezer/highlight';
import * as langCSharp from '@replit/codemirror-lang-csharp';
import * as hyperLink from '@uiw/codemirror-extensions-hyper-link';
// Import all CodeMirror modules for synchronous testing
import * as codemirror from 'codemirror';
import * as prettierParserBabel from 'prettier/parser-babel';
import * as prettierParserHtml from 'prettier/parser-html';
import * as prettierParserTypescript from 'prettier/parser-typescript';
// Prettier formatting modules
import * as prettierStandalone from 'prettier/standalone';

import { type CodeEditorModules } from '../CodeEditor/hooks';

import * as langCss from '@codemirror/lang-css';
import * as prettierParserPostcss from 'prettier/parser-postcss';

/**
 * Pre-loaded modules for synchronous testing.
 * Contains all possible CodeMirror modules to avoid async loading in tests.
 */
export const preLoadedModules: Partial<CodeEditorModules> = {
  codemirror,
  '@codemirror/view': codemirrorView,
  '@codemirror/state': codemirrorState,
  '@codemirror/commands': codemirrorCommands,
  '@codemirror/language': codemirrorLanguage,
  '@codemirror/lint': codemirrorLint,
  '@codemirror/autocomplete': codemirrorAutocomplete,
  '@codemirror/search': codemirrorSearch,
  '@lezer/highlight': lezerHighlight,
  '@uiw/codemirror-extensions-hyper-link': hyperLink,
  '@codemirror/lang-cpp': langCpp,
  '@replit/codemirror-lang-csharp': langCSharp,
  '@codemirror/lang-css': langCss,
  '@codemirror/lang-go': langGo,
  '@codemirror/lang-html': langHtml,
  '@codemirror/lang-java': langJava,
  '@codemirror/lang-javascript': langJavaScript,
  '@codemirror/lang-json': langJson,
  '@codemirror/lang-php': langPhp,
  '@codemirror/lang-python': langPython,
  '@codemirror/lang-rust': langRust,
  '@codemirror/legacy-modes/mode/clike': legacyModeClike,
  '@codemirror/legacy-modes/mode/ruby': legacyModeRuby,
  'prettier/standalone': prettierStandalone,
  'prettier/parser-babel': prettierParserBabel,
  'prettier/parser-typescript': prettierParserTypescript,
  'prettier/parser-postcss': prettierParserPostcss,
  'prettier/parser-html': prettierParserHtml,
};

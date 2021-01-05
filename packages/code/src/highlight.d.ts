interface TokenObject {
  kind: string;
  children: Array<string | TokenObject>;
}

interface RootNode {
  children: Array<TokenObject | string>;
}

interface LanguageDefinition {
  aliases?: Array<string>;
  keywords?: string | Record<string, string>;
  disableAutodetect?: boolean;
  illegal?: string;
  contains?: Array<any>;
  exports?: {
    preprocessor: any;
    strings: any; // Maybe Array<string>
    keywords: any; // Probably the same as keywords above
  };
}

declare class TokenTree {
  constructor();
  top: () => Array<any>;
  root: () => RootNode;
  rootNode: RootNode;
  stack: Array<RootNode>;
  add(node: TokenObject | string): void;
  openNode(kind: string): void;
  closeNode(): void;
  closeAllNodes(): void;
  toJSON(): string;
  walk<T>(builder: T): T;
  static _walk<T>(builder: T, node: string | Array<TokenObject | string>): T;
  static _collapse(node: string | Array<TokenObject | string>): void;
}

declare class TokenTreeEmitter extends TokenTree {
  constructor(options: HighlightConfiguration);

  addKeyword(text: string, kind: string): void;
  addText(text: string): void;
  addSublanguage(emitter: any, name: string): void;
  toHTML(): string;
  finalize(): void;
}

interface HighlightResult {
  value: string;
  code: string;
  isTransformed: boolean;
  valueWithLineNumbers: string;
  emitter: TokenTreeEmitter;
  react: React.ReactNode;
  relevance: number;
  language: string;
  illegal: boolean;
  top: Record<string, any>;
}

interface HighlightAutoResult {
  language: string;
  relevance: number;
  value: string;
  second_best?: HighlightAutoResult;
}

interface HighlightConfiguration {
  /**
   * Regex to configure which CSS classes should be completely skipped
   */
  noHighlightRe?: RegExp;

  /**
   * Regex to configure how CSS class names map to language (allows class names like say color-as-php vs the default of language-php, etc.)
   */
  languageDetectRe?: RegExp;

  /**
   * String used to replace TAB characters in indentation.
   */
  classPrefix?: string;

  /**
   * A string used to replace TAB characters in indentation.
   */
  tabReplace: string | null;

  /**
   * A flag to generate <br> tags instead of new-line characters in the output, useful when code is marked up using a non-<pre> container.
   */
  useBR: boolean;

  /**
   * An array of language names and aliases restricting auto detection to only these languages.
   */
  languages?: Array<string>;

  /**
   * **Internal use only**
   */
  __emitter: TokenTreeEmitter;
}

interface HighlightPluginEventCallbacks {
  'after:highlight'?: (result: HighlightResult) => void;
}

// https://highlightjs.readthedocs.io/en/latest/api.html
declare module 'highlight.js/lib/core' {
  namespace HLJS {
    /**
     * Core highlighting function. Accepts a language name, or an alias, and a string with the code to highlight. The ignore_illegals parameter, when present and evaluates to a true value, forces highlighting to finish even in case of detecting illegal syntax for the language instead of throwing an exception. The continuation is an optional mode stack representing unfinished parsing. When present, the function will restart parsing from this state instead of initializing a new one. This is used internally for sublanguage support.
     */
    function highlight(
      language: string,
      code: string,
      ignore_illegals?: boolean,
      continuation?: Record<string, any>,
    ): HighlightResult;

    /**
     * Highlighting with language detection. Accepts a string with the code to highlight and an optional array of language names and aliases restricting detection to only those languages. The subset can also be set with configure, but the local parameter overrides the option if set.
     */
    function highlightAuto(
      code: string,
      languageSubset: Array<string>,
    ): HighlightAutoResult;

    /**
     * Post-processing of the highlighted markup. Currently consists of replacing indentation TAB characters and using <br> tags instead of new-line characters. Options are set globally with configure.
     */
    function fixMarkup(value: string): string;

    /**
     * Applies highlighting to a DOM node containing code. This function is the one to use to apply highlighting dynamically after page load or within initialization code of third-party Javascript frameworks.
     *
     * The function uses language detection by default but you can specify the language in the class attribute of the DOM node. See the class reference for all available language names and aliases.
     */
    function highlightBlock(block: HTMLElement): HighlightResult;

    /**
     * Configures global options.
     */
    function configure(options: Partial<HighlightConfiguration>): void;

    /**
     * Applies highlighting to all `<pre><code>...</code></pre>` blocks on a page.
     */
    function initHighlighting(): void;

    /**
     * Attaches highlighting to the page load event.
     */
    function initHighlightingOnLoad(): void;

    /**
     * Adds new language to the library under the specified name.
     */
    function registerLanguage(
      languageName: string,
      languageDefinition: LanguageDefinition,
    ): void;

    /**
     * Adds new language alias or aliases to the library for the specified language name defined under languageName key.
     */
    function registerAliases(alias: string | Array<string>): void;

    /**
     * Returns the languages names list.
     */
    function listLanguages(): Array<string>;

    /**
     * Looks up a language by name or alias.
     */
    function getLanguage(name: string): LanguageDefinition | undefined;

    /**
     * Looks up a language by name or alias.
     *
     * This should be used when one language definition depends on another. Using this function (vs getLanguage) will provide better error messaging when a required language is missing.
     *
     * Returns the language object if found, raises a hard error otherwise.
     */
    function requireLanguage(name: string): LanguageDefinition;

    /**
     * Enables debug/development mode. This mode purposely makes Highlight.js more fragile! It should only be used for testing and local development (of languages or the library itself). By default “Safe Mode” is used, providing the most reliable experience for production usage.
     *
     * For example, if a new version suddenly had a serious bug (or breaking change) that affected only a single language:
     *
     * In Safe Mode: All other languages would continue to highlight just fine. The broken language would appear as a code block, but without any highlighting (as if it were plaintext).
     * In Debug Mode: All highlighting would stop when an error was encountered and a JavaScript error would be thrown.
     */
    function debugMode(): void;

    /**
     * Adds a plugin to the instance of highlight.js.
     */
    function addPlugin(plugin: HighlightPluginEventCallbacks): void;
  }

  export default HLJS;
}

declare module 'highlight.js/lib/languages/*';
declare module 'highlightjs-graphql';

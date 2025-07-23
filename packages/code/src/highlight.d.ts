import { HighlightResult, HLJSPlugin } from 'highlight.js';

export interface TokenObject {
  kind: string;
  children: Array<string | TokenObject>;
  sublanguage?: boolean;
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

declare class TokenTreeEmitter extends TokenTree {
  constructor(options: HighlightConfiguration);

  addKeyword(text: string, kind: string): void;
  addText(text: string): void;
  addSublanguage(emitter: any, name: string): void;
  toHTML(): string;
  finalize(): void;
}

interface HighlightAutoResult extends HighlightResult {}

export interface LeafyGreenHighlightResult
  extends Omit<HighlightResult, '_emitter'> {
  _emitter: TokenTreeEmitter;
  react: React.ReactNode;
}

export interface LeafyGreenHLJSPlugin
  extends Omit<HLJSPlugin, 'after:highlight'> {
  'after:highlight'?: (result: LeafyGreenHighlightResult) => void;
}

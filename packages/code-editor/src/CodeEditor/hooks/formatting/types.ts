/**
 * Interface defining some basic formatting options.
 */
export interface FormattingOptions {
  semi?: boolean;
  singleQuote?: boolean;
  printWidth?: number;
  trailingComma?: 'none' | 'es5' | 'all';
  bracketSpacing?: boolean;
  jsxBracketSameLine?: boolean;
  arrowParens?: 'avoid' | 'always';
  // Note: tabWidth and useTabs are derived from CodeEditor props (indentSize, indentUnit)
}

/**
 * Parameters for the code formatting function
 */
export interface FormatCodeParams {
  code: string;
  language?: string;
  options?: FormattingOptions;
  editorTabWidth: number;
  editorUseTabs: boolean;
  modules: Record<string, any>;
}

/**
 * Result of the code formatting function
 */
export interface FormatCodeResult {
  formattedCode: string;
  error?: string;
}

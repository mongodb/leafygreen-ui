import { ComponentPropsWithoutRef } from 'react';

import { Language, LineHighlightingDefinition } from '../types';

export interface SyntaxProps extends ComponentPropsWithoutRef<'code'> {
  /**
   * The children to render inside Code. This is usually going to be a formatted code block or line.
   * @required
   */
  children: string;

  /**
   * The language to highlight the syntax of.
   */
  language: Language;

  /**
   * Shows line numbers. This is specifically used for the Code component implementation.
   *
   * default: `false`
   */
  showLineNumbers?: boolean;

  /**
   * Specifies the number by which to start line numbering.
   *
   * default: `1`
   */
  lineNumberStart?: number;

  /**
   * An array of lines to highlight. The array can only contain numbers corresponding to the line numbers to highlight, and / or tuples representing a range (e.g. `[6, 10]`);
   */
  highlightLines?: LineHighlightingDefinition;

  /**
   * Custom keywords to be highlighted in the code block. The key is the keyword to be highlighted, and the value is the classname to be applied to the keyword.
   *
   * E.g. `customKeywordObject: {{ 'keyword': 'className' }}`
   */
  customKeywordObject?: Record<string, string>;
}

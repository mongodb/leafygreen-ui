import { HTMLElementProps } from '@leafygreen-ui/lib';

import { SupportedLanguages } from './languages';

export const Language = {
  ...SupportedLanguages,
  None: 'none',
} as const;

export type Language = (typeof Language)[keyof typeof Language];

export type LineHighlightingDefinition = ReadonlyArray<
  number | readonly [number, number]
>;

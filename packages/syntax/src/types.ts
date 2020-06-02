import { SupportedLanguages } from './languages';

export const Variant = {
  Light: 'light',
  Dark: 'dark',
} as const;

export type Variant = typeof Variant[keyof typeof Variant];

export const Language = {
  ...SupportedLanguages,
  None: 'none',
} as const;

export type Language = typeof Language[keyof typeof Language];

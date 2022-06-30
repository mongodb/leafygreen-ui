export const Theme = {
  Light: 'light',
  Dark: 'dark',
} as const;

export type Theme = typeof Theme[keyof typeof Theme];

export interface CommonTypographyProps {
  darkMode?: boolean;
}

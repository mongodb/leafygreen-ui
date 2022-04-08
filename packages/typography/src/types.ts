export const Mode = {
  Light: 'light',
  Dark: 'dark',
} as const;

export type Mode = typeof Mode[keyof typeof Mode];

export interface CommonTypographyProps {
  darkMode?: boolean;
}

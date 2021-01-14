export const Size = {
  Small: 'small',
  Default: 'default',
  Large: 'large',
  XLarge: 'xlarge',
} as const;

export type Size = typeof Size[keyof typeof Size];

export const sizeMap: Record<Size, number> = {
  small: 14,
  default: 16,
  large: 20,
  xlarge: 24,
} as const;

interface AccessibleFunctionParams {
  title?: string | null;
  ariaLabelledby?: string;
  ariaLabel?: string;
}

interface AccessibleFunctionReturnType {
  'aria-labelledby'?: string;
  'aria-label'?: string;
  title?: string;
  'aria-hidden'?: boolean;
}

export function generateAccessibleProps(
  role: 'img' | 'presentation',
  glyphName: string,
  { ariaLabel, ariaLabelledby, title }: AccessibleFunctionParams,
): AccessibleFunctionReturnType {
  switch (role) {
    case 'img':
      if (ariaLabelledby) {
        return { 'aria-labelledby': ariaLabelledby };
      } else if (ariaLabel) {
        return { 'aria-label': ariaLabel };
      } else if (title) {
        return { title: title };
      } else {
        return { 'aria-label': getGlyphLabel(glyphName) };
      }

    case 'presentation':
      return { 'aria-hidden': true };
  }
}

export function getGlyphLabel(name: string) {
  return `${name.replace(/([a-z])([A-Z])/g, '$1 $2')} Icon`;
}

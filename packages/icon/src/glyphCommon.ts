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

export function generateAccessibleProps(
  role: 'img' | 'presentation',
  glyphName: string,
  accessibleParams: AccessibleFunctionParams,
) {
  switch (role) {
    case 'img':
      if (accessibleParams.ariaLabelledby) {
        return { 'aria-labelledby': accessibleParams.ariaLabelledby };
      } else if (accessibleParams.ariaLabel) {
        return { 'aria-label': accessibleParams.ariaLabel };
      } else if (accessibleParams.title) {
        return { title: accessibleParams.title };
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

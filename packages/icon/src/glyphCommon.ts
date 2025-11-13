export const Size = {
  Small: 'small',
  Default: 'default',
  Large: 'large',
  XLarge: 'xlarge',
} as const;

export type Size = (typeof Size)[keyof typeof Size];

export const sizeMap: Record<Size, number> = {
  small: 14,
  default: 16,
  large: 20,
  xlarge: 24,
} as const;

interface AccessibleFunctionParams {
  'aria-labelledby'?: string;
  'aria-label'?: string;
  title?: string | null;
  titleId?: string;
}

type AccessibleFunctionReturnType =
  | { 'aria-labelledby'?: string; 'aria-label'?: string }
  | { 'aria-hidden': true; alt: '' };

export function generateAccessibleProps(
  role: 'img' | 'presentation',
  glyphName: string,
  {
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby,
    title,
    titleId,
  }: AccessibleFunctionParams,
): AccessibleFunctionReturnType {
  switch (role) {
    case 'img': {
      if (!ariaLabel && !ariaLabelledby && !title) {
        return { 'aria-label': getGlyphLabel(glyphName) };
      }

      // If there's a title, use the titleId for aria-labelledby
      // If there's already an aria-labelledby, combine them
      let labelledBy: string | undefined;

      if (title) {
        if (ariaLabelledby) {
          labelledBy = `${titleId} ${ariaLabelledby}`;
        } else {
          labelledBy = titleId;
        }
      } else {
        labelledBy = ariaLabelledby;
      }

      return {
        ['aria-labelledby']: labelledBy,
        ['aria-label']: ariaLabel,
      };
    }

    case 'presentation':
      return { 'aria-hidden': true, alt: '' };
  }
}

export function getGlyphLabel(name: string) {
  return `${name.replace(/([a-z])([A-Z])/g, '$1 $2')} Icon`;
}

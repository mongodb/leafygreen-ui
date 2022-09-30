import { palette } from '@leafygreen-ui/palette';
import { HTMLElementProps } from '@leafygreen-ui/lib';
import { css } from '@leafygreen-ui/emotion';

const SupportedColors = {
  White: 'white',
  Black: 'black',
  GreenDark2: 'green-dark-2',
  GreenBase: 'green-base',
} as const;

type SupportedColors = typeof SupportedColors[keyof typeof SupportedColors];

const SupportedColorsMap: Record<SupportedColors, string> = {
  [SupportedColors.White]: palette.white,
  [SupportedColors.Black]: palette.black,
  [SupportedColors.GreenDark2]: palette.green.dark2,
  [SupportedColors.GreenBase]: palette.green.base,
} as const;

type SupportedColorsMap =
  typeof SupportedColorsMap[keyof typeof SupportedColorsMap];

export { SupportedColors, SupportedColorsMap };

export interface LogoProps extends HTMLElementProps<'svg'> {
  /**
   * Determines Color of the Logo or LogoMark component.
   *
   * @default 40
   */
  color?: SupportedColors;

  /**
   * Determines height of the Logo or LogoMark component.
   *
   * @default 40
   */
  height?: number;
}

export type ProductLogoProps = HTMLElementProps<'svg', never> & {
  knockout?: boolean;
  size?: number;
  darkMode?: boolean;
  height?: number;
};

export const getAccessibleProps = ({
  role,
  'aria-label': ariaLabel,
}: {
  role: string;
  'aria-label': string;
}) => {
  if (role === 'img') {
    return {
      role: 'img',
      'aria-label': ariaLabel,
    };
  }

  return {
    role: 'presentation',
    alt: '',
    'aria-hidden': true,
  };
};

export const getColor = ({
  knockout,
  size,
  flat,
  gradient,
  darkMode,
}: {
  knockout: boolean;
  darkMode: boolean;
  size: number;
  flat: string;
  gradient: string;
}) => {
  let fill;

  if (!knockout) {
    if (size <= 10) {
      fill = flat;
    } else {
      fill = gradient;
    }
  } else {
    if (darkMode) {
      fill = palette.white;
    } else {
      fill = palette.black;
    }
  }

  return css`
    fill: ${fill};
  `;
};

import { uiColors } from '@leafygreen-ui/palette';
import { DarkModeProps, HTMLElementProps } from '@leafygreen-ui/lib';
import { css } from '@leafygreen-ui/emotion';

const SupportedColors = {
  White: 'white',
  Black: 'black',
  GreenDark2: 'green-dark-2',
  GreenBase: 'green-base',
} as const;

type SupportedColors = typeof SupportedColors[keyof typeof SupportedColors];

// TODO: Update to palette colors once new palette is released.
const SupportedColorsMap: Record<SupportedColors, string> = {
  [SupportedColors.White]: '#FFFFFF',
  [SupportedColors.Black]: '#06232E',
  [SupportedColors.GreenDark2]: '#00684A',
  [SupportedColors.GreenBase]: '#00ED64',
} as const;

type SupportedColorsMap =
  typeof SupportedColorsMap[keyof typeof SupportedColorsMap];

export { SupportedColors, SupportedColorsMap };

export interface LogoProps extends HTMLElementProps<'svg'> {
  /**
   * Determines Color of the Logo or LogoMark component.
   *
   * @default: 40
   */
  color?: SupportedColors;

  /**
   * Determines height of the Logo or LogoMark component.
   *
   * @default: 40
   */
  height?: number;
}

export type ProductLogoProps = HTMLElementProps<'svg', never> &
  DarkModeProps & {
    knockout?: boolean;
    size?: number;
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
      fill = uiColors.white;
    } else {
      fill = uiColors.gray.dark3;
    }
  }

  return css`
    fill: ${fill};
  `;
};

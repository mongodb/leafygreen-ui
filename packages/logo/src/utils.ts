import { uiColors } from '@leafygreen-ui/palette';
import { HTMLElementProps } from '@leafygreen-ui/lib';
import { css } from '@leafygreen-ui/emotion';

export interface LogoProps {
  /**
   * Determines whether or not the component will appear in dark mode.
   *
   * @default: `false`
   */
  darkMode?: boolean;

  /**
   * Determines if Logo or LogoMark will appear in knockout state.
   *
   * @default: `false`
   */
  knockout?: boolean;

  /**
   * Determines height of the Logo or LogoMark component.
   *
   * @default: 40
   */
  height?: number;
}

const Fill = {
  Dark: uiColors.gray.dark3,
  Light: uiColors.white,
};

type Fill = typeof Fill[keyof typeof Fill];

export { Fill };

export interface SVGLogoProps {
  fill: Fill;
  className: string;
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
  } else {
    return {
      role: 'presentation',
      alt: '',
      'aria-hidden': true,
    };
  }
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

  console.log({ fill });

  return css`
    fill: ${fill};
  `;
};

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
};

export const getColor = (
  knockout: boolean,
  size: number,
  flat: string,
  gradient: string,
) => {
  let fill;

  if (!knockout) {
    if (size <= 10) {
      fill = flat;
    } else {
      fill = gradient;
    }
  } else {
    fill = 'currentColor';
  }

  return css`
    fill: ${fill};
  `;
};

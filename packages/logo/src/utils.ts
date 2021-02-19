import { uiColors } from '@leafygreen-ui/palette';
import { HTMLElementProps } from '@leafygreen-ui/lib';
import { css } from '@leafygreen-ui/emotion';

const Product = {
  Atlas: 'atlas',
  Charts: 'charts',
  CloudManager: 'cloudManager',
  Realm: 'realm',
} as const;

type Product = typeof Product[keyof typeof Product];

const Lockup = {
  Default: 'default',
  Stacked: 'stacked',
} as const;

type Lockup = typeof Lockup[keyof typeof Lockup];

export { Product, Lockup };

export interface LogoProps extends HTMLElementProps<'svg'> {
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

  /**
   * Determines what product will be rendered with the logomark.
   * If 'none', MongoDB will appear next to the leaf.
   *
   * @default: 'none'
   */
  product?: Product | 'none';

  /**
   * Determines orientation of product name as it relates to the logo mark.
   * By default, will appear on a single line.
   *
   * @default: 'default'
   */
  lockup?: Lockup;
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

  return css`
    fill: ${fill};
  `;
};

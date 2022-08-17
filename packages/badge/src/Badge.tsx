import React from 'react';
import PropTypes from 'prop-types';
import { HTMLElementProps, Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { css, cx } from '@leafygreen-ui/emotion';
import { fontFamilies } from '@leafygreen-ui/tokens';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

export const Variant = {
  DarkGray: 'darkgray',
  LightGray: 'lightgray',
  Red: 'red',
  Yellow: 'yellow',
  Blue: 'blue',
  Green: 'green',
} as const;

export type Variant = typeof Variant[keyof typeof Variant];

export const baseStyle = css`
  font-family: ${fontFamilies.default};
  display: inline-flex;
  align-items: center;
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;
  border-radius: 5px;
  height: 18px;
  padding-left: 6px;
  padding-right: 6px;
  text-transform: uppercase;
  border: 1px solid;
  letter-spacing: 0.4px;
`;

export const badgeVariants: Record<Theme, Record<Variant, string>> = {
  [Theme.Dark]: {
    [Variant.LightGray]: css`
      background-color: ${palette.gray.dark1};
      border-color: ${palette.gray.base};
      color: ${palette.gray.light3};
    `,

    [Variant.DarkGray]: css`
      background-color: ${palette.gray.dark3};
      border-color: ${palette.gray.dark2};
      color: ${palette.gray.light2};
    `,

    [Variant.Red]: css`
      background-color: ${palette.red.dark3};
      border-color: ${palette.red.dark2};
      color: ${palette.red.light2};
    `,

    [Variant.Yellow]: css`
      background-color: ${palette.yellow.dark3};
      border-color: ${palette.yellow.dark2};
      color: ${palette.yellow.light2};
    `,

    [Variant.Blue]: css`
      background-color: ${palette.blue.dark2};
      border-color: ${palette.blue.dark1};
      color: ${palette.blue.light2};
    `,

    [Variant.Green]: css`
      background-color: ${palette.green.dark3};
      border-color: ${palette.green.dark2};
      color: ${palette.green.base};
    `,
  },
  [Theme.Light]: {
    [Variant.LightGray]: css`
      background-color: ${palette.gray.light3};
      border-color: ${palette.gray.light2};
      color: ${palette.gray.dark1};
    `,

    [Variant.DarkGray]: css`
      background-color: ${palette.gray.dark2};
      border-color: ${palette.gray.dark3};
      color: ${palette.white};
    `,

    [Variant.Red]: css`
      background-color: ${palette.red.light3};
      border-color: ${palette.red.light2};
      color: ${palette.red.dark2};
    `,

    [Variant.Yellow]: css`
      background-color: ${palette.yellow.light3};
      border-color: ${palette.yellow.light2};
      color: ${palette.yellow.dark2};
    `,

    [Variant.Blue]: css`
      background-color: ${palette.blue.light3};
      border-color: ${palette.blue.light2};
      color: ${palette.blue.dark1};
    `,

    [Variant.Green]: css`
      background-color: ${palette.green.light3};
      border-color: ${palette.green.light2};
      color: ${palette.green.dark2};
    `,
  },
} as const;

interface BadgeProps {
  /**
   * An additional className to add to the component's classList
   */
  className?: string;

  /**
   * The content to render within the badge
   */
  children?: React.ReactNode;

  /**
   * The Badge's style variant
   *
   * Default: `'lightgray'`
   */
  variant?: Variant;

  /**
   * Determines whether or not the component will be rendered in dark theme.
   *
   * @default false
   */
  darkMode?: boolean;
}

/**
 * Badges can be used to highlight information or the status of something.
 */
function Badge({
  children,
  variant = Variant.LightGray,
  className,
  darkMode: darkModeProp,
  ...rest
}: BadgeProps & HTMLElementProps<'div', never>) {
  const { theme } = useDarkMode(darkModeProp);
  return (
    <div
      {...rest}
      className={cx(baseStyle, badgeVariants[theme][variant], className)}
    >
      {children}
    </div>
  );
}

Badge.displayName = 'Badge';

Badge.propTypes = {
  darkMode: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
  variant: PropTypes.oneOf(Object.values(Variant)),
};

export default Badge;

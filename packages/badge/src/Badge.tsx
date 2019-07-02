import React from 'react';
import PropTypes from 'prop-types';
import { uiColors } from '@leafygreen-ui/palette';
import { css, cx } from '@leafygreen-ui/emotion';

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
  display: inline-flex;
  align-items: center;
  font-weight: bold;
  font-size: 11px;
  line-height: 20px;
  border-radius: 50px;
  height: 20px;
  padding-left: 9px;
  padding-right: 9px;
  text-transform: uppercase;
  border: 1px solid;
`;

export const badgeVariants: { [K in Variant]: string } = {
  [Variant.LightGray]: css`
    background-color: ${uiColors.gray.light3};
    border-color: ${uiColors.gray.light2};
    color: ${uiColors.gray.dark1};
  `,

  [Variant.DarkGray]: css`
    background-color: ${uiColors.gray.dark2};
    border-color: ${uiColors.gray.dark3};
    color: ${uiColors.white};
  `,

  [Variant.Red]: css`
    background-color: ${uiColors.red.light3};
    border-color: ${uiColors.red.light2};
    color: ${uiColors.red.dark2};
  `,

  [Variant.Yellow]: css`
    background-color: ${uiColors.yellow.light3};
    border-color: ${uiColors.yellow.light2};
    color: ${uiColors.yellow.dark2};
  `,

  [Variant.Blue]: css`
    background-color: ${uiColors.blue.light3};
    border-color: ${uiColors.blue.light2};
    color: ${uiColors.blue.dark2};
  `,

  [Variant.Green]: css`
    background-color: ${uiColors.green.light3};
    border-color: ${uiColors.green.light2};
    color: ${uiColors.green.dark2};
  `,
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
}

function Badge({
  children,
  variant = Variant.LightGray,
  className,
  ...rest
}: BadgeProps & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...rest} className={cx(baseStyle, badgeVariants[variant], className)}>
      {children}
    </div>
  );
}

Badge.displayName = 'Badge';

Badge.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  variant: PropTypes.oneOf(Object.values(Variant)),
};

export default Badge;

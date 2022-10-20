import React from 'react';
import { transparentize } from 'polished';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import Box, { BoxProps } from '@leafygreen-ui/box';
import { fontFamilies, focusRing, typeScales } from '@leafygreen-ui/tokens';
import { HTMLElementProps, Theme } from '@leafygreen-ui/lib';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

export const ContentStyle = {
  None: 'none',
  Clickable: 'clickable',
} as const;

export type ContentStyle = typeof ContentStyle[keyof typeof ContentStyle];

interface ColorSet {
  containerStyle: string;
  clickableStyle: string;
}

const lightBaseBoxShadow = `0 4px 10px -4px ${transparentize(
  0.7,
  palette.black,
)}`;
const lightHoverBoxShadow = `0 4px 20px -4px ${transparentize(
  0.8,
  palette.black,
)}`;
const lightFocusBoxShadow = focusRing.light.default;
const darkBaseBoxShadow = `0 4px 20px -4px #01121A`;
const darkHoverBoxShadow = `0 4px 20px -4px ${transparentize(0.3, '#000000')}`;
const darkFocusBoxShadow = focusRing.dark.default;

const colorSet: Record<Theme, ColorSet> = {
  [Theme.Light]: {
    containerStyle: css`
      border: 1px solid ${palette.gray.light2};
      box-shadow: ${lightBaseBoxShadow};
      background-color: ${palette.white};
      color: ${palette.gray.dark3};
    `,
    clickableStyle: css`
      cursor: pointer;

      &:focus {
        outline: none;
        box-shadow: ${lightFocusBoxShadow}, ${lightBaseBoxShadow};
      }

      &:hover,
      &:active {
        border: 1px solid ${palette.gray.light2};
        box-shadow: ${lightHoverBoxShadow};

        &:focus {
          box-shadow: ${lightFocusBoxShadow}, ${lightHoverBoxShadow};
        }
      }
    `,
  },
  [Theme.Dark]: {
    containerStyle: css`
      border: 1px solid ${palette.gray.dark2};
      box-shadow: ${darkBaseBoxShadow};
      background-color: ${palette.black};
      color: ${palette.white};
    `,
    clickableStyle: css`
      cursor: pointer;

      &:focus {
        outline: none;
        box-shadow: ${darkBaseBoxShadow}, ${darkFocusBoxShadow};
      }

      &:hover {
        box-shadow: ${darkHoverBoxShadow};

        &:focus {
          box-shadow: ${darkHoverBoxShadow}, ${darkFocusBoxShadow};
        }
      }
    `,
  },
};

const containerStyle = css`
  position: relative;
  transition: 150ms ease-in-out;
  transition-property: border, box-shadow;
  border-radius: 24px;
  font-family: ${fontFamilies.default};
  font-size: ${typeScales.body1.fontSize}px;
  line-height: ${typeScales.body1.lineHeight}px;
  padding: 24px;
  min-height: 68px; // 48px + 20px (padding + line-height)
`;

export interface CardProps extends HTMLElementProps<'div'> {
  /**
   * Determines whether the Card should be styled as clickable.
   *
   * Defaults to `'clickable'` (when a valid `onClick` handler or `href` link is provided
   *
   * @default 'clickable' | 'none'
   */
  contentStyle?: ContentStyle;

  /**
   * Determines whether or not the component will appear in dark mode.
   *
   * @default false
   */
  darkMode?: boolean;
}

/**
 * Cards are used to organize information into consumable chunks.
 */
export const Card = ({
  className,
  contentStyle,
  darkMode = false,
  ...rest
}: BoxProps<'div', CardProps>) => {
  if (
    contentStyle === undefined &&
    (('onClick' in rest && rest.onClick !== undefined) ||
      ('href' in rest && !!rest.href))
  ) {
    contentStyle = ContentStyle.Clickable;
  }

  const { theme } = useDarkMode(darkMode);

  return (
    <Box
      // @ts-expect-error
      className={cx(
        containerStyle,
        colorSet[theme].containerStyle,
        {
          [colorSet[theme].clickableStyle]:
            contentStyle === ContentStyle.Clickable,
        },
        className,
      )}
      {...rest}
    />
  );
};

Card.displayName = 'Card';

Card.propTypes = {
  className: PropTypes.string,
};

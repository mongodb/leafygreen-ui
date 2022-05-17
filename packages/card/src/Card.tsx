import React from 'react';
import { transparentize } from 'polished';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { palette, uiColors } from '@leafygreen-ui/palette';
import Box, { BoxProps, ExtendableBox } from '@leafygreen-ui/box';
import { fontFamilies } from '@leafygreen-ui/tokens';
import { DarkModeProps } from '@leafygreen-ui/lib';

export const ContentStyle = {
  None: 'none',
  Clickable: 'clickable',
} as const;

export type ContentStyle = typeof ContentStyle[keyof typeof ContentStyle];

const Mode = {
  Dark: 'dark',
  Light: 'light',
} as const;

type Mode = typeof Mode[keyof typeof Mode];

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
const lightFocusBoxShadow = `
  0 0 0 2px ${palette.white},
  0 0 0 4px ${palette.blue.light1}
`;
const darkBaseBoxShadow = `0 4px 20px -4px  ${transparentize(0.3, '#000')}`;
const darkHoverBoxShadow = `0 2px 12px -2px ${transparentize(0.1, '#000')}`;
const darkFocusBoxShadow = `0 0 0 3px ${uiColors.focus}`;

const colorSet: Record<Mode, ColorSet> = {
  [Mode.Light]: {
    containerStyle: css`
      border: 1px solid ${palette.gray.light2};
      box-shadow: ${lightBaseBoxShadow};
      background-color: white;
      color: ${palette.gray.dark3};
      // TODO: Refresh - remove properties from mode logic
      border-radius: 24px;
      font-family: ${fontFamilies.default};
      font-size: 13px;
      line-height: 20px;
      padding: 24px;
      min-height: 68px; // 48px + 20px (padding + line-height)
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
  [Mode.Dark]: {
    containerStyle: css`
      border: 1px solid ${uiColors.gray.dark2};
      box-shadow: ${darkBaseBoxShadow};
      background-color: ${uiColors.gray.dark2};
      color: ${uiColors.white};
      // TODO: Refresh - remove properties from dark mode logic
      border-radius: 7px;
      font-family: ${fontFamilies.legacy};
      padding: 16px;
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
`;

export interface CardProps extends DarkModeProps {
  className?: string;
  contentStyle?: ContentStyle;
}

const Card: ExtendableBox<CardProps> = ({
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

  const mode = darkMode ? Mode.Dark : Mode.Light;

  return (
    <Box
      // @ts-expect-error
      className={cx(
        containerStyle,
        colorSet[mode].containerStyle,
        {
          [colorSet[mode].clickableStyle]:
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

export default Card;

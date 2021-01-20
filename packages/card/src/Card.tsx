import React from 'react';
import { transparentize } from 'polished';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import Box, { BoxProps, ExtendableBox } from '@leafygreen-ui/box';

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
  uiColors.black,
)}`;
const darkBaseBoxShadow = `0 4px 20px -4px  ${transparentize(0.3, '#000')}`;
const lightHoverBoxShadow = `0 2px 6px -2px ${transparentize(
  0.4,
  uiColors.black,
)}`;
const darkHoverBoxShadow = `0 2px 12px -2px ${transparentize(0.1, '#000')}`;
const focusBoxShadow = `0 0 0 3px ${uiColors.blue.light1}`;

const colorSet: Record<Mode, ColorSet> = {
  [Mode.Light]: {
    containerStyle: css`
      border: 1px solid ${uiColors.gray.light2};
      box-shadow: 0 4px 10px -4px ${transparentize(0.7, uiColors.black)};
      background-color: white;
    `,
    clickableStyle: css`
      cursor: pointer;

      &:focus {
        outline: none;
        box-shadow: ${lightBaseBoxShadow}, ${focusBoxShadow};
      }

      &:hover {
        border: 1px solid ${uiColors.gray.light2};
        box-shadow: ${lightHoverBoxShadow};

        &:focus {
          box-shadow: ${lightHoverBoxShadow}, ${focusBoxShadow};
        }
      }
    `,
  },
  [Mode.Dark]: {
    containerStyle: css`
      border: 1px solid ${uiColors.gray.dark2};
      box-shadow: ${darkBaseBoxShadow};
      background-color: ${uiColors.gray.dark2};
    `,
    clickableStyle: css`
      cursor: pointer;

      &:focus {
        outline: none;
        box-shadow: ${darkBaseBoxShadow}, ${focusBoxShadow};
      }

      &:hover {
        // border: 1px solid ${uiColors.gray.dark2};
        box-shadow: ${darkHoverBoxShadow};

        &:focus {
          box-shadow: ${darkHoverBoxShadow}, ${focusBoxShadow};
        }
      }
    `,
  },
};

const containerStyle = css`
  position: relative;
  border-radius: 7px;
  transition: border 300ms ease-in-out, box-shadow 300ms ease-in-out;
`;

interface CardProps {
  className?: string;
  contentStyle?: ContentStyle;
  darkMode?: boolean;
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

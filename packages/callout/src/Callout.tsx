import React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import BulbIcon from '@leafygreen-ui/icon/dist/Bulb';
import ImportantWithCircleIcon from '@leafygreen-ui/icon/dist/ImportantWithCircle';
import InfoWithCircleIcon from '@leafygreen-ui/icon/dist/InfoWithCircle';
import WarningIcon from '@leafygreen-ui/icon/dist/Warning';
import BeakerIcon from '@leafygreen-ui/icon/dist/Beaker';
import { Overline, Subtitle } from '@leafygreen-ui/typography';
import { BaseFontSize } from '@leafygreen-ui/tokens';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

export const Variant = {
  Note: 'note',
  Tip: 'tip',
  Important: 'important',
  Warning: 'warning',
  Example: 'example',
} as const;

export type Variant = typeof Variant[keyof typeof Variant];

const baseStyle = css`
  font-family: Euclid Circular A, ‘Helvetica Neue’, Helvetica, Arial, sans-serif; // TODO: Refresh – update to fontFamilies.default
  background-color: ${palette.white};
  border-radius: 16px;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    width: 16px;
    left: -2px;
    top: -2px;
    bottom: -2px;
    border-radius: 16px 0px 0px 16px;
  }
`;

const headerStyle = css`
  padding: 12px 24px 12px 52px;
  position: relative;
  text-transform: uppercase;
  width: 100%;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
`;

const headerIconStyle = css`
  left: 20px;
  position: absolute;
`;

const titleStyle = css`
  font-weight: 600;
  letter-spacing: inherit;
  color: inherit;
`;

const bodyStyle = css`
  display: flex;
  flex-direction: column;
  padding: 16px 24px 16px 52px;
  font-weight: 400;
`;

const fontSet = {
  [13]: css`
    font-size: 13px;
    line-height: 20px;
  `,
  [16]: css`
    font-size: 16px;
    line-height: 28px;
  `,
};

export const headerLabels = {
  [Variant.Note]: 'Note',
  [Variant.Tip]: 'Tip',
  [Variant.Important]: 'Important',
  [Variant.Warning]: 'Warning',
  [Variant.Example]: 'Example',
} as const;

export const headerIcons = {
  [Variant.Note]: InfoWithCircleIcon,
  [Variant.Tip]: BulbIcon,
  [Variant.Important]: ImportantWithCircleIcon,
  [Variant.Warning]: WarningIcon,
  [Variant.Example]: BeakerIcon,
} as const;

export const colorSets: Record<Variant, ColorSet> = {
  [Variant.Note]: {
    header: {
      background: palette.blue.light3,
      text: palette.blue.dark1,
    },
    text: palette.blue.dark3,
    bar: palette.blue.base,
    icon: palette.blue.base,
    border: palette.blue.light2,
  },
  [Variant.Tip]: {
    header: {
      background: palette.purple.light3,
      text: palette.purple.dark2,
    },
    text: palette.purple.dark3,
    bar: palette.purple.base,
    icon: palette.purple.base,
    border: palette.purple.light2,
  },
  [Variant.Important]: {
    header: {
      background: palette.yellow.light3,
      text: palette.yellow.dark2,
    },
    text: palette.yellow.dark3,
    bar: palette.yellow.base,
    icon: palette.yellow.dark2,
    border: palette.yellow.light2,
  },
  [Variant.Warning]: {
    header: {
      background: palette.red.light3,
      text: palette.red.dark2,
    },
    text: palette.red.dark3,
    bar: palette.red.base,
    icon: palette.red.base,
    border: palette.red.light2,
  },
  [Variant.Example]: {
    header: {
      background: palette.gray.light2,
      text: palette.gray.dark2,
    },
    text: palette.gray.dark3,
    bar: palette.gray.dark1,
    icon: palette.gray.dark3,
    border: palette.gray.light1,
  },
};

interface ColorSet {
  header: {
    background: string;
    text: string;
  };
  text: string;
  bar: string;
  icon: string;
  border: string;
}

export interface CalloutProps {
  /**
   * The title text rendered above children.
   */
  title?: string;
  children: React.ReactNode;
  className?: string;
  /**
   * The variant of the callout that defines the icon and colors used.
   */
  variant: Variant;
  // TODO: Make sure this prop generates a Storybook control.
  /**
   * The base font size of the title and text rendered in children.
   */
  baseFontSize?: BaseFontSize;
  /**
   * Determines whether or not the component will be rendered in dark mode.
   *
   * default: `false`
   */
  darkMode?: boolean;
}

/**
 * Callouts should be used when you want to call out information to the user. Unlike banners, callouts cannot be dismissed. They’re optimized for long form copy (banners are optimized to save space).
 */
function Callout({
  variant,
  title,
  baseFontSize = 13,
  className,
  children: contents,
  darkMode: darkModeProp
}: CalloutProps) {
  const { theme } = useDarkMode(darkModeProp);
  const colorSet = colorSets[variant];
  const Icon = headerIcons[variant];

  return (
    <div
      role="note"
      className={cx(
        baseStyle,
        css`
          color: ${colorSet.text};
          border: 2px solid ${colorSet.border};
          box-shadow: inset 0px 2px 0px 0px ${colorSet.header.background}; // hides gap between the border and the header div when zoomed in.

          &:after {
            background: linear-gradient(
              to left,
              transparent 9px,
              ${colorSet.bar} 9px
            );
          }
        `,
        className,
      )}
    >
      <div
        className={cx(
          headerStyle,
          css`
            background-color: ${colorSet.header.background};
            color: ${colorSet.header.text};
          `,
        )}
      >
        <Icon
          fill={colorSet.icon}
          className={headerIconStyle}
          role="presentation"
        />
        <Overline
          as="h2"
          className={cx(
            css`
              color: inherit;
              letter-spacing: 0.6px;
            `,
          )}
        >
          {headerLabels[variant]}
        </Overline>
      </div>
      <div className={bodyStyle}>
        {title && (
          <Subtitle as="h3" className={cx(titleStyle, fontSet[baseFontSize])}>
            {title}
          </Subtitle>
        )}
        <div className={fontSet[baseFontSize]}>{contents}</div>
      </div>
    </div>
  );
}

Callout.propTypes = {
  variant: PropTypes.oneOf(Object.values(Variant)).isRequired,
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  baseFontSize: PropTypes.oneOf(Object.values(BaseFontSize)),
};

export default Callout;

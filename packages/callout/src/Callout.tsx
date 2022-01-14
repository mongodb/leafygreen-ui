import React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import BulbIcon from '@leafygreen-ui/icon/dist/Bulb';
import ImportantWithCircleIcon from '@leafygreen-ui/icon/dist/ImportantWithCircle';
import InfoWithCircleIcon from '@leafygreen-ui/icon/dist/InfoWithCircle';
import WarningIcon from '@leafygreen-ui/icon/dist/Warning';
import BeakerIcon from '@leafygreen-ui/icon/dist/Beaker';

export const Variant = {
  Note: 'note',
  Tip: 'tip',
  Important: 'important',
  Warning: 'warning',
  Example: 'example',
} as const;

export type Variant = typeof Variant[keyof typeof Variant];

const baseStyle = css`
  font-family: Euclid, ‘Helvetica Neue’, Helvetica, Arial, sans-serif;
  background-color: ${palette.white};
  border-radius: 12px;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    width: 13px;
    left: -1px;
    top: -1px;
    bottom: -1px;
    border-radius: 12px 0px 0px 12px;
  }
`;

const headerStyle = css`
  font-size: 12px;
  font-weight: bold;
  letter-spacing: 1px;
  line-height: 16px;
  padding: 12px 24px 12px 54px;
  position: relative;
  text-transform: uppercase;
  width: 100%;
  border-top-left-radius: 12px;
  border-top-right-radius: 11px;
`;

const headerIconStyle = css`
  left: 20px;
  position: absolute;
`;

const titleStyle = css`
  font-weight: bold;
`;

const bodyStyle = css`
  display: flex;
  flex-direction: column;
  padding: 16px 24px 16px 54px;
`;

const fontSet = {
  [13]: css`
    font-size: 13px;
    line-height: 20px;
  `,
  [16]: css`
    font-size: 16px;
    line-height: 24px;
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

interface CalloutProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  variant: Variant;
  baseFontSize?: 13 | 16;
}

function Callout({
  variant,
  title,
  baseFontSize = 13,
  className,
  children: contents,
}: CalloutProps) {
  const colorSet = colorSets[variant];
  const Icon = headerIcons[variant];

  return (
    <div
      role="note"
      className={cx(
        baseStyle,
        css`
          color: ${colorSet.text};
          border: 1px solid ${colorSet.border};

          &:after {
            background: linear-gradient(
              to left,
              transparent 5px,
              ${colorSet.bar} 6px
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
        {headerLabels[variant]}
      </div>
      <div className={bodyStyle}>
        {title && (
          <div className={cx(titleStyle, fontSet[baseFontSize])}>{title}</div>
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
};

export default Callout;

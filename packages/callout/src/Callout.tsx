import React from 'react';
import PropTypes from 'prop-types';
import { transparentize } from 'polished';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { useBaseFontSize } from '@leafygreen-ui/leafygreen-provider';
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
  border-radius: 6px;
  box-shadow: 0px 2px 5px 0 ${transparentize(0.9, uiColors.gray.dark3)};
  overflow: hidden;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    width: 4px;
    left: 0px;
    top: -1px;
    bottom: -1px;
    border-radius: 6px 0px 0px 6px;
  }
`;

const headerStyle = css`
  font-family: Akzidenz, ‘Helvetica Neue’, Helvetica, Arial, sans-serif;
  font-size: 12px;
  font-weight: bold;
  letter-spacing: 0.8px;
  line-height: 16px;
  padding: 12px 24px 12px 52px;
  position: relative;
  text-transform: uppercase;
  width: 100%;
`;

const headerIconStyle = css`
  left: 20px;
  position: absolute;
`;

const titleStyle = css`
  font-weight: bold;
  margin-bottom: 6px;
  line-height: 1;
`;

const bodyStyle = css`
  display: flex;
  flex-direction: column;
  padding: 18px 24px 18px 52px;
`;

const fontSet = {
  [14]: css`
    font-size: 14px;
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
      background: uiColors.blue.light3,
      text: uiColors.blue.dark2,
    },
    text: uiColors.blue.dark3,
    bar: uiColors.blue.base,
    icon: uiColors.blue.base,
  },
  [Variant.Tip]: {
    header: {
      background: '#F3F2FC', // purple light3
      text: '#5A59C6', // purple base
    },
    text: '#2C3A64', // purple dark3
    bar: '#5A59C6', // purple base
    icon: '#5A59C6', // purple base
  },
  [Variant.Important]: {
    header: {
      background: uiColors.yellow.light3,
      text: uiColors.yellow.dark2,
    },
    text: uiColors.yellow.dark3,
    bar: uiColors.yellow.base,
    icon: uiColors.yellow.dark2,
  },
  [Variant.Warning]: {
    header: {
      background: uiColors.red.light3,
      text: uiColors.red.dark2,
    },
    text: uiColors.red.dark3,
    bar: uiColors.red.base,
    icon: uiColors.red.base,
  },
  [Variant.Example]: {
    header: {
      background: uiColors.gray.light2,
      text: uiColors.gray.dark2,
    },
    text: uiColors.gray.dark3,
    bar: uiColors.gray.dark1,
    icon: uiColors.gray.dark2,
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
}

interface CalloutProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  variant: Variant;
  baseFontSize?: 14 | 16;
}

function Callout({
  variant,
  title,
  baseFontSize,
  className,
  children: contents,
}: CalloutProps) {
  const providerFontSize = useBaseFontSize();
  const normalizedProviderFontSize =
    providerFontSize === 14 || providerFontSize === 16 ? providerFontSize : 14;
  const fontSize = baseFontSize ?? normalizedProviderFontSize;

  const colorSet = colorSets[variant];
  const Icon = headerIcons[variant];

  return (
    <div
      role="note"
      className={cx(
        baseStyle,
        css`
          color: ${colorSet.text};

          &:after {
            background-color: ${colorSet.bar};
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
        <Icon fill={colorSet.icon} className={headerIconStyle} />
        {headerLabels[variant]}
      </div>
      <div className={bodyStyle}>
        {title && (
          <div className={cx(titleStyle, fontSet[fontSize])}>{title}</div>
        )}
        <div className={fontSet[fontSize]}>{contents}</div>
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

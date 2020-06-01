import React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import Icon, { glyphs } from '@leafygreen-ui/icon';

export const Variant = {
  Note: 'note',
  Tip: 'tip',
  Important: 'important',
  Warning: 'warning',
} as const;

export type Variant = typeof Variant[keyof typeof Variant];

const baseStyle = css`
  border-radius: 6px;
  box-shadow: 0px 2px 5px 0 ${uiColors.gray.light2};
  display: flex;
  overflow: hidden;
  width: 700px;

  &:before {
    content: '';
    position: relative;
    width: 6px;
    left: 0px;
    border-radius: 6px 0px 0px 6px;
  }
`;

const headerStyle = css`
  display: flex;
  font-family: Akzidenz, ‘Helvetica Neue’, Helvetica, Arial, sans-serif;
  font-size: 12px;
  font-weight: bold;
  letter-spacing: 0.8px;
  line-height: 16px;
  padding: 12px 24px 12px 52px;
  text-transform: uppercase;
`;

const headerIconStyle = css`
  margin-left: -32px;
  position: absolute;
`;

const titleStyle = css`
  font-weight: bold;
  margin: 8px 0;
`;

const bodyStyle = css`
  display: flex;
  flex-direction: column;
  padding: 16px 24px 20px 52px;
`;

const bodyTextStyle = css`
  font-size: 14px;
  line-height: 20px;
`;

export const headerLabels = {
  [Variant.Note]: 'Note',
  [Variant.Tip]: 'Tip',
  [Variant.Important]: 'Important',
  [Variant.Warning]: 'Warning',
};

export const headerIcons: Record<Variant, keyof typeof glyphs> = {
  [Variant.Note]: 'Edit',
  [Variant.Tip]: 'Bulb',
  [Variant.Important]: 'InfoWithCircle',
  [Variant.Warning]: 'Warning',
};

export const colorSets: Record<Variant, ColorSet> = {
  [Variant.Note]: {
    background: uiColors.blue.light3,
    foreground: uiColors.blue.dark2,
    text: uiColors.blue.dark3,
  },
  [Variant.Tip]: {
    background: '#F3F2FC', // purple light3
    foreground: '#5A59C6', // purple dark2
    text: '#2C3A64', // purple dark3
  },
  [Variant.Important]: {
    background: uiColors.yellow.light3,
    foreground: uiColors.yellow.dark2,
    text: uiColors.yellow.dark3,
  },
  [Variant.Warning]: {
    background: uiColors.red.light3,
    foreground: uiColors.red.dark2,
    text: uiColors.red.dark3,
  },
};

interface ColorSet {
  background: string;
  foreground: string;
  text: string;
}

export interface CustomCalloutProps {
  colorSet: ColorSet;
  headerIcon?: keyof typeof glyphs;
  headerLabel: string;
  title?: string;
  children: string;
  className?: string;
}

interface CalloutProps
  extends Omit<CustomCalloutProps, 'colorSet' | 'headerLabel' | 'headerIcon'> {
  variant: Variant;
}

function CustomCallout({
  colorSet,
  headerIcon,
  headerLabel,
  title,
  children: contents,
  className,
}: CustomCalloutProps) {
  const header = (
    <div
      className={cx(
        headerStyle,
        css`
          background-color: ${colorSet.background};
          color: ${colorSet.foreground};
        `,
      )}
    >
      {headerIcon && (
        <Icon
          glyph={headerIcon}
          fill={colorSet.foreground}
          className={cx(headerIconStyle)}
        />
      )}
      <div>{headerLabel}</div>
    </div>
  );

  return (
    <div
      className={cx(
        baseStyle,
        css`
          color: ${colorSet.text};

          &:before {
            background-color: ${colorSet.foreground};
          }
        `,
        className,
      )}
    >
      <div>
        {header}
        <div className={cx(bodyStyle)}>
          {title && <div className={cx(titleStyle)}>{title}</div>}
          <div className={cx(bodyTextStyle)}>{contents}</div>
        </div>
      </div>
    </div>
  );
}

CustomCallout.propTypes = {
  colorSet: PropTypes.shape({
    foreground: PropTypes.string.isRequired,
    background: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  headerIcon: PropTypes.oneOf(Object.keys(glyphs)),
  headerLabel: PropTypes.string.isRequired,
  title: PropTypes.string,
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
};

function Callout({
  variant,
  title,
  children: contents,
  className,
}: CalloutProps) {
  return (
    <CustomCallout
      colorSet={colorSets[variant]}
      headerIcon={headerIcons[variant]}
      headerLabel={headerLabels[variant]}
      title={title}
      className={className}
    >
      {contents}
    </CustomCallout>
  );
}

Callout.propTypes = {
  variant: PropTypes.oneOf(Object.values(Variant)).isRequired,
  title: PropTypes.string,
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Callout;
export { CustomCallout };

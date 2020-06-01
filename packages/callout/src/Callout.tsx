import React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import BulbIcon from '@leafygreen-ui/icon/dist/Bulb';
import EditIcon from '@leafygreen-ui/icon/dist/Edit';
import InfoWithCircleIcon from '@leafygreen-ui/icon/dist/InfoWithCircle';
import WarningIcon from '@leafygreen-ui/icon/dist/Warning';
import { LGGlyph } from '@leafygreen-ui/icon/dist/types';

export const Variant = {
  Note: 'note',
  Tip: 'tip',
  Important: 'important',
  Warning: 'warning',
} as const;

export type Variant = typeof Variant[keyof typeof Variant];

const baseStyle = css`
  border-radius: 6px;
  box-shadow: 0px 2px 5px 0 ${uiColors.gray.dark1};
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
  margin-bottom: 8px;
  margin-top: 8px;
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
} as const;

export const headerIcons = {
  [Variant.Note]: <EditIcon />,
  [Variant.Tip]: <BulbIcon />,
  [Variant.Important]: <InfoWithCircleIcon />,
  [Variant.Warning]: <WarningIcon />,
} as const;

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
  headerIcon?: React.ReactElement<LGGlyph.ComponentProps>;
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
  headerIcon =
    headerIcon &&
    React.cloneElement(headerIcon, {
      fill: colorSet.foreground,
      className: headerIconStyle,
    });

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
      {headerIcon}
      {headerLabel}
    </div>
  );

  return (
    <div
      role="note"
      className={cx(
        baseStyle,
        css`
          color: ${colorSet.text};

          &:after {
            background-color: ${colorSet.foreground};
          }
        `,
        className,
      )}
    >
      {header}
      <div className={bodyStyle}>
        {title && <div className={titleStyle}>{title}</div>}
        <div className={bodyTextStyle}>{contents}</div>
      </div>
    </div>
  );
}

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

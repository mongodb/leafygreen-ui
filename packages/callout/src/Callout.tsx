import React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import BulbIcon from '@leafygreen-ui/icon/dist/Bulb';
import ImportantWithCircleIcon from '@leafygreen-ui/icon/dist/ImportantWithCircle';
import InfoWithCircleIcon from '@leafygreen-ui/icon/dist/InfoWithCircle';
import WarningIcon from '@leafygreen-ui/icon/dist/Warning';
import BeakerIcon from '@leafygreen-ui/icon/dist/Beaker';
import {
  bodyTypeScaleStyles,
  Overline,
  Subtitle,
  useUpdatedBaseFontSize,
} from '@leafygreen-ui/typography';
import { BaseFontSize, fontFamilies } from '@leafygreen-ui/tokens';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Theme } from '@leafygreen-ui/lib';

export const Variant = {
  Note: 'note',
  Tip: 'tip',
  Important: 'important',
  Warning: 'warning',
  Example: 'example',
} as const;

export type Variant = typeof Variant[keyof typeof Variant];

const baseStyle = css`
  font-family: ${fontFamilies.default};
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

const baseThemeStyles: Record<Theme, string> = {
  [Theme.Dark]: css`
    background-color: ${palette.gray.dark4};
  `,
  [Theme.Light]: css`
    background-color: ${palette.white};
  `,
};

const headerStyle = css`
  padding: 12px 24px 12px 52px;
  position: relative;
  text-transform: uppercase;
  width: 100%;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
`;

const headerIconStyle = css`
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
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

export const headerLabels: Record<Variant, string> = {
  [Variant.Note]: 'Note',
  [Variant.Tip]: 'Tip',
  [Variant.Important]: 'Important',
  [Variant.Warning]: 'Warning',
  [Variant.Example]: 'Example',
} as const;

export const headerIcons: Record<Variant, React.ComponentType<any>> = {
  [Variant.Note]: InfoWithCircleIcon,
  [Variant.Tip]: BulbIcon,
  [Variant.Important]: ImportantWithCircleIcon,
  [Variant.Warning]: WarningIcon,
  [Variant.Example]: BeakerIcon,
} as const;

interface ColorSet {
  header: {
    background: string;
    text: string;
  };
  text: string;
  bar: string;
  icon: string;
  border: string;
  link: {
    color: string;
    hoverColor: string;
  };
}

export const colorSets: Record<Theme, Record<Variant, ColorSet>> = {
  [Theme.Dark]: {
    [Variant.Note]: {
      header: {
        background: palette.blue.dark3,
        text: palette.blue.light2,
      },
      text: palette.blue.light3,
      bar: palette.blue.dark1,
      icon: palette.blue.light1,
      border: palette.blue.dark1,
      link: {
        color: palette.blue.light2,
        hoverColor: palette.blue.light3,
      },
    },
    [Variant.Tip]: {
      header: {
        background: palette.purple.dark3,
        text: palette.purple.light2,
      },
      text: palette.purple.light2,
      bar: palette.purple.dark2,
      icon: palette.purple.base,
      border: palette.purple.dark2,
      link: {
        color: palette.purple.light2,
        hoverColor: palette.purple.light3,
      },
    },
    [Variant.Important]: {
      header: {
        background: palette.yellow.dark3,
        text: palette.yellow.light2,
      },
      text: palette.yellow.light3,
      bar: palette.yellow.dark2,
      icon: palette.yellow.base,
      border: palette.yellow.dark2,
      link: {
        color: palette.yellow.light2,
        hoverColor: palette.yellow.light3,
      },
    },
    [Variant.Warning]: {
      header: {
        background: palette.red.dark3,
        text: palette.red.light2,
      },
      text: palette.red.light3,
      bar: palette.red.dark2,
      icon: palette.red.light1,
      border: palette.red.dark2,
      link: {
        color: palette.red.light2,
        hoverColor: palette.red.light3,
      },
    },
    [Variant.Example]: {
      header: {
        background: palette.gray.dark3,
        text: palette.gray.light2,
      },
      text: palette.gray.light3,
      bar: palette.gray.dark1,
      icon: palette.gray.base,
      border: palette.gray.dark1,
      link: {
        color: palette.gray.light2,
        hoverColor: palette.gray.light3,
      },
    },
  },
  [Theme.Light]: {
    [Variant.Note]: {
      header: {
        background: palette.blue.light3,
        text: palette.blue.dark1,
      },
      text: palette.blue.dark3,
      bar: palette.blue.base,
      icon: palette.blue.base,
      border: palette.blue.light2,
      link: {
        color: palette.blue.dark3,
        hoverColor: palette.blue.dark2,
      },
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
      link: {
        color: palette.purple.dark3,
        hoverColor: palette.purple.dark2,
      },
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
      link: {
        color: palette.yellow.dark3,
        hoverColor: palette.yellow.dark2,
      },
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
      link: {
        color: palette.red.dark3,
        hoverColor: palette.red.dark2,
      },
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
      link: {
        color: palette.gray.dark3,
        hoverColor: palette.gray.dark2,
      },
    },
  },
};

const contentStyles = css`
  a {
    font-size: inherit;
    line-height: inherit;
    font-weight: 700;
    text-decoration: underline;
    text-underline-offset: 3px;
    text-decoration-thickness: 2px;
    border-radius: 2px;

    &:hover,
    &:focus,
    &:focus-visible {
      outline: none;
      span {
        &::after {
          display: none;
        }
      }
    }
    &:focus-visible {
      position: relative;
    }
  }
`;

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
   */
  darkMode?: boolean;
}

/**
 * Callouts should be used when you want to call out information to the user. Unlike banners, callouts cannot be dismissed. They’re optimized for long form copy (banners are optimized to save space).
 */
function Callout({
  variant,
  title,
  baseFontSize: baseFontSizeProp,
  className,
  children: contents,
  darkMode: darkModeProp,
}: CalloutProps) {
  const { theme } = useDarkMode(darkModeProp);
  const baseFontSize = useUpdatedBaseFontSize(baseFontSizeProp);
  const colorSet = colorSets[theme][variant];
  const Icon = headerIcons[variant];

  return (
    <div
      role="note"
      className={cx(
        baseStyle,
        baseThemeStyles[theme],
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
          <Subtitle
            as="h3"
            className={cx(titleStyle, bodyTypeScaleStyles[baseFontSize])}
          >
            {title}
          </Subtitle>
        )}
        <div
          className={cx(
            bodyTypeScaleStyles[baseFontSize],
            contentStyles,
            css`
              a {
                color: ${colorSet.link.color};
                &:hover {
                  color: ${colorSet.link.hoverColor};
                }
              }
            `,
            {
              [css`
                a {
                  &:focus-visible {
                    box-shadow: 0 0 0 3px ${palette.gray.dark4},
                      0 0 0 5px ${palette.blue.light1};
                  }
                }
              `]: theme === Theme.Dark,
              [css`
                a {
                  &:focus-visible {
                    box-shadow: 0 0 0 3px ${palette.white},
                      0 0 0 5px ${palette.blue.light1};
                  }
                }
              `]: theme === Theme.Light,
            },
          )}
        >
          {contents}
        </div>
      </div>
    </div>
  );
}

Callout.propTypes = {
  darkMode: PropTypes.bool,
  variant: PropTypes.oneOf(Object.values(Variant)).isRequired,
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  baseFontSize: PropTypes.oneOf(Object.values(BaseFontSize)),
};

export default Callout;

import React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import {
  bodyTypeScaleStyles,
  Overline,
  Subtitle,
  useUpdatedBaseFontSize,
} from '@leafygreen-ui/typography';
import { BaseFontSize } from '@leafygreen-ui/tokens';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Theme } from '@leafygreen-ui/lib';
import { Variant } from './types';
import {
  colorSets,
  headerIcons,
  baseStyle,
  baseThemeStyles,
  headerStyle,
  headerIconStyle,
  headerLabels,
  bodyStyle,
  titleStyle,
  contentStyles,
} from './styles';

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

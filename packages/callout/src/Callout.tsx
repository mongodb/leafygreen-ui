import React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import {
  bodyTypeScaleStyles,
  Overline,
  Subtitle,
  useUpdatedBaseFontSize,
  anchorClassName,
} from '@leafygreen-ui/typography';
import { BaseFontSize } from '@leafygreen-ui/tokens';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { CalloutProps, Variant } from './types';
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
  focusThemeStyles,
} from './styles';

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
              .${anchorClassName}, a {
                color: ${colorSet.link.color};
                &:hover {
                  color: ${colorSet.link.hoverColor};
                }
              }
            `,
            focusThemeStyles[theme],
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

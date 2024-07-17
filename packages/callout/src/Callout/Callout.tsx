import React from 'react';
import PropTypes from 'prop-types';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { BaseFontSize } from '@leafygreen-ui/tokens';
import {
  bodyTypeScaleStyles,
  Overline,
  Subtitle,
  useUpdatedBaseFontSize,
} from '@leafygreen-ui/typography';

import {
  bodyStyle,
  getBaseStyles,
  getHeaderStyles,
  headerLabels,
  overlineStyles,
  titleStyle,
} from './styles';
import { CalloutProps, Variant } from './types';

/**
 * Callouts should be used when you want to call out information to the user. Unlike banners, callouts cannot be dismissed. They’re optimized for long form copy (banners are optimized to save space).
 */
function Callout({
  variant = Variant.Note,
  title,
  baseFontSize: baseFontSizeProp,
  className,
  children: contents,
  darkMode: darkModeProp,
  ...rest
}: CalloutProps) {
  const { theme } = useDarkMode(darkModeProp);
  const baseFontSize = useUpdatedBaseFontSize(baseFontSizeProp);

  return (
    <div
      role="note"
      className={cx(getBaseStyles(theme, variant), className)}
      {...rest}
    >
      <div className={cx(getHeaderStyles(theme, variant))}>
        <Overline as="h2" className={overlineStyles}>
          {headerLabels[variant]}
        </Overline>
      </div>
      <div className={bodyStyle}>
        <div className={bodyTypeScaleStyles[baseFontSize]}>
          {title && (
            <Subtitle
              className={cx(titleStyle, bodyTypeScaleStyles[baseFontSize])}
            >
              {title}{' '}
            </Subtitle>
          )}
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

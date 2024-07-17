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

import { getBaseStyles, getHeaderStyles, headerLabels } from './styles';
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
      <Overline as="h2" className={getHeaderStyles(theme, variant)}>
        {headerLabels[variant]}
      </Overline>
      {title && (
        <Subtitle as="h3" className={bodyTypeScaleStyles[baseFontSize]}>
          {title}{' '}
        </Subtitle>
      )}
      <div className={bodyTypeScaleStyles[baseFontSize]}>{contents}</div>
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

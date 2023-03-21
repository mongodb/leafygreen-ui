import React from 'react';
import PropTypes from 'prop-types';

import { css, cx } from '@leafygreen-ui/emotion';
import Icon from '@leafygreen-ui/icon';
import IconButton from '@leafygreen-ui/icon-button';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { iconButtonStyles, iconFills } from './ToggleExpandedIcon.styles';
import { type ToggleExpandedIconProps } from './ToggleExpandedIcon.types';

const ToggleExpandedIcon = ({
  isExpanded,
  toggleExpanded,
  disabled,
  ...rest
}: ToggleExpandedIconProps) => {
  const { theme } = useDarkMode();

  return (
    <IconButton
      aria-label={`${isExpanded ? "Collapse" : "Expand"} row`}
      onClick={toggleExpanded}
      className={cx(iconButtonStyles, {
        [css`
          transform: rotate(-180deg);
        `]: isExpanded
      })}
      {...rest}
    >
      <Icon glyph="ChevronDown" role="presentation" fill={iconFills(theme, !!disabled)} />
    </IconButton>
  )
};

ToggleExpandedIcon.propTypes = {
  disabled: PropTypes.bool,
  toggleExpanded: PropTypes.any.isRequired,
  isExpanded: PropTypes.bool.isRequired,
};

export default ToggleExpandedIcon;

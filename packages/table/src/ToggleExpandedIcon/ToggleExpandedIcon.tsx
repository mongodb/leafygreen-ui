import React from 'react';
import PropTypes from 'prop-types';

import Icon from '@leafygreen-ui/icon';
import IconButton from '@leafygreen-ui/icon-button';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { iconButtonStyles, iconFills } from './ToggleExpandedIcon.styles';
import ToggleExpandedIconProps from './ToggleExpandedIcon.types';

const ToggleExpandedIcon = ({
  isExpanded,
  toggleExpanded,
  disabled,
  ...rest
}: ToggleExpandedIconProps) => {
  const { theme } = useDarkMode();
  return !isExpanded ? (
    <IconButton
      aria-label="expand row"
      onClick={toggleExpanded}
      className={iconButtonStyles}
      {...rest}
    >
      <Icon glyph="ChevronDown" fill={iconFills(theme, !!disabled)} />
    </IconButton>
  ) : (
    <IconButton
      aria-label="collapse row"
      onClick={toggleExpanded}
      className={iconButtonStyles}
      {...rest}
    >
      <Icon glyph="ChevronUp" fill={iconFills(theme, !!disabled)} />
    </IconButton>
  );
};

ToggleExpandedIcon.propTypes = {
  disabled: PropTypes.bool,
  toggleExpanded: PropTypes.any.isRequired,
  isExpanded: PropTypes.bool.isRequired,
};

export default ToggleExpandedIcon;

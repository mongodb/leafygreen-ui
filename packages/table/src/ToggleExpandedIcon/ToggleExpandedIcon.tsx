import Icon from '@leafygreen-ui/icon';
import IconButton from '@leafygreen-ui/icon-button';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import React from 'react';
import { iconButtonStyles, iconFills } from './ToggleExpandedIcon.styles';
import ToggleExpandedIconProps from './ToggleExpandedIcon.types';

const ToggleExpandedIcon = ({
  isExpanded,
  toggleExpanded,
  disabled,
}: ToggleExpandedIconProps) => {
  const { theme } = useDarkMode();
  return !isExpanded ? (
    <IconButton
      aria-label="collapse row"
      onClick={toggleExpanded}
      className={iconButtonStyles}
    >
      <Icon glyph="ChevronDown" fill={iconFills(theme, !!disabled)} />
    </IconButton>
  ) : (
    <IconButton
      aria-label="expand row"
      onClick={toggleExpanded}
      className={iconButtonStyles}
    >
      <Icon glyph="ChevronUp" fill={iconFills(theme, !!disabled)} />
    </IconButton>
  );
};

export default ToggleExpandedIcon;

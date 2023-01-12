import React from 'react';
import IconButton from '@leafygreen-ui/icon-button';
import Icon from '@leafygreen-ui/icon';
import { iconButtonStyles } from './ToggleExpandedIcon.styles';
import ToggleExpandedIconProps from './ToggleExpandedIcon.types';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';

const ToggleExpandedIcon = ({ isExpanded, toggleExpanded }: ToggleExpandedIconProps) => {
  const { theme } = useDarkMode();
  const iconFill = theme === Theme.Dark ? palette.gray.light2 : 'black';
  return (
    !isExpanded ? (
      <IconButton aria-label="collapse row" onClick={toggleExpanded} className={iconButtonStyles}>
        <Icon glyph="ChevronDown" fill={iconFill} />
      </IconButton>
    ) : (
      <IconButton aria-label="expand row" onClick={toggleExpanded} className={iconButtonStyles}>
        <Icon glyph="ChevronUp" fill={iconFill} />
      </IconButton>
    )
  )
}

export default ToggleExpandedIcon;
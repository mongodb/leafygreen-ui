import React from 'react';
import IconButton from '@leafygreen-ui/icon-button';
import Icon from '@leafygreen-ui/icon';
import { iconButtonStyles } from './ToggleExpandedIcon.styles';

const ToggleExpandedIcon = ({ isExpanded, toggleExpanded }: { isExpanded: boolean; toggleExpanded: () => void; }) => {
  return (
    !isExpanded ? (
      <IconButton aria-label="collapse row" onClick={toggleExpanded} className={iconButtonStyles}>
        <Icon glyph="ChevronDown" fill="black" />
      </IconButton>
    ) : (
      <IconButton aria-label="expand row" onClick={toggleExpanded} className={iconButtonStyles}>
        <Icon glyph="ChevronUp" fill="black" />
      </IconButton>
    )
  )
}

export default ToggleExpandedIcon;
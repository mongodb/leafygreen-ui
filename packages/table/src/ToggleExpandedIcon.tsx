import React from 'react';
import IconButton from '@leafygreen-ui/icon-button';

const ToggleExpandedIcon = ({ isExpanded, toggleExpanded }: { isExpanded: boolean; toggleExpanded: () => void; }) => {
  return (
    isExpanded ? (
      <IconButton aria-label="collapse row" onClick={toggleExpanded}>
        up
      </IconButton>
    ) : (
      <IconButton aria-label="expand row" onClick={toggleExpanded}>
        down
      </IconButton>
    )
  )
}

export default ToggleExpandedIcon;